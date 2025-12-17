// src/modules/Dashboard/api/useRemovePropertyOfMonth.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import { PROPERTIES } from '@modules/Properties/Overview/api/_keys';
import { PROPERTY_OF_MONTH } from './_keys';

const removePropertyOfMonth = async (propertyId: string): Promise<void> => {
  const userId = await supabase.auth.getUser().then(({ data }) => data.user?.id || null);

  if (!userId) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('properties')
    .update({ is_property_of_month: false })
    .eq('id', propertyId)
    .eq('user_id', userId);

  if (error) throw error;
};

export default function useRemovePropertyOfMonth() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removePropertyOfMonth,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROPERTY_OF_MONTH] });
      queryClient.invalidateQueries({ queryKey: [PROPERTIES] });
    },
  });
}