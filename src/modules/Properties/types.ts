
export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  display_order: number;
  is_primary: boolean;
  created_at: string;
}

export interface Property {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  address: string;
  city: string;
  district: string;
  type: 'apartment' | 'house' | 'commercial' | 'land' | 'rental' | 'investment';
  status: 'available' | 'sold' | 'reserved';
  price: number;
  area: number;
  rooms: number;
  bathrooms: number;
  features: string[] | null;
  image_url: string | null;
  images?: PropertyImage[];
  is_property_of_month?: boolean;
  created_at: string;
  updated_at: string;
}

export interface PropertyFilters {
  search?: string;
  type?: string;
  status?: string;
  district?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  minRooms?: number;
  sortBy?: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}