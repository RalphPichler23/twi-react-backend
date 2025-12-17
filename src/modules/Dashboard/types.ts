// src/modules/Dashboard/types.ts
export interface DashboardStats {
  totalProperties: number;
  availableProperties: number;
  soldProperties: number;
  reservedProperties: number;
  totalValue: number;
  averagePrice: number;
}

export interface PropertyTypeStats {
  apartment: number;
  house: number;
  commercial: number;
}

export interface PropertyOfMonth {
  property_id: string;
  user_id: string;
  set_at: string;
}