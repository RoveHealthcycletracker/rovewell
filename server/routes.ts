import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Waitlist endpoint
  app.post("/api/waitlist", async (req, res) => {
    try {
      const validatedData = insertWaitlistSchema.parse(req.body);
      
      // Check if email already exists
      const existingEntry = await storage.getWaitlistEntryByEmail(validatedData.email);
      if (existingEntry) {
        return res.status(409).json({ 
          message: "Email already registered on waitlist",
          success: false 
        });
      }

      const entry = await storage.createWaitlistEntry(validatedData);
      
      res.status(201).json({ 
        message: "Successfully joined waitlist",
        success: true,
        entry: {
          id: entry.id,
          email: entry.email,
          name: entry.name,
          goal: entry.goal
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid form data",
          errors: error.errors,
          success: false 
        });
      }
      
      res.status(500).json({ 
        message: "Internal server error",
        success: false 
      });
    }
  });

  // Get waitlist entries (for admin purposes)
  app.get("/api/waitlist", async (req, res) => {
    try {
      const entries = await storage.getWaitlistEntries();
      res.json({ 
        entries: entries.map(entry => ({
          id: entry.id,
          email: entry.email,
          name: entry.name,
          goal: entry.goal,
          createdAt: entry.createdAt
        })),
        count: entries.length
      });
    } catch (error) {
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
