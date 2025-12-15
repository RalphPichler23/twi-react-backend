// src/modules/Properties/Create/api/useCreateProperty.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import { PROPERTIES } from '@modules/Properties/Overview/api/_keys';
import type { Property } from '@modules/Properties/types';
import type { PropertyCreateForm } from '../types';

interface ImageUploadResult {
  url: string;
  display_order: number;
  is_primary: boolean;
}

const uploadPropertyImages = async (
  propertyId: string,
  images: File[],
  primaryIndex: number = 0
): Promise<ImageUploadResult[]> => {
  const uploadedImages: ImageUploadResult[] = [];

  for (let i = 0; i < images.length; i++) {
    const file = images[i];
    const fileExt = file.name.split('.').pop();
    const timestamp = Date.now();
    const fileName = `${propertyId}/${timestamp}-${i}.${fileExt}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('property_images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw new Error(`Bild-Upload fehlgeschlagen: ${uploadError.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('property_images')
      .getPublicUrl(fileName);

    const imageResult: ImageUploadResult = {
      url: urlData.publicUrl,
      display_order: i,
      is_primary: i === primaryIndex
    };

    uploadedImages.push(imageResult);

    // Insert into property_images table
    const { error: dbError } = await supabase
      .from('property_images')
      .insert({
        property_id: propertyId,
        image_url: urlData.publicUrl,
        display_order: i,
        is_primary: i === primaryIndex
      });

    if (dbError) {
      console.error('Database error:', dbError);
      // Continue despite error - we still have the file uploaded
    }
  }

  return uploadedImages;
};

const createProperty = async (formData: PropertyCreateForm): Promise<Property> => {
  const userId = await supabase.auth.getUser().then(({ data }) => data.user?.id || null);

  // Step 1: Create property record first (without image_url)
  const propertyData = {
    user_id: userId,
    title: formData.title,
    address: formData.address,
    city: formData.city,
    district: formData.district,
    price: formData.price,
    area: formData.area,
    rooms: formData.rooms,
    bathrooms: formData.bathrooms,
    type: formData.type,
    status: formData.status,
    description: formData.description || null,
    features: formData.features.length > 0 ? formData.features : null,
    image_url: null, // Will be updated after upload
  };

  console.log('Creating property with data:', propertyData);

  const { data: property, error: propertyError } = await supabase
    .from('properties')
    .insert(propertyData)
    .select()
    .single();

  if (propertyError) {
    console.error('Supabase error:', propertyError);
    throw propertyError;
  }

  // Step 2: Upload images if present
  if (formData.images && formData.images.length > 0) {
    try {
      // Get primary index from formData
      const primaryIndex = formData.primaryImageIndex ?? 0;

      const uploadedImages = await uploadPropertyImages(
        property.id,
        formData.images,
        primaryIndex
      );

      // Step 3: Update property with primary image URL
      const primaryImage = uploadedImages.find(img => img.is_primary) || uploadedImages[0];
      
      if (primaryImage) {
        const { error: updateError } = await supabase
          .from('properties')
          .update({ image_url: primaryImage.url })
          .eq('id', property.id);

        if (updateError) {
          console.error('Failed to update primary image:', updateError);
          // Don't throw - property is created, just missing image_url
        } else {
          // Update local property object
          property.image_url = primaryImage.url;
        }
      }
    } catch (uploadError) {
      console.error('Image upload failed:', uploadError);
      // Property is created, but images failed - you might want to handle this
      // Option 1: Throw error and rollback property creation
      // Option 2: Continue without images (current approach)
    }
  }

  return property as Property;
};

export default function useCreateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROPERTIES] });
    },
    onError: (error) => {
      console.error('Create property error:', error);
    },
  });
}