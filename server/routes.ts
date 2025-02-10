import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export function registerRoutes(app: Express): Server {
  app.get("/api/exchange-rate", async (_req, res) => {
    try {
      // Fetch current exchange rate from external API
      const response = await fetch("https://api.frankfurter.app/latest?from=EUR&to=HUF");
      const data = await response.json();
      const rate = data.rates.HUF;
      
      // Store the rate
      await storage.storeExchangeRate({ rate });
      
      // Return latest rate
      res.json({ rate });
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      res.status(500).json({ message: "Failed to fetch exchange rate" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
