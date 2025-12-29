// src/modules/Testimonials/api/useFetchTestimonial.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import type { Testimonial } from '@testimonials/types';
import { SINGLE_TESTIMONIAL } from './_keys';

const fetchTestimonial = async (id: string): Promise<Testimonial> => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export default function useFetchTestimonial(id: string) {
  return useQuery({
    queryKey: [SINGLE_TESTIMONIAL, id],
    queryFn: () => fetchTestimonial(id),
    enabled: !!id,
  });
}