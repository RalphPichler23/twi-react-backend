// src/modules/Testimonials/api/useFetchTestimonials.ts
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import type { Testimonial } from '@testimonials/types';
import { TESTIMONIALS } from './_keys';

const fetchTestimonials = async (): Promise<Testimonial[]> => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export default function useFetchTestimonials(): UseQueryResult<Testimonial[], Error> {
  return useQuery({
    queryKey: [TESTIMONIALS],
    queryFn: fetchTestimonials,
  });
}