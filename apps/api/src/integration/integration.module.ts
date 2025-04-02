import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Integration, IntegrationSchema } from './persistence/integration.schema';
import { IntegrationRepository } from './persistence/integration.repository'
import { IntegrationResolver } from './graphql/integration.resolver';
import { StripeRestController } from './controller/integration.controller';
import { IntegrationService } from './service/integration.service';

@Module({
  controllers: [StripeRestController],
  providers: [IntegrationService, IntegrationRepository, IntegrationResolver],
  imports: [
    MongooseModule.forFeature([{ name: Integration.name, schema: IntegrationSchema }]),
  ],
})
export class IntegrationModule {}
