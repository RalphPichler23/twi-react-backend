// src/modules/Dashboard/api/useSetPropertyOfMonth.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import { PROPERTIES } from '@modules/Properties/Overview/api/_keys';
import { PROPERTY_OF_MONTH } from './_keys';

const setPropertyOfMonth = async (propertyId: string): Promise<void> => {
 
  // First, unset any existing property of month for this user
  const { error: unsetError } = await supabase
    .from('properties')
    .update({ is_property_of_month: false })
    .eq('is_property_of_month', true);

  if (unsetError) throw unsetError;

  // Then set the new property of month
  const { error: setError } = await supabase
    .from('properties')
    .update({ is_property_of_month: true })
    .eq('id', propertyId);

  if (setError) throw setError;
};

export default function useSetPropertyOfMonth() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setPropertyOfMonth,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROPERTY_OF_MONTH] });
      queryClient.invalidateQueries({ queryKey: [PROPERTIES] });
    },
  });
}