import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { ClerkAuthMiddleware } from './auth/clerk.middleware';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { IntegrationModule } from './integration/integration.module'
import { ClerkModule } from './webhook/clerk/clerk.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: process.env.NODE_ENV === 'development',
      introspection: process.env.NODE_ENV === 'development',
      path: '/graphql', // Explicitly set the path
      context: ({ req }) => {
        return {
          user: req.user
        };
      },
    }),
    ClerkModule,
    TodoModule,
    UserModule,
    IntegrationModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClerkAuthMiddleware).forRoutes("graphql");
  }
}