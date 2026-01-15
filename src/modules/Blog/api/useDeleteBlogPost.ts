// src/modules/Blog/api/useDeleteBlogPost.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import { BLOG_POSTS } from './_keys';

const deleteBlogPost = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export default function useDeleteBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BLOG_POSTS] });
    },
  });
}