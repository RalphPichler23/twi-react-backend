// src/modules/Team/types.ts
export interface TeamMember {
  id: string;
  user_id: string;
  name: string;
  position: string;
  description: string | null;
  email: string;
  photo_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TeamMemberFormData {
  name: string;
  position: string;
  description: string;
  email: string;
  photo?: File | null;
  is_active: boolean;
}