import {
  type Farmer,
  type InsertFarmer,
  type ProduceListing,
  type InsertProduceListing,
  type BuyerRequirement,
  type InsertBuyerRequirement,
  type MarketPrice,
  type InsertMarketPrice,
  type Message,
  type InsertMessage,
  type SalesHistory,
  type InsertSalesHistory,
  type Recommendation,
  type InsertRecommendation,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getFarmer(id: string): Promise<Farmer | undefined>;
  getCurrentFarmer(): Promise<Farmer>;
  createFarmer(farmer: InsertFarmer): Promise<Farmer>;
  updateFarmer(id: string, farmer: Partial<InsertFarmer>): Promise<Farmer | undefined>;

  getProduceListings(): Promise<ProduceListing[]>;
  getProduceListing(id: string): Promise<ProduceListing | undefined>;
  createProduceListing(listing: InsertProduceListing): Promise<ProduceListing>;
  updateProduceListing(id: string, listing: Partial<InsertProduceListing>): Promise<ProduceListing | undefined>;
  deleteProduceListing(id: string): Promise<boolean>;

  getBuyerRequirements(): Promise<BuyerRequirement[]>;
  getBuyerRequirement(id: string): Promise<BuyerRequirement | undefined>;
  createBuyerRequirement(requirement: InsertBuyerRequirement): Promise<BuyerRequirement>;
  updateBuyerRequirement(id: string, requirement: Partial<InsertBuyerRequirement>): Promise<BuyerRequirement | undefined>;
  deleteBuyerRequirement(id: string): Promise<boolean>;

  getMarketPrices(): Promise<MarketPrice[]>;
  getMarketPrice(id: string): Promise<MarketPrice | undefined>;
  createMarketPrice(price: InsertMarketPrice): Promise<MarketPrice>;
  updateMarketPrice(id: string, price: Partial<InsertMarketPrice>): Promise<MarketPrice | undefined>;

  getMessages(userId: string): Promise<Message[]>;
  getConversationMessages(userId: string, otherUserId: string): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: string): Promise<boolean>;

  getSalesHistory(farmerId: string): Promise<SalesHistory[]>;
  createSalesHistory(sale: InsertSalesHistory): Promise<SalesHistory>;

  getRecommendations(farmerId: string): Promise<Recommendation[]>;
  createRecommendation(recommendation: InsertRecommendation): Promise<Recommendation>;
}

export class MemStorage implements IStorage {
  private farmers: Map<string, Farmer>;
  private produceListings: Map<string, ProduceListing>;
  private buyerRequirements: Map<string, BuyerRequirement>;
  private marketPrices: Map<string, MarketPrice>;
  private messages: Map<string, Message>;
  private salesHistory: Map<string, SalesHistory>;
  private recommendations: Map<string, Recommendation>;

  constructor() {
    this.farmers = new Map();
    this.produceListings = new Map();
    this.buyerRequirements = new Map();
    this.marketPrices = new Map();
    this.messages = new Map();
    this.salesHistory = new Map();
    this.recommendations = new Map();

    this.seedData();
  }

