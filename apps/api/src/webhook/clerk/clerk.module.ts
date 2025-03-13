import { Module } from '@nestjs/common';
import { ClerkWebhookController } from './clerk-webhook.controller';
import { UserService } from '../../user/service/user.service';
import { UserRepository } from '../../user/persistence/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../user/persistence/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [ClerkWebhookController],
  providers: [
    UserService,
    UserRepository,
  ],
  exports: [UserService],
})
export class ClerkModule {}
