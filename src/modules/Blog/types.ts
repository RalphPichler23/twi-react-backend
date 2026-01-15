// src/modules/Blog/types.ts
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url: string | null;
  author: string;
  published_at: string | null;
  is_published: boolean;
  reading_time: number; // in Minuten
  tags: string[];
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface CreateBlogPostParams {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url?: string | null;
  author: string;
  published_at?: string | null;
  is_published: boolean;
  reading_time: number;
  tags: string[];
}

export interface UpdateBlogPostParams extends Partial<CreateBlogPostParams> {
  id: string;
}