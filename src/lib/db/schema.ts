import { relations } from "drizzle-orm";
import {
  serial,
  text,
  varchar,
  timestamp,
  integer,
  pgTableCreator,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const myPgTable = pgTableCreator((name) => `newsletter_node_${name}`);

export const userTable = myPgTable("user", {
  id: serial("id").notNull().primaryKey(),
  fullName: text("full_name").notNull(),
  role: text("role", { enum: ["ADMIN", "USER"] })
    .notNull()
    .default("USER"),
  email: varchar("email", { length: 256 }).notNull().unique(),
  password: varchar("password", { length: 256 }).notNull(),
  refreshToken: varchar("refresh_token", { length: 256 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type User = typeof userTable.$inferSelect;
export type NewUser = typeof userTable.$inferInsert;
export const insertUserSchema = createInsertSchema(userTable);

export const sessionTable = myPgTable("session", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => userTable.id),
  token: varchar("token", { length: 256 }),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const sessionsRelations = relations(sessionTable, ({ one }) => ({
  user: one(userTable, {
    fields: [sessionTable.userId],
    references: [userTable.id],
  }),
}));

export type Session = typeof sessionTable.$inferSelect;

export const usersRelations = relations(userTable, ({ many }) => ({
  sessions: many(sessionTable),
}));

export const messageTable = myPgTable("message", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }).notNull(),
  fullName: text("full_name").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  replied: boolean("replied").default(false),
});

export type Message = typeof messageTable.$inferSelect;
export type NewMessage = typeof messageTable.$inferInsert;
export const insertMessageSchema = createInsertSchema(messageTable);

export const subscriptionTable = myPgTable("subscription", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  unsubscribed: boolean("unsubscribed").default(false),
});

export type Subscription = typeof subscriptionTable.$inferSelect;
export type NewSubscription = typeof subscriptionTable.$inferInsert;
export const insertSubscriptionSchema = createInsertSchema(subscriptionTable);

export const newsletterTable = myPgTable("newsletter", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  upVotes: integer("up_votes").default(0),
  downVotes: integer("down_votes").default(0),
  targetDate: timestamp("target_date").notNull(),
});

export type Newsletter = typeof newsletterTable.$inferSelect;
export type NewNewsletter = typeof newsletterTable.$inferInsert;
export const insertNewsletterSchema = createInsertSchema(newsletterTable);
