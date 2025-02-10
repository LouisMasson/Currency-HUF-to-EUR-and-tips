import { exchangeRates, type ExchangeRate, type InsertExchangeRate } from "@shared/schema";

export interface IStorage {
  storeExchangeRate(rate: InsertExchangeRate): Promise<ExchangeRate>;
  getLatestRate(): Promise<ExchangeRate | undefined>;
}

export class MemStorage implements IStorage {
  private rates: ExchangeRate[];

  constructor() {
    this.rates = [];
  }

  async storeExchangeRate(insertRate: InsertExchangeRate): Promise<ExchangeRate> {
    const rate: ExchangeRate = {
      id: this.rates.length + 1,
      ...insertRate,
      timestamp: new Date(),
    };
    this.rates.push(rate);
    return rate;
  }

  async getLatestRate(): Promise<ExchangeRate | undefined> {
    return this.rates[this.rates.length - 1];
  }
}

export const storage = new MemStorage();