  private seedData() {
    const defaultFarmer: Farmer = {
      id: "farmer-1",
      name: "Rajesh Kumar",
      region: "Punjab",
      phoneNumber: "+91 98765 43210",
      cropsGrown: ["Wheat", "Rice", "Sugarcane"],
      language: "en",
      avatarUrl: undefined,
      createdAt: new Date("2024-01-15"),
    };
    this.farmers.set(defaultFarmer.id, defaultFarmer);

    const marketPricesData: Omit<MarketPrice, "id">[] = [
      {
        mandiName: "Azadpur Mandi",
        location: "Delhi",
        commodity: "Wheat",
        currentPrice: "2850.00",
        previousPrice: "2780.00",
        unit: "quintal",
        changePercent: "2.52",
        trend: "up",
        updatedAt: new Date(),
      },
      {
        mandiName: "Khanna Mandi",
        location: "Punjab",
        commodity: "Rice",
        currentPrice: "3240.00",
        previousPrice: "3280.00",
        unit: "quintal",
        changePercent: "-1.22",
        trend: "down",
        updatedAt: new Date(),
      },
      {
        mandiName: "Bhatinda Mandi",
        location: "Punjab",
        commodity: "Cotton",
        currentPrice: "7850.00",
        previousPrice: "7850.00",
        unit: "quintal",
        changePercent: "0.00",
        trend: "stable",
        updatedAt: new Date(),
      },
      {
        mandiName: "Amritsar Mandi",
        location: "Punjab",
        commodity: "Sugarcane",
        currentPrice: "3150.00",
        previousPrice: "3050.00",
        unit: "quintal",
        changePercent: "3.28",
        trend: "up",
        updatedAt: new Date(),
      },
      {
        mandiName: "Ludhiana Mandi",
        location: "Punjab",
        commodity: "Maize",
        currentPrice: "2140.00",
        previousPrice: "2200.00",
        unit: "quintal",
        changePercent: "-2.73",
        trend: "down",
        updatedAt: new Date(),
      },
      {
        mandiName: "Jalandhar Mandi",
        location: "Punjab",
        commodity: "Barley",
        currentPrice: "2350.00",
        previousPrice: "2310.00",
        unit: "quintal",
        changePercent: "1.73",
        trend: "up",
        updatedAt: new Date(),
      },
      {
        mandiName: "Patiala Mandi",
        location: "Punjab",
        commodity: "Mustard",
        currentPrice: "5640.00",
        previousPrice: "5580.00",
        unit: "quintal",
        changePercent: "1.08",
        trend: "up",
        updatedAt: new Date(),
      },
      {
        mandiName: "Meerut Mandi",
        location: "Uttar Pradesh",
        commodity: "Potato",
        currentPrice: "1250.00",
        previousPrice: "1320.00",
        unit: "quintal",
        changePercent: "-5.30",
        trend: "down",
        updatedAt: new Date(),
      },
    ];

    marketPricesData.forEach((price) => {
      const id = randomUUID();
      this.marketPrices.set(id, { id, ...price });
    });

    const produceListingsData: Omit<ProduceListing, "id">[] = [
      {
        farmerId: "farmer-1",
        cropName: "Wheat",
        quantity: 50,
        unit: "quintal",
        pricePerUnit: "2850.00",
        location: "Ludhiana, Punjab",
        description: "Premium quality wheat, freshly harvested",
        imageUrl: "/api/placeholder/wheat",
        available: true,
        createdAt: new Date(),
      },
      {
        farmerId: "farmer-1",
        cropName: "Rice",
        quantity: 30,
        unit: "quintal",
        pricePerUnit: "3200.00",
        location: "Amritsar, Punjab",
        description: "Basmati rice, Grade A quality",
        imageUrl: "/api/placeholder/rice",
        available: true,
        createdAt: new Date(),
      },
      {
        farmerId: "farmer-1",
        cropName: "Sugarcane",
        quantity: 100,
        unit: "quintal",
        pricePerUnit: "3150.00",
        location: "Punjab",
        description: "Fresh sugarcane for sugar mills",
        imageUrl: "/api/placeholder/sugarcane",
        available: true,
        createdAt: new Date(),
      },
    ];

    produceListingsData.forEach((listing) => {
      const id = randomUUID();
      this.produceListings.set(id, { id, ...listing });
    });

    const buyerRequirementsData: Omit<BuyerRequirement, "id">[] = [
      {
        buyerName: "Rajesh Wholesale",
        cropNeeded: "Wheat",
        quantity: 100,
        unit: "quintal",
        expectedPriceMin: "2700.00",
        expectedPriceMax: "2900.00",
        location: "Delhi",
        contactNumber: "+91 98765 11111",
        description: "Looking for quality wheat for export",
        active: true,
        createdAt: new Date(),
      },
      {
        buyerName: "Kumar Mills",
        cropNeeded: "Sugarcane",
        quantity: 200,
        unit: "quintal",
        expectedPriceMin: "3000.00",
        expectedPriceMax: "3200.00",
        location: "Uttar Pradesh",
        contactNumber: "+91 98765 22222",
        description: "Sugar mill requires fresh sugarcane",
        active: true,
        createdAt: new Date(),
      },
      {
        buyerName: "Priya Traders",
        cropNeeded: "Rice",
        quantity: 50,
        unit: "quintal",
        expectedPriceMin: "3100.00",
        expectedPriceMax: "3300.00",
        location: "Haryana",
        contactNumber: "+91 98765 33333",
        description: "Premium basmati rice needed",
        active: true,
        createdAt: new Date(),
      },
    ];

    buyerRequirementsData.forEach((req) => {
      const id = randomUUID();
      this.buyerRequirements.set(id, { id, ...req });
    });

    const recommendationsData: Omit<Recommendation, "id">[] = [
      {
        farmerId: "farmer-1",
        cropName: "Wheat",
        recommendedAction: "Sell now at Azadpur Mandi",
        reason: "Prices have increased by 2.5% in the last week. Market demand is high due to upcoming festival season.",
        marketName: "Azadpur Mandi, Delhi",
        estimatedProfit: "3500.00",
        confidence: "high",
        createdAt: new Date(),
      },
      {
        farmerId: "farmer-1",
        cropName: "Rice",
        recommendedAction: "Wait for 1-2 weeks",
        reason: "Current prices are slightly down. Historical trends show prices typically rise by 5-8% in the next two weeks.",
        marketName: "Amritsar Mandi, Punjab",
        estimatedProfit: "4800.00",
        confidence: "medium",
        createdAt: new Date(),
      },
    ];

    recommendationsData.forEach((rec) => {
      const id = randomUUID();
      this.recommendations.set(id, { id, ...rec });
    });
  }

  async getFarmer(id: string): Promise<Farmer | undefined> {
    return this.farmers.get(id);
  }

  async getCurrentFarmer(): Promise<Farmer> {
    return Array.from(this.farmers.values())[0];
  }

  async createFarmer(insertFarmer: InsertFarmer): Promise<Farmer> {
    const id = randomUUID();
    const farmer: Farmer = {
      ...insertFarmer,
      id,
      createdAt: new Date(),
    };
    this.farmers.set(id, farmer);
    return farmer;
  }

