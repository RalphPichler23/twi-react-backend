// src/modules/Team/api/useUpdateTeamMember.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import type { TeamMemberFormData } from '@team/types';
import { TEAM_MEMBERS, SINGLE_TEAM_MEMBER } from './_keys';

interface UpdateTeamMemberParams {
  id: string;
  formData: TeamMemberFormData;
}

const updateTeamMember = async ({ id, formData }: UpdateTeamMemberParams) => {
  let photoUrl: string | null | undefined = undefined;

  // Upload new photo if provided
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

  const updateData: any = {
    name: formData.name,
    position: formData.position,
    description: formData.description,
    email: formData.email,
    is_active: formData.is_active,
  };

  if (photoUrl) {
    updateData.photo_url = photoUrl;
  }

  const { data, error } = await supabase
    .from('team_members')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export default function useUpdateTeamMember(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: TeamMemberFormData) => updateTeamMember({ id, formData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TEAM_MEMBERS] });
      queryClient.invalidateQueries({ queryKey: [SINGLE_TEAM_MEMBER, id] });
    },
  });
}