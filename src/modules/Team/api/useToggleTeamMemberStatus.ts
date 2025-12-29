// src/modules/Team/api/useToggleTeamMemberStatus.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import { TEAM_MEMBERS } from './_keys';

interface ToggleStatusParams {
  id: string;
  isActive: boolean;
}

const toggleTeamMemberStatus = async ({ id, isActive }: ToggleStatusParams): Promise<void> => {
  const { error } = await supabase
    .from('team_members')
    .update({ is_active: !isActive })
    .eq('id', id);

  if (error) throw error;
};

export default function useToggleTeamMemberStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleTeamMemberStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TEAM_MEMBERS] });
    },
  });
}