// src/modules/Team/api/useDeleteTeamMember.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import { TEAM_MEMBERS } from './_keys';

const deleteTeamMember = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export default function useDeleteTeamMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TEAM_MEMBERS] });
    },
  });
}