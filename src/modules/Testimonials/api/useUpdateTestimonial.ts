// src/modules/Testimonials/api/useUpdateTestimonial.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import type { TestimonialFormData } from '@testimonials/types';
import { TESTIMONIALS, SINGLE_TESTIMONIAL } from './_keys';

interface UpdateTestimonialParams {
  id: string;
  formData: TestimonialFormData;
}

const updateTestimonial = async ({ id, formData }: UpdateTestimonialParams) => {
  let photoUrl: string | null | undefined = undefined;

  // Upload new photo if provided
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

  const updateData: any = {
    client_name: formData.client_name,
    client_position: formData.client_position,
    client_company: formData.client_company,
    testimonial_text: formData.testimonial_text,
    rating: formData.rating,
    is_active: formData.is_active,
  };

  if (photoUrl) {
    updateData.photo_url = photoUrl;
  }

  const { data, error } = await supabase
    .from('testimonials')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export default function useUpdateTestimonial(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: TestimonialFormData) => updateTestimonial({ id, formData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TESTIMONIALS] });
      queryClient.invalidateQueries({ queryKey: [SINGLE_TESTIMONIAL, id] });
    },
  });
}