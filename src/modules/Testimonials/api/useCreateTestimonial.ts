// src/modules/Testimonials/api/useCreateTestimonial.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import type { TestimonialFormData } from '@testimonials/types';
import { TESTIMONIALS } from './_keys';

const createTestimonial = async (formData: TestimonialFormData) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  let photoUrl = null;

  // Upload photo if provided
  if (formData.photo) {
    const fileExt = formData.photo.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('testimonial_photos')
      .upload(fileName, formData.photo, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('testimonial_photos')
      .getPublicUrl(fileName);

    photoUrl = publicUrl;
  }

  const { data, error } = await supabase
    .from('testimonials')
    .insert({
      user_id: user.id,
      client_name: formData.client_name,
      client_position: formData.client_position,
      client_company: formData.client_company,
      testimonial_text: formData.testimonial_text,
      rating: formData.rating,
      photo_url: photoUrl,
      is_active: formData.is_active,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export default function useCreateTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TESTIMONIALS] });
    },
  });
}