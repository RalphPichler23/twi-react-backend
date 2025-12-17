// src/modules/Dashboard/api/useFetchRecentProperties.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import { RECENT_PROPERTIES } from './_keys';
import type { Property } from '@modules/Properties/types';

const fetchRecentProperties = async (limit: number = 5): Promise<Property[]> => {
  const userId = await supabase.auth.getUser().then(({ data }) => data.user?.id || null);

  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data as Property[];
};

export default function useFetchRecentProperties(limit?: number) {
  return useQuery({
    queryKey: [RECENT_PROPERTIES, limit],
    queryFn: () => fetchRecentProperties(limit),
  });
}