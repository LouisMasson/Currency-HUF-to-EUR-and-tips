import { pgTable, text, serial, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const exchangeRates = pgTable("exchange_rates", {
  id: serial("id").primaryKey(),
  rate: numeric("rate", { precision: 10, scale: 4 }).notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const insertExchangeRateSchema = createInsertSchema(exchangeRates).pick({
  rate: true,
});

export type InsertExchangeRate = z.infer<typeof insertExchangeRateSchema>;
export type ExchangeRate = typeof exchangeRates.$inferSelect;
