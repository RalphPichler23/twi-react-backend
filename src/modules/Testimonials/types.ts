// src/modules/Testimonials/types.ts
export interface Testimonial {
  id: string;
  user_id: string;
  client_name: string;
  client_position: string | null;
  client_company: string | null;
  testimonial_text: string;
  rating: number | null;
  photo_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TestimonialFormData {
  client_name: string;
  client_position: string;
  client_company: string;
  testimonial_text: string;
  rating: number | null;
  photo: File | null;
  is_active: boolean;
}