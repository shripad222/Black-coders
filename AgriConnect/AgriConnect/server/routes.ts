import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import {
  insertFarmerSchema,
  insertProduceListingSchema,
  insertBuyerRequirementSchema,
  insertMarketPriceSchema,
  insertMessageSchema,
  insertSalesHistorySchema,
  insertRecommendationSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/farmer/current", async (req, res) => {
    try {
      const farmer = await storage.getCurrentFarmer();
      res.json(farmer);
    } catch (error) {
      res.status(500).json({ error: "Failed to get current farmer" });
    }
  });

  app.patch("/api/farmer/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = insertFarmerSchema.partial().parse(req.body);
      const farmer = await storage.updateFarmer(id, updates);

      if (!farmer) {
        return res.status(404).json({ error: "Farmer not found" });
      }

      res.json(farmer);
    } catch (error) {
      res.status(400).json({ error: "Invalid farmer data" });
    }
  });

  app.get("/api/produce-listings", async (req, res) => {
    try {
      const listings = await storage.getProduceListings();
      res.json(listings);
    } catch (error) {
      res.status(500).json({ error: "Failed to get produce listings" });
    }
  });

  app.post("/api/produce-listings", async (req, res) => {
    try {
      const listing = insertProduceListingSchema.parse(req.body);
      const newListing = await storage.createProduceListing(listing);
      res.status(201).json(newListing);
    } catch (error) {
      res.status(400).json({ error: "Invalid listing data" });
    }
  });

  app.patch("/api/produce-listings/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = insertProduceListingSchema.partial().parse(req.body);
      const listing = await storage.updateProduceListing(id, updates);

      if (!listing) {
        return res.status(404).json({ error: "Listing not found" });
      }

      res.json(listing);
    } catch (error) {
      res.status(400).json({ error: "Invalid listing data" });
    }
  });

  app.delete("/api/produce-listings/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteProduceListing(id);

      if (!deleted) {
        return res.status(404).json({ error: "Listing not found" });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete listing" });
    }
  });

  app.get("/api/buyer-requirements", async (req, res) => {
    try {
      const requirements = await storage.getBuyerRequirements();
      res.json(requirements);
    } catch (error) {
      res.status(500).json({ error: "Failed to get buyer requirements" });
    }
  });

  app.post("/api/buyer-requirements", async (req, res) => {
    try {
      const requirement = insertBuyerRequirementSchema.parse(req.body);
      const newRequirement = await storage.createBuyerRequirement(requirement);
      res.status(201).json(newRequirement);
    } catch (error) {
      res.status(400).json({ error: "Invalid requirement data" });
    }
  });

  app.get("/api/market-prices", async (req, res) => {
    try {
      const prices = await storage.getMarketPrices();
      res.json(prices);
    } catch (error) {
      res.status(500).json({ error: "Failed to get market prices" });
    }
  });

  app.post("/api/market-prices", async (req, res) => {
    try {
      const price = insertMarketPriceSchema.parse(req.body);
      const newPrice = await storage.createMarketPrice(price);
      res.status(201).json(newPrice);
    } catch (error) {
      res.status(400).json({ error: "Invalid price data" });
    }
  });

  app.get("/api/conversations", async (req, res) => {
    try {
      const conversations = [
        {
          id: "1",
          name: "Amit Singh",
          lastMessage: "I'm interested in your wheat listing",
          timestamp: "2 min ago",
          unread: 2,
        },
        {
          id: "2",
          name: "Priya Patel",
          lastMessage: "Can we negotiate the price?",
          timestamp: "1 hour ago",
          unread: 0,
        },
        {
          id: "3",
          name: "Rajesh Wholesale",
          lastMessage: "When can you deliver?",
          timestamp: "3 hours ago",
          unread: 1,
        },
      ];
      res.json(conversations);
    } catch (error) {
      res.status(500).json({ error: "Failed to get conversations" });
    }
  });

  app.get("/api/messages/:conversationId", async (req, res) => {
    try {
      const messages = [
        {
          id: "1",
          senderId: "buyer-1",
          senderName: "Amit Singh",
          receiverId: "farmer-1",
          receiverName: "Rajesh Kumar",
          content: "I'm interested in your wheat listing. What's your best price for 50 quintals?",
          read: true,
          createdAt: new Date(Date.now() - 3600000),
        },
        {
          id: "2",
          senderId: "farmer-1",
          senderName: "Rajesh Kumar",
          receiverId: "buyer-1",
          receiverName: "Amit Singh",
          content: "Thank you for your interest! For 50 quintals, I can offer ₹2,850 per quintal.",
          read: true,
          createdAt: new Date(Date.now() - 3300000),
        },
        {
          id: "3",
          senderId: "buyer-1",
          senderName: "Amit Singh",
          receiverId: "farmer-1",
          receiverName: "Rajesh Kumar",
          content: "That's a good price. Can we meet tomorrow to finalize?",
          read: true,
          createdAt: new Date(Date.now() - 3000000),
        },
      ];
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to get messages" });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const message = insertMessageSchema.parse(req.body);
      const newMessage = await storage.createMessage(message);
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(400).json({ error: "Invalid message data" });
    }
  });

  app.get("/api/sales-history", async (req, res) => {
    try {
      const farmerId = "farmer-1";
      const sales = await storage.getSalesHistory(farmerId);
      res.json(sales);
    } catch (error) {
      res.status(500).json({ error: "Failed to get sales history" });
    }
  });

  app.post("/api/sales-history", async (req, res) => {
    try {
      const sale = insertSalesHistorySchema.parse(req.body);
      const newSale = await storage.createSalesHistory(sale);
      res.status(201).json(newSale);
    } catch (error) {
      res.status(400).json({ error: "Invalid sale data" });
    }
  });

  app.get("/api/recommendations", async (req, res) => {
    try {
      const farmerId = "farmer-1";
      const recommendations = await storage.getRecommendations(farmerId);
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ error: "Failed to get recommendations" });
    }
  });

  app.post("/api/recommendations", async (req, res) => {
    try {
      const recommendation = insertRecommendationSchema.parse(req.body);
      const newRecommendation = await storage.createRecommendation(recommendation);
      res.status(201).json(newRecommendation);
    } catch (error) {
      res.status(400).json({ error: "Invalid recommendation data" });
    }
  });

  const httpServer = createServer(app);

  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  const clients = new Map<string, WebSocket>();

  wss.on('connection', (ws: WebSocket) => {
    let userId: string | null = null;

    ws.on('message', (data: string) => {
      try {
        const message = JSON.parse(data.toString());

        if (message.type === 'register') {
          userId = message.userId;
          clients.set(userId, ws);
        } else if (message.type === 'chat_message') {
          const targetWs = clients.get(message.receiverId);
          if (targetWs && targetWs.readyState === WebSocket.OPEN) {
            targetWs.send(JSON.stringify({
              type: 'chat_message',
              message: message.content,
              senderId: userId,
              senderName: message.senderName,
              timestamp: new Date().toISOString(),
            }));
          }

          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
              type: 'message_sent',
              status: 'success',
            }));
          }
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    ws.on('close', () => {
      if (userId) {
        clients.delete(userId);
      }
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });

  return httpServer;
}
