import { type User, type InsertUser, type Conversation, type InsertConversation } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveConversation(conversation: InsertConversation): Promise<Conversation>;
  getConversations(limit?: number): Promise<Conversation[]>;
  clearConversations(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private conversations: Conversation[];

  constructor() {
    this.users = new Map();
    this.conversations = [];
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async saveConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const conversation: Conversation = {
      id: randomUUID(),
      userMessage: insertConversation.userMessage,
      aiResponse: insertConversation.aiResponse,
      phase: insertConversation.phase || null,
      clientType: insertConversation.clientType || null,
      createdAt: new Date(),
    };
    this.conversations.unshift(conversation);
    
    // Keep only last 100 conversations in memory
    if (this.conversations.length > 100) {
      this.conversations = this.conversations.slice(0, 100);
    }
    
    return conversation;
  }

  async getConversations(limit: number = 20): Promise<Conversation[]> {
    return this.conversations.slice(0, limit);
  }

  async clearConversations(): Promise<void> {
    this.conversations = [];
  }
}

export const storage = new MemStorage();
