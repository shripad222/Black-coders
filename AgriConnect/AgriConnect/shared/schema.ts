import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const farmers = pgTable("farmers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  region: text("region").notNull(),
  phoneNumber: text("phone_number").notNull(),
  cropsGrown: text("crops_grown").array().notNull(),
  language: text("language").notNull().default("en"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const produceListings = pgTable("produce_listings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  farmerId: varchar("farmer_id").notNull(),
  cropName: text("crop_name").notNull(),
  quantity: integer("quantity").notNull(),
  unit: text("unit").notNull(),
  pricePerUnit: decimal("price_per_unit", { precision: 10, scale: 2 }).notNull(),
  location: text("location").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  available: boolean("available").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const buyerRequirements = pgTable("buyer_requirements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  buyerName: text("buyer_name").notNull(),
  cropNeeded: text("crop_needed").notNull(),
  quantity: integer("quantity").notNull(),
  unit: text("unit").notNull(),
  expectedPriceMin: decimal("expected_price_min", { precision: 10, scale: 2 }),
  expectedPriceMax: decimal("expected_price_max", { precision: 10, scale: 2 }),
  location: text("location").notNull(),
  contactNumber: text("contact_number").notNull(),
  description: text("description"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const marketPrices = pgTable("market_prices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  mandiName: text("mandi_name").notNull(),
  location: text("location").notNull(),
  commodity: text("commodity").notNull(),
  currentPrice: decimal("current_price", { precision: 10, scale: 2 }).notNull(),
  previousPrice: decimal("previous_price", { precision: 10, scale: 2 }),
  unit: text("unit").notNull().default("quintal"),
  changePercent: decimal("change_percent", { precision: 5, scale: 2 }),
  trend: text("trend").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  senderId: varchar("sender_id").notNull(),
  senderName: text("sender_name").notNull(),
  receiverId: varchar("receiver_id").notNull(),
  receiverName: text("receiver_name").notNull(),
  content: text("content").notNull(),
  relatedListingId: varchar("related_listing_id"),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const salesHistory = pgTable("sales_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  farmerId: varchar("farmer_id").notNull(),
  cropName: text("crop_name").notNull(),
  quantity: integer("quantity").notNull(),
  unit: text("unit").notNull(),
  pricePerUnit: decimal("price_per_unit", { precision: 10, scale: 2 }).notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  buyerName: text("buyer_name").notNull(),
  location: text("location").notNull(),
  saleDate: timestamp("sale_date").notNull().defaultNow(),
});

export const recommendations = pgTable("recommendations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  farmerId: varchar("farmer_id").notNull(),
  cropName: text("crop_name").notNull(),
  recommendedAction: text("recommended_action").notNull(),
  reason: text("reason").notNull(),
  marketName: text("market_name"),
  estimatedProfit: decimal("estimated_profit", { precision: 10, scale: 2 }),
  confidence: text("confidence").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertFarmerSchema = createInsertSchema(farmers).omit({
  id: true,
  createdAt: true,
});

export const insertProduceListingSchema = createInsertSchema(produceListings).omit({
  id: true,
  createdAt: true,
});

export const insertBuyerRequirementSchema = createInsertSchema(buyerRequirements).omit({
  id: true,
  createdAt: true,
});

export const insertMarketPriceSchema = createInsertSchema(marketPrices).omit({
  id: true,
  updatedAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

export const insertSalesHistorySchema = createInsertSchema(salesHistory).omit({
  id: true,
  saleDate: true,
});

export const insertRecommendationSchema = createInsertSchema(recommendations).omit({
  id: true,
  createdAt: true,
});

export type Farmer = typeof farmers.$inferSelect;
export type InsertFarmer = z.infer<typeof insertFarmerSchema>;

export type ProduceListing = typeof produceListings.$inferSelect;
export type InsertProduceListing = z.infer<typeof insertProduceListingSchema>;

export type BuyerRequirement = typeof buyerRequirements.$inferSelect;
export type InsertBuyerRequirement = z.infer<typeof insertBuyerRequirementSchema>;

export type MarketPrice = typeof marketPrices.$inferSelect;
export type InsertMarketPrice = z.infer<typeof insertMarketPriceSchema>;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

export type SalesHistory = typeof salesHistory.$inferSelect;
export type InsertSalesHistory = z.infer<typeof insertSalesHistorySchema>;

export type Recommendation = typeof recommendations.$inferSelect;
export type InsertRecommendation = z.infer<typeof insertRecommendationSchema>;
