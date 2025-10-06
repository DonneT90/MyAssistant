import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatRequestSchema } from "@shared/schema";
import { generateChatResponse, analyzeClientMessage, generateTrainingAnswer } from "./gemini-service";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat endpoint - Generate AI response
  app.post("/api/chat", async (req, res) => {
    try {
      const validatedData = chatRequestSchema.parse(req.body);
      
      const response = await generateChatResponse(
        validatedData.message,
        validatedData.context || {}
      );

      // Save conversation to storage
      await storage.saveConversation({
        userMessage: validatedData.message,
        aiResponse: response.mainResponse,
        phase: response.detectedPhase || validatedData.context?.phase,
        clientType: response.detectedClientType || validatedData.context?.clientType,
      });

      res.json({
        success: true,
        data: response
      });
    } catch (error: any) {
      console.error("Chat error:", error);
      res.status(400).json({
        success: false,
        error: error.message || "Erreur lors de la génération de la réponse"
      });
    }
  });

  // Analyze client message endpoint
  app.post("/api/analyze", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message || typeof message !== "string") {
        return res.status(400).json({
          success: false,
          error: "Message invalide"
        });
      }

      const analysis = await analyzeClientMessage(message);

      res.json({
        success: true,
        data: analysis
      });
    } catch (error: any) {
      console.error("Analysis error:", error);
      res.status(400).json({
        success: false,
        error: error.message || "Erreur lors de l'analyse"
      });
    }
  });

  // Get conversation history
  app.get("/api/conversations", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 20;
      const conversations = await storage.getConversations(limit);

      res.json({
        success: true,
        data: conversations
      });
    } catch (error: any) {
      console.error("Get conversations error:", error);
      res.status(500).json({
        success: false,
        error: "Erreur lors de la récupération de l'historique"
      });
    }
  });

  // Clear conversation history
  app.delete("/api/conversations", async (req, res) => {
    try {
      await storage.clearConversations();

      res.json({
        success: true,
        message: "Historique effacé"
      });
    } catch (error: any) {
      console.error("Clear conversations error:", error);
      res.status(500).json({
        success: false,
        error: "Erreur lors de l'effacement de l'historique"
      });
    }
  });

  // Training endpoint - Generate answers for recruitment questions
  app.post("/api/training", async (req, res) => {
    try {
      const { question } = req.body;
      
      if (!question || typeof question !== "string") {
        return res.status(400).json({
          success: false,
          error: "Question invalide"
        });
      }

      const response = await generateTrainingAnswer(question);

      res.json({
        success: true,
        data: response
      });
    } catch (error: any) {
      console.error("Training error:", error);
      res.status(400).json({
        success: false,
        error: error.message || "Erreur lors de la génération de la réponse"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
