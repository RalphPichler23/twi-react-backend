// src/modules/Properties/Details/api/useUpdatePropertyImage.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import { SINGLE_PROPERTY } from './_keys';
import type { PropertyImage } from '@modules/Properties/types';

interface UpdateImageParams {
  propertyId: string;
  imageId: string;
  updates: Partial<Pick<PropertyImage, 'display_order' | 'is_primary'>>;
}

const updatePropertyImage = async ({
  propertyId,
  imageId,
  updates,
}: UpdateImageParams): Promise<void> => {
  // If setting as primary, first remove primary from all other images
  if (updates.is_primary) {
    await supabase
      .from('property_images')
      .update({ is_primary: false })
      .eq('property_id', propertyId);
  }

  // Update the image
  const { error } = await supabase
    .from('property_images')
    .update(updates)
    .eq('id', imageId);

  if (error) {
    throw new Error(`Update fehlgeschlagen: ${error.message}`);
  }

  // If this is now the primary image, update property.image_url
  if (updates.is_primary) {
    const { data: imageData } = await supabase
      .from('property_images')
      .select('image_url')
      .eq('id', imageId)
      .single();

    if (imageData) {
      await supabase
        .from('properties')
        .update({ image_url: imageData.image_url })
        .eq('id', propertyId);
    }
  }
};

export default function useUpdatePropertyImage(propertyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePropertyImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SINGLE_PROPERTY, propertyId] });
    },
  });
}