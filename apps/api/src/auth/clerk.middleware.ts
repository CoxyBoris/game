import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { requireAuth, getAuth} from "@clerk/express";
import { Request as ExpressRequest, Response, NextFunction } from "express";

interface Request extends ExpressRequest {
    auth?: {
      userId?: string;
    };
  }

@Injectable()
export class ClerkAuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // Skip auth for GraphQL playground
    if (process.env.NODE_ENV === 'development') {
      console.log("skipping auth");
      return next();
    }

    try {
      // Use the middleware as a Promise
      await new Promise((resolve, reject) => {
        requireAuth()(req, res, (error) => {
         if (error) reject(error);
          resolve(true);
        });
      });
      console.log("auth middleware", req.auth);
      if (!req.auth?.userId) {
        throw new UnauthorizedException("User not authenticated");
      }

      // Fetch user details from Clerk
      const { userId } = getAuth(req);
      
      if (!userId) {
        throw new UnauthorizedException("User not found");
      }

      req["user"] = {
        id: userId,
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