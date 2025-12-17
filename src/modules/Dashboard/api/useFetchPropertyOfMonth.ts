// src/modules/Dashboard/api/useFetchPropertyOfMonth.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import type { Property } from '@modules/Properties/types';

const PROPERTY_OF_MONTH_KEY = 'property-of-month';

const fetchPropertyOfMonth = async (): Promise<Property | null> => {
  const userId = await supabase.auth.getUser().then(({ data }) => data.user?.id || null);

  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('user_id', userId)
    .eq('is_property_of_month', true)
    .maybeSingle();

  if (error) {
    console.error('Error fetching property of month:', error);
    return null;
  }

  return data as Property | null;
};

export default function useFetchPropertyOfMonth() {
  return useQuery({
    queryKey: [PROPERTY_OF_MONTH_KEY],
    queryFn: fetchPropertyOfMonth,
  });
}