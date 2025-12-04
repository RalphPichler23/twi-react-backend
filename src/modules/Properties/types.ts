
export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  district: string;
  price: number;
  area: number;
  rooms: number;
  bathrooms: number;
  type: 'house' | 'apartment' | 'commercial' | 'land';
  status: 'available' | 'sold' | 'reserved';
  image_url: string | null;
  description: string | null;
  features: string[] | null;
  created_at: string;
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