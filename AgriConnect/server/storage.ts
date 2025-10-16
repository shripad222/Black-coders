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
  private farmers = new Map<string, Farmer>();
  private produceListings = new Map<string, ProduceListing>();
  private buyerRequirements = new Map<string, BuyerRequirement>();
  private marketPrices = new Map<string, MarketPrice>();
  private messages = new Map<string, Message>();
  private salesHistory = new Map<string, SalesHistory>();
  private recommendations = new Map<string, Recommendation>();

  constructor() {
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

    // --- Market Prices ---
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
    ];

    marketPricesData.forEach((price) => {
      const id = randomUUID();
      this.marketPrices.set(id, { id, ...price });
    });

    // --- Produce Listings ---
    const produceListingsData: Omit<ProduceListing, "id">[] = [
      {
    farmerId: "farmer-1",
    cropName: "Wheat",
    quantity: 50,
    unit: "quintal",
    pricePerUnit: "2850.00",
    location: "Ludhiana, Punjab",
    description: "Premium quality wheat, freshly harvested.",
    imageUrl: "https://wpcdn.web.wsu.edu/news/uploads/sites/2797/2019/02/wheat-1188x792.jpg",
    createdAt: new Date(),
    available: true,
  },
  {
    farmerId: "farmer-1",
    cropName: "Rice",
    quantity: 60,
    unit: "quintal",
    pricePerUnit: "3200.00",
    location: "Amritsar, Punjab",
    description: "Long-grain basmati rice, ideal for export.",
    imageUrl: "https://ik.imagekit.io/386ptwjko5s/wp-content/uploads/2021/01/rice-cultivation-in-india.jpg",
    createdAt: new Date(),
    available: true,
  },
  {
    farmerId: "farmer-1",
    cropName: "Sugarcane",
    quantity: 100,
    unit: "quintal",
    pricePerUnit: "3100.00",
    location: "Bhatinda, Punjab",
    description: "Freshly cut sugarcane with high juice content.",
    imageUrl: "https://miro.medium.com/v2/resize:fit:678/1*9rPZWjLKVXDfTzERLscbmQ.png",
    createdAt: new Date(),
    available: true,
  },
  {
    farmerId: "farmer-1",
    cropName: "Maize",
    quantity: 80,
    unit: "quintal",
    pricePerUnit: "2150.00",
    location: "Patiala, Punjab",
    description: "High-quality yellow maize for feed and food industries.",
    imageUrl: "https://www.protectourlivelihood.in/wp-content/uploads/2025/05/Image-Maize.jpg",
    createdAt: new Date(),
    available: true,
  },
  {
    farmerId: "farmer-1",
    cropName: "Barley",
    quantity: 70,
    unit: "quintal",
    pricePerUnit: "2350.00",
    location: "Jalandhar, Punjab",
    description: "Clean and dry barley suitable for brewing and feed.",
    imageUrl: "https://blog.agribazaar.com/wp-content/uploads/2022/01/photo-1437252611977-07f74518abd7.jpg",
    createdAt: new Date(),
    available: true,
  },
  {
    farmerId: "farmer-1",
    cropName: "Mustard",
    quantity: 45,
    unit: "quintal",
    pricePerUnit: "5600.00",
    location: "Moga, Punjab",
    description: "Fresh mustard seeds with high oil yield.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Mustard_plant_flower.jpg",
    createdAt: new Date(),
    available: true,
  },
  {
    farmerId: "farmer-1",
    cropName: "Cotton",
    quantity: 90,
    unit: "quintal",
    pricePerUnit: "7850.00",
    location: "Fazilka, Punjab",
    description: "Soft white cotton, freshly harvested and clean.",
    imageUrl: "https://m.media-amazon.com/images/I/61WWhptbnEL._UF1000,1000_QL80_.jpg",
    createdAt: new Date(),
    available: true,
  },
  {
    farmerId: "farmer-1",
    cropName: "Potato",
    quantity: 150,
    unit: "quintal",
    pricePerUnit: "1250.00",
    location: "Hoshiarpur, Punjab",
    description: "Freshly dug potatoes, perfect for table and processing use.",
    imageUrl: "https://plantix.net/en/library/assets/custom/crop-images/potato.jpeg",
    createdAt: new Date(),
    available: true,
  },
      
    ];

    produceListingsData.forEach((listing) => {
      const id = randomUUID();
      this.produceListings.set(id, { id, ...listing });
    });

    // --- Buyer Requirements ---
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
    ];

    buyerRequirementsData.forEach((req) => {
      const id = randomUUID();
      this.buyerRequirements.set(id, { id, ...req });
    });

    // --- Recommendations ---
    const recommendationsData: Omit<Recommendation, "id">[] = [
      {
        farmerId: "farmer-1",
        cropName: "Wheat",
        recommendedAction: "Sell now at Azadpur Mandi",
        reason:
          "Prices have increased by 2.5% in the last week. Market demand is high due to upcoming festival season.",
        marketName: "Azadpur Mandi, Delhi",
        estimatedProfit: "3500.00",
        confidence: "high",
        createdAt: new Date(),
      },
      {
        farmerId: "farmer-1",
        cropName: "Rice",
        recommendedAction: "Wait for 1-2 weeks",
        reason:
          "Current prices are slightly down. Historical trends show prices typically rise by 5-8% in the next two weeks.",
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

  // ------------------- CRUD IMPLEMENTATIONS -------------------

  async getFarmer(id: string) {
    return this.farmers.get(id);
  }

  async getCurrentFarmer() {
    return Array.from(this.farmers.values())[0];
  }

  async createFarmer(insertFarmer: InsertFarmer) {
    const id = randomUUID();
    const farmer: Farmer = { ...insertFarmer, id, createdAt: new Date() };
    this.farmers.set(id, farmer);
    return farmer;
  }

  async updateFarmer(id: string, updates: Partial<InsertFarmer>) {
    const farmer = this.farmers.get(id);
    if (!farmer) return undefined;
    const updated = { ...farmer, ...updates };
    this.farmers.set(id, updated);
    return updated;
  }

  async getProduceListings() {
    return Array.from(this.produceListings.values());
  }

  async getProduceListing(id: string) {
    return this.produceListings.get(id);
  }

  async createProduceListing(insertListing: InsertProduceListing) {
    const id = randomUUID();
    const listing: ProduceListing = { ...insertListing, id, createdAt: new Date() };
    this.produceListings.set(id, listing);
    return listing;
  }

  async updateProduceListing(id: string, updates: Partial<InsertProduceListing>) {
    const listing = this.produceListings.get(id);
    if (!listing) return undefined;
    const updated = { ...listing, ...updates };
    this.produceListings.set(id, updated);
    return updated;
  }

  async deleteProduceListing(id: string) {
    return this.produceListings.delete(id);
  }

  async getBuyerRequirements() {
    return Array.from(this.buyerRequirements.values());
  }

  async getBuyerRequirement(id: string) {
    return this.buyerRequirements.get(id);
  }

  async createBuyerRequirement(insertRequirement: InsertBuyerRequirement) {
    const id = randomUUID();
    const requirement: BuyerRequirement = {
      ...insertRequirement,
      id,
      createdAt: new Date(),
      description: insertRequirement.description ?? null, // Ensure description is string | null
    };
    this.buyerRequirements.set(id, requirement);
    return requirement;
  }

  async updateBuyerRequirement(id: string, updates: Partial<InsertBuyerRequirement>) {
    const requirement = this.buyerRequirements.get(id);
    if (!requirement) return undefined;
    const updated = { ...requirement, ...updates };
    this.buyerRequirements.set(id, updated);
    return updated;
  }

  async deleteBuyerRequirement(id: string) {
    return this.buyerRequirements.delete(id);
  }

  async getMarketPrices() {
    return Array.from(this.marketPrices.values());
  }

  async getMarketPrice(id: string) {
    return this.marketPrices.get(id);
  }

  async createMarketPrice(insertPrice: InsertMarketPrice) {
    const id = randomUUID();
    const price: MarketPrice = { ...insertPrice, id, updatedAt: new Date() };
    this.marketPrices.set(id, price);
    return price;
  }

  async updateMarketPrice(id: string, updates: Partial<InsertMarketPrice>) {
    const price = this.marketPrices.get(id);
    if (!price) return undefined;
    const updated = { ...price, ...updates, updatedAt: new Date() };
    this.marketPrices.set(id, updated);
    return updated;
  }

  async getMessages(userId: string) {
    return Array.from(this.messages.values()).filter(
      (msg) => msg.senderId === userId || msg.receiverId === userId
    );
  }

  async getConversationMessages(userId: string, otherUserId: string) {
    return Array.from(this.messages.values()).filter(
      (msg) =>
        (msg.senderId === userId && msg.receiverId === otherUserId) ||
        (msg.senderId === otherUserId && msg.receiverId === userId)
    );
  }

  async createMessage(insertMessage: InsertMessage) {
    const id = randomUUID();
    const message: Message = { ...insertMessage, id, createdAt: new Date() };
    this.messages.set(id, message);
    return message;
  }

  async markMessageAsRead(id: string) {
    const msg = this.messages.get(id);
    if (!msg) return false;
    msg.read = true;
    this.messages.set(id, msg);
    return true;
  }

  async getSalesHistory(farmerId: string) {
    return Array.from(this.salesHistory.values()).filter((sale) => sale.farmerId === farmerId);
  }

  async createSalesHistory(insertSale: InsertSalesHistory) {
    const id = randomUUID();
    const sale: SalesHistory = { ...insertSale, id, saleDate: new Date() };
    this.salesHistory.set(id, sale);
    return sale;
  }

  async getRecommendations(farmerId: string) {
    return Array.from(this.recommendations.values()).filter((r) => r.farmerId === farmerId);
  }

  async createRecommendation(insertRecommendation: InsertRecommendation) {
    const id = randomUUID();
    const recommendation: Recommendation = { ...insertRecommendation, id, createdAt: new Date() };
    this.recommendations.set(id, recommendation);
    return recommendation;
  }
}

export const storage = new MemStorage();