  async updateFarmer(id: string, updates: Partial<InsertFarmer>): Promise<Farmer | undefined> {
    const farmer = this.farmers.get(id);
    if (!farmer) return undefined;

    const updatedFarmer = { ...farmer, ...updates };
    this.farmers.set(id, updatedFarmer);
    return updatedFarmer;
  }

  async getProduceListings(): Promise<ProduceListing[]> {
    return Array.from(this.produceListings.values());
  }

  async getProduceListing(id: string): Promise<ProduceListing | undefined> {
    return this.produceListings.get(id);
  }

  async createProduceListing(insertListing: InsertProduceListing): Promise<ProduceListing> {
    const id = randomUUID();
    const listing: ProduceListing = {
      ...insertListing,
      id,
      createdAt: new Date(),
    };
    this.produceListings.set(id, listing);
    return listing;
  }

  async updateProduceListing(id: string, updates: Partial<InsertProduceListing>): Promise<ProduceListing | undefined> {
    const listing = this.produceListings.get(id);
    if (!listing) return undefined;

    const updatedListing = { ...listing, ...updates };
    this.produceListings.set(id, updatedListing);
    return updatedListing;
  }

  async deleteProduceListing(id: string): Promise<boolean> {
    return this.produceListings.delete(id);
  }

  async getBuyerRequirements(): Promise<BuyerRequirement[]> {
    return Array.from(this.buyerRequirements.values());
  }

  async getBuyerRequirement(id: string): Promise<BuyerRequirement | undefined> {
    return this.buyerRequirements.get(id);
  }

  async createBuyerRequirement(insertRequirement: InsertBuyerRequirement): Promise<BuyerRequirement> {
    const id = randomUUID();
    const requirement: BuyerRequirement = {
      ...insertRequirement,
      id,
      createdAt: new Date(),
    };
    this.buyerRequirements.set(id, requirement);
    return requirement;
  }

  async updateBuyerRequirement(id: string, updates: Partial<InsertBuyerRequirement>): Promise<BuyerRequirement | undefined> {
    const requirement = this.buyerRequirements.get(id);
    if (!requirement) return undefined;

    const updatedRequirement = { ...requirement, ...updates };
    this.buyerRequirements.set(id, updatedRequirement);
    return updatedRequirement;
  }

  async deleteBuyerRequirement(id: string): Promise<boolean> {
    return this.buyerRequirements.delete(id);
  }

  async getMarketPrices(): Promise<MarketPrice[]> {
    return Array.from(this.marketPrices.values());
  }

  async getMarketPrice(id: string): Promise<MarketPrice | undefined> {
    return this.marketPrices.get(id);
  }

  async createMarketPrice(insertPrice: InsertMarketPrice): Promise<MarketPrice> {
    const id = randomUUID();
    const price: MarketPrice = {
      ...insertPrice,
      id,
      updatedAt: new Date(),
    };
    this.marketPrices.set(id, price);
    return price;
  }

  async updateMarketPrice(id: string, updates: Partial<InsertMarketPrice>): Promise<MarketPrice | undefined> {
    const price = this.marketPrices.get(id);
    if (!price) return undefined;

    const updatedPrice = { ...price, ...updates, updatedAt: new Date() };
    this.marketPrices.set(id, updatedPrice);
    return updatedPrice;
  }

  async getMessages(userId: string): Promise<Message[]> {
    return Array.from(this.messages.values()).filter(
      (msg) => msg.senderId === userId || msg.receiverId === userId
    );
  }

  async getConversationMessages(userId: string, otherUserId: string): Promise<Message[]> {
    return Array.from(this.messages.values()).filter(
      (msg) =>
        (msg.senderId === userId && msg.receiverId === otherUserId) ||
        (msg.senderId === otherUserId && msg.receiverId === userId)
    );
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const message: Message = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.messages.set(id, message);
    return message;
  }

  async markMessageAsRead(id: string): Promise<boolean> {
    const message = this.messages.get(id);
    if (!message) return false;

    message.read = true;
    this.messages.set(id, message);
    return true;
  }

  async getSalesHistory(farmerId: string): Promise<SalesHistory[]> {
    return Array.from(this.salesHistory.values()).filter(
      (sale) => sale.farmerId === farmerId
    );
  }

  async createSalesHistory(insertSale: InsertSalesHistory): Promise<SalesHistory> {
    const id = randomUUID();
    const sale: SalesHistory = {
      ...insertSale,
      id,
      saleDate: new Date(),
    };
    this.salesHistory.set(id, sale);
    return sale;
  }

  async getRecommendations(farmerId: string): Promise<Recommendation[]> {
    return Array.from(this.recommendations.values()).filter(
      (rec) => rec.farmerId === farmerId
    );
  }

  async createRecommendation(insertRecommendation: InsertRecommendation): Promise<Recommendation> {
    const id = randomUUID();
    const recommendation: Recommendation = {
      ...insertRecommendation,
      id,
      createdAt: new Date(),
    };
    this.recommendations.set(id, recommendation);
    return recommendation;
  }
}

export const storage = new MemStorage();
