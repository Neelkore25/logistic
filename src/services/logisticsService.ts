import { TradeType } from '../types/export';

export interface LogisticsEstimate {
  origin: string;
  destination: string;
  transportMode: 'Ocean Freight' | 'Air Cargo' | 'Road Transit' | 'Rail Cargo';
  distanceKm: number;
  expectedDays: number;
  estimatedCostInr: number;
  stages: {
    name: string;
    durationDays: number;
    costInr: number;
    status: 'pending' | 'in_progress' | 'completed';
  }[];
}

export const logisticsService = {
  /**
   * Calculates realistic logistics movement estimates based on TradeType and locations
   */
  calculateLogistics(
    tradeType: TradeType,
    originCity: string = 'Mumbai',
    destinationLocation: string = 'Hamburg',
    grossWeightKg: number = 1000
  ): LogisticsEstimate {
    if (tradeType === 'domestic') {
      const distance = 850;
      const freightPerKg = 12; // ₹12/kg domestic trucking
      const baseCost = Math.max(15000, Math.round(grossWeightKg * freightPerKg));

      return {
        origin: originCity || 'Mumbai (Maharashtra)',
        destination: destinationLocation || 'New Delhi (NCR)',
        transportMode: 'Road Transit',
        distanceKm: distance,
        expectedDays: 4,
        estimatedCostInr: baseCost + 4500,
        stages: [
          { name: 'Factory Pickup & Stuffing', durationDays: 1, costInr: 3000, status: 'completed' },
          { name: 'National Highway Corridor Transit', durationDays: 2, costInr: baseCost, status: 'in_progress' },
          { name: 'Destination Hub Unloading & e-Way Verification', durationDays: 1, costInr: 1500, status: 'pending' }
        ]
      };
    }

    // International Export
    const freightRate = 165; // ~₹165/kg ocean equivalent for 20ft container allocation
    const oceanFreight = Math.max(120000, Math.round(grossWeightKg * freightRate));

    return {
      origin: originCity ? `${originCity} ➔ JNPT Nhava Sheva` : 'Palghar ➔ JNPT Nhava Sheva (INNSA)',
      destination: destinationLocation || 'Port of Hamburg (DEHAM), Germany',
      transportMode: 'Ocean Freight',
      distanceKm: 7800,
      expectedDays: 24,
      estimatedCostInr: oceanFreight + 35000,
      stages: [
        { name: 'Inland Transport to Port', durationDays: 1, costInr: 18000, status: 'completed' },
        { name: 'Customs ICEGATE LEO Clearance', durationDays: 1, costInr: 12000, status: 'completed' },
        { name: 'Container Terminal Loading (THC)', durationDays: 2, costInr: 14500, status: 'completed' },
        { name: 'Ocean Passage via Suez Canal', durationDays: 18, costInr: oceanFreight, status: 'in_progress' },
        { name: 'Destination Zoll Customs Clearance', durationDays: 2, costInr: 18000, status: 'pending' }
      ]
    };
  }
};
