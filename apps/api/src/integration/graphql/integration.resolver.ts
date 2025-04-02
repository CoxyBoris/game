import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { IntegrationService } from '../service/integration.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { CurrentUserType } from '../../common/types/current-user.type'


@Resolver()
export class IntegrationResolver {
  constructor(private readonly service: IntegrationService) {}

  @Query(() => Boolean)
  async isStripeConnected(@CurrentUser() user: CurrentUserType) {
    return this.service.isConnected(user.id, 'stripe');
  }

  @Mutation(() => String)
  async generateStripeConnectUrl(@CurrentUser() user: CurrentUserType) {
    return this.service.createStripeOAuthLink(user.id);
  }

  @Mutation(() => Boolean)
  async finalizeStripeConnection(
    @Args('code') code: string,
    @Args('state') userId: string,
  ): Promise<boolean> {
    await this.service.handleStripeOAuthCallback(code, userId);
    return true;
  }
}
