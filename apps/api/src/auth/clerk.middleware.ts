import { Injectable, NestMiddleware, UnauthorizedException, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from '@nestjs/core';
import { requireAuth, getAuth} from "@clerk/express";
import { Request as ExpressRequest, Response, NextFunction } from "express";
import { UserService } from "../user/service/user.service";

interface Request extends ExpressRequest {
    auth?: {
      userId?: string;
    };
  }

@Injectable()
export class ClerkAuthMiddleware implements NestMiddleware, OnModuleInit {
  private userService: UserService;

  constructor(private readonly moduleRef: ModuleRef) {}

  async onModuleInit() {
    this.userService = this.moduleRef.get(UserService, { strict: false });
  }

  async use(req: Request, res: Response, next: NextFunction) {
    // Skip auth for GraphQL playground
    /*if (process.env.NODE_ENV === 'development') {
      console.log("skipping auth");
      return next();
    }*/

    try {
      // Use the middleware as a Promise
      await new Promise((resolve, reject) => {
        requireAuth()(req, res, (error) => {
         if (error) reject(error);
          resolve(true);
        });
      });

      
      
      if (!req.auth?.userId) {
        throw new UnauthorizedException("User not authenticated");
      }

      // Fetch user details from Clerk
      const auth = getAuth(req);
      const clerkUserId = auth.userId;
      
      if (!clerkUserId) {
        throw new UnauthorizedException("User not found");
      }

      const user = await this.userService.getUserByClerkId(clerkUserId);

      req["user"] = {
        id: user.id,
        email: null,
        role: "user",
      };
      next();
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException("Authentication failed");
    }
  }
}