// src/modules/Properties/Details/api/useUploadPropertyImage.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import { SINGLE_PROPERTY } from './_keys';
import type { PropertyImage } from '@modules/Properties/types';

interface UploadImageParams {
  propertyId: string;
  file: File;
  displayOrder: number;
  isPrimary: boolean;
}

const uploadPropertyImage = async ({
  propertyId,
  file,
  displayOrder,
  isPrimary,
}: UploadImageParams): Promise<PropertyImage> => {
  // Upload to Supabase Storage
  const fileExt = file.name.split('.').pop();
  const timestamp = Date.now();
  const fileName = `${propertyId}/${timestamp}-${displayOrder}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('property_images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    throw new Error(`Upload fehlgeschlagen: ${uploadError.message}`);
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('property_images')
    .getPublicUrl(fileName);

  // Insert into database
  const { data: dbData, error: dbError } = await supabase
    .from('property_images')
    .insert({
      property_id: propertyId,
      image_url: urlData.publicUrl,
      display_order: displayOrder,
      is_primary: isPrimary
    })
    .select()
    .single();

  if (dbError) {
    throw new Error(`Datenbank-Fehler: ${dbError.message}`);
  }

  // If this is the primary image, update property.image_url
  if (isPrimary) {
    await supabase
      .from('properties')
      .update({ image_url: urlData.publicUrl })
      .eq('id', propertyId);
  }

  return dbData as PropertyImage;
};

export default function useUploadPropertyImage(propertyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadPropertyImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SINGLE_PROPERTY, propertyId] });
    },
  });
}