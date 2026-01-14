// src/modules/Properties/api/useFetchProperties.ts
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import { PROPERTIES } from './_keys';
import type { Property, PropertyFilters } from '@modules/Properties/types';

interface FetchPropertiesResponse {
    data: Property[];
    count: number;
  }

const fetchProperties = async (
  filters: PropertyFilters,
  page = 1,
  pageSize = 9
): Promise<FetchPropertiesResponse> => {
  let query = supabase
    .from('properties')
    .select('*', { count: 'exact' })
    .range((page - 1) * pageSize, page * pageSize - 1);

  // Search filter
  if (filters.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,` +
      `address.ilike.%${filters.search}%,` +
      `city.ilike.%${filters.search}%,` +
      `district.ilike.%${filters.search}%`
    );
  }

  // Type filter
  if (filters.type) {
    query = query.eq('type', filters.type);
  }

  // Status filter
  if (filters.status) {
    query = query.eq('status', filters.status);
  }

  // District filter
  if (filters.district) {
    query = query.eq('district', filters.district);
  }

  // Price range
  if (filters.minPrice) {
    query = query.gte('price', filters.minPrice);
  }
  if (filters.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }

  // Area range
  if (filters.minArea) {
    query = query.gte('area', filters.minArea);
  }
  if (filters.maxArea) {
    query = query.lte('area', filters.maxArea);
  }

  // Rooms filter
  if (filters.minRooms) {
    query = query.gte('rooms', filters.minRooms);
  }

  // Sorting
  switch (filters.sortBy) {
    case 'price-asc':
      query = query.order('price', { ascending: true });
      break;
    case 'price-desc':
      query = query.order('price', { ascending: false });
      break;
    case 'area-asc':
      query = query.order('area', { ascending: true });
      break;
    case 'area-desc':
      query = query.order('area', { ascending: false });
      break;
    case 'oldest':
      query = query.order('created_at', { ascending: true });
      break;
    case 'newest':
    default:
      query = query.order('created_at', { ascending: false });
      break;
  }

  query = query.order('updated_at', { ascending: false });

  const { data, error, count } = await query;

  if (error) throw error;

  return { 
    data: data as Property[], // ✅ Direkt verwenden, keine Transformation
    count: count || 0 
  };
};

export default function useFetchProperties(
  filters: PropertyFilters = {},
  page = 1,
  pageSize = 9
) {
  return useQuery({
    queryKey: [PROPERTIES, filters, page, pageSize],
    queryFn: () => fetchProperties(filters, page, pageSize),
    placeholderData: keepPreviousData,
  });
}