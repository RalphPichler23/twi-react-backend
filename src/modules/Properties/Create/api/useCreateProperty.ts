// src/modules/Properties/Create/api/useCreateProperty.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import { PROPERTIES } from '@modules/Properties/Overview/api/_keys';
import type { Property } from '@modules/Properties/types';
import type { PropertyCreateForm } from '../types';

const createProperty = async (formData: PropertyCreateForm): Promise<Property> => {
  // TODO: Implement Supabase Storage upload for images
  // For now, use a placeholder image or null
  const imageUrl = formData.images.length > 0 
    ? 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200' //TODO: replace with actual upload logic
    : null;

  const userId = await supabase.auth.getUser().then(({ data }) => data.user?.id || null);

  const propertyData = {
    user_id: userId,
    title: formData.title,
    address: formData.address,
    city: formData.city,
    district: formData.district, // Now PLZ
    price: formData.price,
    area: formData.area,
    rooms: formData.rooms,
    bathrooms: formData.bathrooms,
    type: formData.type,
    status: formData.status,
    description: formData.description || null,
    features: formData.features.length > 0 ? formData.features : null,
    image_url: imageUrl,
  };

  console.log('Creating property with data:', propertyData);

  const { data, error } = await supabase
    .from('properties')
    .insert(propertyData)
    .select()
    .single();

  if (error) {
    console.error('Supabase error:', error);
    throw error;
  }

  return data as Property;
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