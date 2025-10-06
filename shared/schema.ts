import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const conversations = pgTable("conversations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userMessage: text("user_message").notNull(),
  aiResponse: text("ai_response").notNull(),
  phase: text("phase"),
  clientType: text("client_type"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertConversationSchema = createInsertSchema(conversations).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = z.infer<typeof insertConversationSchema>;

export const chatRequestSchema = z.object({
  message: z.string().min(1, "Le message ne peut pas être vide"),
  context: z.object({
    phase: z.enum(["relation", "qualification", "sexualisation", "chauffe", "script", "unknown"]).optional(),
    clientType: z.enum(["nouveau", "ancien", "timewaster", "spender", "unknown"]).optional(),
  }).optional(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
