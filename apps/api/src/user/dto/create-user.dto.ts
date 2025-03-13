import { z } from 'zod';

export const CreateUserSchema = z.object({
  clerkUserId: z.string().min(1, 'Clerk User ID is required'),
  email: z.string().email('Invalid email format'),
  name: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  organizationId: z.string().optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
