import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import { SINGLE_PROPERTY } from './_keys';
import { PROPERTIES } from '@modules/Properties/Overview/api/_keys';
import type { Property } from'@modules/Properties/types';

interface UpdatePropertyArgs {
  id: string;
  data: Partial<Property>;
}

const updateProperty = async ({ id, data }: UpdatePropertyArgs) => {
  const { data: updated, error } = await supabase
    .from('properties')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return updated as Property;
};

export default function useUpdateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProperty,
    onSuccess: (updated) => {
      // 🔄 Liste aktualisieren (properties)
      queryClient.invalidateQueries({ queryKey: [PROPERTIES] });

      // 🔄 Einzelnes Objekt aktualisieren (single_property)
      queryClient.setQueryData([SINGLE_PROPERTY, updated.id], updated);
    },
  });
}
