// src/modules/Blog/api/useCreateBlogPost.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import { BLOG_POSTS } from './_keys';
import type { CreateBlogPostParams } from '../types';

const createBlogPost = async (params: CreateBlogPostParams): Promise<void> => {
  const userId = await supabase.auth.getUser().then(({ data }) => data.user?.id || null);

  if (!userId) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('blog_posts')
    .insert([{ ...params, user_id: userId }]);

  if (error) throw error;
};

export default function useCreateBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BLOG_POSTS] });
    },
  });
}