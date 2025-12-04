import { useQuery } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import { SINGLE_PROPERTY } from './_keys';
import type { Property } from '@modules/Properties/types';

const fetchProperty = async (id: string): Promise<Property> => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;

  return data as Property;
};

export default function useFetchSingleProperty(id: string) {
  return useQuery({
    queryKey: [SINGLE_PROPERTY, id],
    queryFn: () => fetchProperty(id),
    enabled: !!id,
  });
}