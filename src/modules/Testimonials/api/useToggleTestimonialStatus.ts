// src/modules/Testimonials/api/useToggleTestimonialStatus.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import { TESTIMONIALS } from './_keys';

interface ToggleStatusParams {
  id: string;
  isActive: boolean;
}

const toggleTestimonialStatus = async ({ id, isActive }: ToggleStatusParams): Promise<void> => {
  const { error } = await supabase
    .from('testimonials')
    .update({ is_active: !isActive })
    .eq('id', id);

  if (error) throw error;
};

export default function useToggleTestimonialStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleTestimonialStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TESTIMONIALS] });
    },
  });
}