// src/modules/Properties/Details/api/useFetchSingleProperty.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import { SINGLE_PROPERTY } from './_keys';
import type { Property, PropertyImage } from '@modules/Properties/types';

const fetchProperty = async (id: string): Promise<Property> => {
  // Fetch property with images
  const { data: property, error: propertyError } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (propertyError) throw propertyError;

  // Fetch all images for this property
  const { data: images, error: imagesError } = await supabase
    .from('property_images')
    .select('*')
    .eq('property_id', id);

  if (imagesError) {
    console.error('Failed to fetch images:', imagesError);
    // Don't throw - property is more important than images
  }

  return {
    ...property,
    images: (images as PropertyImage[]) || []
  } as Property;
};

export default function useFetchSingleProperty(id: string) {
  return useQuery({
    queryKey: [SINGLE_PROPERTY, id],
    queryFn: () => fetchProperty(id),
    enabled: !!id,
  });
}