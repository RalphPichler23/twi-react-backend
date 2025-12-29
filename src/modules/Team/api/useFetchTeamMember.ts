// src/modules/Team/api/useTeamMember.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import type { TeamMember } from '@team/types';
import { SINGLE_TEAM_MEMBER } from './_keys';

const fetchTeamMember = async (id: string): Promise<TeamMember> => {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export default function useTeamMember(id: string) {
  return useQuery({
    queryKey: [SINGLE_TEAM_MEMBER, id],
    queryFn: () => fetchTeamMember(id),
    enabled: !!id,
  });
}