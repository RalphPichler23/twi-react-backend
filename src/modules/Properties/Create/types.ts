import type { Property } from '@modules/Properties/types';

export interface PropertyCreateForm {
  primaryImageIndex?: number;
  title: string;
  address: string;
  city: string;
  district: string;
  price: number;
  area: number;
  rooms: number;
  bathrooms: number;
  type: Property['type'];
  status: Property['status'];
  description: string;
  features: string[];
  images: File[];
}

export type PropertyCreateStep = 'basic' | 'details' | 'images' | 'features';