import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

import {
  userTable,
  insertUserSchema,
  insertMessageSchema,
} from "@lib/db/schema";

// Auth
export const loginSchema = insertUserSchema.pick({
  email: true,
  password: true,
});

export const registerSchema = insertUserSchema
  .pick({
    email: true,
    password: true,
    fullName: true,
    phoneNumber: true,
  })
  .required();

export const forgotPasswordSchema = insertUserSchema.pick({
  id: true,
  email: true,
});

export const resetPasswordSchema = insertUserSchema.pick({
  id: true,
  password: true,
});

// Profile
export const updateSchema = createInsertSchema(userTable, {
  id: (schema) => schema.id.positive(),
  fullName: (schema) => schema.fullName.max(255),
}).pick({
  id: true,
  fullName: true,
});

// Subscriptions
export const onlyEmailSchema = z.object({
  email: z.string().email(),
});

// Messages
export const contactUsSchema = insertMessageSchema.omit({
  id: true,
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;

export type UpdateSchema = z.infer<typeof updateSchema>;

export type SubscribeSchema = z.infer<typeof onlyEmailSchema>;

export type ContactUsSchema = z.infer<typeof contactUsSchema>;
