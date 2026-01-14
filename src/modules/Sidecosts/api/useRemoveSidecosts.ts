// src/modules/Sidecosts/api/useRemoveSidecost.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import { SIDECOSTS_RENT, SIDECOSTS_PURCHASE } from './_keys';

const removeSidecost = async (type: 'rent' | 'purchase'): Promise<void> => {

  // List and delete all files for this type (no user folder)
  const { data: files, error: listError } = await supabase
    .storage
    .from('sidecosts')
    .list(type);

  if (listError) throw listError;
  if (!files || files.length === 0) return;

  const filesToDelete = files.map(f => `${type}/${f.name}`);
  
  const { error: deleteError } = await supabase
    .storage
    .from('sidecosts')
    .remove(filesToDelete);

  if (deleteError) throw deleteError;
};

export default function useRemoveSidecost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeSidecost,
    onSuccess: (_, type) => {
      const queryKey = type === 'rent' ? SIDECOSTS_RENT : SIDECOSTS_PURCHASE;
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
}