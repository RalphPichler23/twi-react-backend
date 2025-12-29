// src/modules/Team/api/useFetchTeamMembers.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import type { TeamMember } from '@team/types';
import { TEAM_MEMBERS } from './_keys';

const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data || [];
};

export default function useFetchTeamMembers() {
  return useQuery({
    queryKey: [TEAM_MEMBERS],
    queryFn: fetchTeamMembers,
  });
}