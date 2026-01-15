// src/modules/Blog/api/useFetchBlogPost.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import type { BlogPost } from '../types';
import { SINGLE_BLOG_POST } from './_keys';

const fetchBlogPost = async (id: string): Promise<BlogPost> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export default function useFetchBlogPost(id: string) {
  return useQuery({
    queryKey: [SINGLE_BLOG_POST, id],
    queryFn: () => fetchBlogPost(id),
    enabled: !!id,
  });
}