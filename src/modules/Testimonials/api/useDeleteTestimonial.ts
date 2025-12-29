// src/modules/Testimonials/api/useDeleteTestimonial.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import { TESTIMONIALS } from './_keys';

const deleteTestimonial = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export default function useDeleteTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TESTIMONIALS] });
    },
  });
}