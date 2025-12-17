// src/modules/Dashboard/api/useFetchDashboardStats.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import { DASHBOARD_STATS } from './_keys';
import type { DashboardStats } from '../types';

const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const userId = await supabase.auth.getUser().then(({ data }) => data.user?.id || null);

  // Get all properties for user
  const { data: properties, error } = await supabase
    .from('properties')
    .select('price, status, type')
    .eq('user_id', userId);

  if (error) throw error;

  // Calculate stats
  const totalProperties = properties?.length || 0;
  const availableProperties = properties?.filter(p => p.status === 'available').length || 0;
  const soldProperties = properties?.filter(p => p.status === 'sold').length || 0;
  const reservedProperties = properties?.filter(p => p.status === 'reserved').length || 0;
  
  const totalValue = properties?.reduce((sum, p) => sum + (p.price || 0), 0) || 0;
  const averagePrice = totalProperties > 0 ? totalValue / totalProperties : 0;

  return {
    totalProperties,
    availableProperties,
    soldProperties,
    reservedProperties,
    totalValue,
    averagePrice,
  };
};

export default function useFetchDashboardStats() {
  return useQuery({
    queryKey: [DASHBOARD_STATS],
    queryFn: fetchDashboardStats,
  });
}