// src/modules/Blog/api/useUpdateBlogPost.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import { BLOG_POSTS, SINGLE_BLOG_POST } from './_keys';
import type { UpdateBlogPostParams } from '../types';

const updateBlogPost = async ({ id, ...params }: UpdateBlogPostParams): Promise<void> => {
  const { error } = await supabase
    .from('blog_posts')
    .update(params)
    .eq('id', id);

  if (error) throw error;
};

export default function useUpdateBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBlogPost,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [BLOG_POSTS] });
      queryClient.invalidateQueries({ queryKey: [SINGLE_BLOG_POST, variables.id] });
    },
  });
}