// src/modules/Properties/Details/api/useBulkUpdateImageOrder.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import { SINGLE_PROPERTY } from './_keys';

interface BulkUpdateOrderParams {
  propertyId: string;
  images: Array<{ id: string; display_order: number }>;
}

const bulkUpdateImageOrder = async ({
  images,
}: BulkUpdateOrderParams): Promise<void> => {
  // Update all images in parallel
  const updates = images.map(img =>
    supabase
      .from('property_images')
      .update({ display_order: img.display_order })
      .eq('id', img.id)
  );

  const results = await Promise.all(updates);
  
  const errors = results.filter(r => r.error);
  if (errors.length > 0) {
    throw new Error('Einige Bilder konnten nicht aktualisiert werden');
  }
};

export default function useBulkUpdateImageOrder(propertyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bulkUpdateImageOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SINGLE_PROPERTY, propertyId] });
    },
  });
}