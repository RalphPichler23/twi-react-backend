// src/modules/Team/api/useCreateTeamMember.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import type { TeamMemberFormData } from '@team/types';
import { TEAM_MEMBERS } from './_keys';

const createTeamMember = async (formData: TeamMemberFormData) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  let photoUrl = null;

  // Upload photo if provided
  if (formData.photo) {
    const fileExt = formData.photo.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `team/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('team_photos')
      .upload(filePath, formData.photo, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('team_photos')
      .getPublicUrl(filePath);

    photoUrl = publicUrl;
  }

  const { data, error } = await supabase
    .from('team_members')
    .insert({
      user_id: user.id,
      name: formData.name,
      position: formData.position,
      description: formData.description,
      email: formData.email,
      photo_url: photoUrl,
      is_active: formData.is_active,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export default function useCreateTeamMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TEAM_MEMBERS] });
    },
  });
}