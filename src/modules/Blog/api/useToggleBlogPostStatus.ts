// src/modules/Blog/api/useToggleBlogPostStatus.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import { BLOG_POSTS } from './_keys';

interface ToggleStatusParams {
  id: string;
  isPublished: boolean;
}

const toggleBlogPostStatus = async ({ id, isPublished }: ToggleStatusParams): Promise<void> => {
  const updates: any = { is_published: !isPublished };
  
  // Set published_at when publishing for the first time
  if (!isPublished) {
    updates.published_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from('blog_posts')
    .update(updates)
    .eq('id', id);

  if (error) throw error;
};

export default function useToggleBlogPostStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleBlogPostStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BLOG_POSTS] });
    },
  });
}