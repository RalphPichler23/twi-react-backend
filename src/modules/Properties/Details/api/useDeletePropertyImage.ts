// src/modules/Properties/Details/api/useDeletePropertyImage.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import { SINGLE_PROPERTY } from './_keys';

interface DeleteImageParams {
  propertyId: string;
  imageId: string;
  imageUrl: string;
}

const deletePropertyImage = async ({
  propertyId,
  imageId,
  imageUrl,
}: DeleteImageParams): Promise<void> => {
  // Extract file path from URL
  const urlParts = imageUrl.split('/property_images/');
  if (urlParts.length === 2) {
    const filePath = urlParts[1];
    
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('property_images')
      .remove([filePath]);

    if (storageError) {
      console.error('Storage delete error:', storageError);
    }
  }

  // Delete from database
  const { error: dbError } = await supabase
    .from('property_images')
    .delete()
    .eq('id', imageId);

  if (dbError) {
    throw new Error(`Löschen fehlgeschlagen: ${dbError.message}`);
  }
};

export default function useDeletePropertyImage(propertyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePropertyImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SINGLE_PROPERTY, propertyId] });
    },
  });
}