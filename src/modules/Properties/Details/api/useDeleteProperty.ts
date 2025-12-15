import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import { PROPERTIES } from '@modules/Properties/Overview/api/_keys';
import type { Property } from'@modules/Properties/types';

const deleteProperty = async ({ id }: { id: string }) => {
  const { data: deleted, error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return deleted as Property;
};

export default function useDeleteProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROPERTIES] });
    },
  });
}
