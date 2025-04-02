import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { IntegrationRepository } from '../persistence/integration.repository';

@Injectable()
export class IntegrationService {
  constructor(private readonly repo: IntegrationRepository) {}

  async getIntegration(userId: string, type: string) {
    return this.repo.findOne(userId, type);
  }

  async createStripeOAuthLink(userId: string) {
    const redirectUri = process.env.STRIPE_REDIRECT_URI;
    return `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.STRIPE_CLIENT_ID}&scope=read_write&redirect_uri=${redirectUri}&state=${userId}`;
  }

  async handleStripeOAuthCallback(code: string, state: string) {
    console.log("handleStripeOAuthCallback", code, state)
    console.log(process.env.STRIPE_SECRET_KEY)

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    console.log("stripe OK")
    const tokenResponse = await stripe.oauth.token({
      grant_type: 'authorization_code',
      code,
    });

    console.log("tokenResponse", tokenResponse)

    const { stripe_user_id, access_token } = tokenResponse;

    return this.repo.createOrUpdate(state, 'stripe', {
      accountId: stripe_user_id,
      accessToken: access_token,
    });
  }

  async isConnected(userId: string, type: string) {
    const integration = await this.repo.findOne(userId, type);
    return !!integration?.accountId;
  }
}
