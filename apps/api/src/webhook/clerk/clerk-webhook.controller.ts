import { Body, Controller, Get, Param, Post, Delete, Res, Req } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import logger from '@workspace/logger';
import { Webhook } from 'svix';

@Controller('clerk-webhook')
export class ClerkWebhookController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async clerkWebhook(@Req() req, @Res() res) {
    const evt = this.verifyClerkSignature(req.headers, req.body)

    if (!evt) {
      return res.status(403).json({ error: 'Invalid signature' });
    }

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data
    const eventType = evt.type
    logger.log(`Received webhook with ID ${id} and event type of ${eventType}`)

    switch (eventType) {
      case 'user.created':
      case 'user.updated':
        logger.log('Webhook payload:', evt.data)
        await this.userService.syncUserFromClerk(evt.data);
        break;

      default:
        console.warn(`Unhandled Clerk event: ${eventType}`);
        break;
    }


    //await this.userService.syncUserFromClerk(req.body);
    return res.status(200).json({ success: true });
  }

  private verifyClerkSignature(headers: any, body: any): any {
    const SIGNING_SECRET = process.env.SIGNING_SECRET
    
    if (!SIGNING_SECRET) {
      throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env')
    }
    
    // Create new Svix instance with secret
    const wh = new Webhook(process.env.SIGNING_SECRET)

    // Get Svix headers for verification
    const svix_id = headers['svix-id']
    const svix_timestamp = headers['svix-timestamp']
    const svix_signature = headers['svix-signature']

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return false
    }

    let evt

    // Attempt to verify the incoming webhook
    // If successful, the payload will be available from 'evt'
    // If verification fails, error out and return error code
    try {
      evt = wh.verify(JSON.stringify(body), {
        'svix-id': headers['svix-id'] as string,
        'svix-timestamp': headers['svix-timestamp'] as string,
        'svix-signature': headers['svix-signature'] as string,
      })
    } catch (err) {
        throw new Error('Error: Webhook payload verification failed')
    }

    return evt
  }
}
