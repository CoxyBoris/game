import { Controller, Get, Query, Res } from '@nestjs/common';
import { IntegrationService } from '../service/integration.service';
import { Response } from 'express';

@Controller('integrations/stripe')
export class StripeRestController {
  constructor(private readonly service: IntegrationService) {}

  @Get('callback')
  async handleStripeOAuthCallback(
    @Query('code') code: string,
    @Query('state') userId: string, // State used to track userId
    @Res() res: Response,
  ) {
    await this.service.handleStripeOAuthCallback(code, userId);
    return res.redirect('/integrations'); // Or anywhere in your Next.js app
  }
}
