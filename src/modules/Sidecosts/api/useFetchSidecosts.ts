// src/modules/Sidecosts/api/useFetchSidecosts.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import { SIDECOSTS_RENT, SIDECOSTS_PURCHASE } from './_keys';
import type { SidecostFile } from '../types';

const fetchSidecost = async (type: 'rent' | 'purchase'): Promise<SidecostFile | null> => {
  try {
    // List files in the type folder (no user folder)
    const { data: files, error: listError } = await supabase
      .storage
      .from('sidecosts')
      .list(type);

    if (listError) throw listError;
    if (!files || files.length === 0) return null;

    // Get the most recent file
    const latestFile = files.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0];

    // Get public URL
    const { data: urlData } = supabase
      .storage
      .from('sidecosts')
      .getPublicUrl(`${type}/${latestFile.name}`);

    return {
      id: latestFile.id,
      type,
      filename: latestFile.name,
      url: urlData.publicUrl,
      uploaded_at: latestFile.created_at,
      file_size: latestFile.metadata?.size || 0,
    };
  } catch (error) {
    console.error(`Error fetching sidecost for ${type}:`, error);
    return null;
  }
};

export function useFetchRentSidecost() {
  return useQuery({
    queryKey: [SIDECOSTS_RENT],
    queryFn: () => fetchSidecost('rent'),
  });
}

export function useFetchPurchaseSidecost() {
  return useQuery({
    queryKey: [SIDECOSTS_PURCHASE],
    queryFn: () => fetchSidecost('purchase'),
  });
}