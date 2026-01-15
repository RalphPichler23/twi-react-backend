// src/modules/Blog/api/useFetchBlogPosts.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import type { BlogPost } from '../types';
import { BLOG_POSTS } from './_keys';

const fetchBlogPosts = async (): Promise<BlogPost[]> => {

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export default function useFetchBlogPosts() {
  return useQuery({
    queryKey: [BLOG_POSTS],
    queryFn: fetchBlogPosts,
  });
}