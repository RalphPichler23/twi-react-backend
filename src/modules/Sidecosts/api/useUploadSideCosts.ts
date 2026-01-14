// src/modules/Sidecosts/api/useUploadSidecost.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@lib/supabase';
import { SIDECOSTS_RENT, SIDECOSTS_PURCHASE } from './_keys';
import type { UploadSidecostParams } from '../types';

const uploadSidecost = async ({ type, file }: UploadSidecostParams): Promise<void> => {

  // Validate file type
  if (file.type !== 'application/pdf') {
    throw new Error('Nur PDF-Dateien sind erlaubt');
  }

  // Validate file size (max 10MB)
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('Datei ist zu groß (max. 10MB)');
  }

  // Delete existing file first (no user folder)
  const { data: existingFiles } = await supabase
    .storage
    .from('sidecosts')
    .list(type);

  if (existingFiles && existingFiles.length > 0) {
    const filesToDelete = existingFiles.map(f => `${type}/${f.name}`);
    await supabase.storage.from('sidecosts').remove(filesToDelete);
  }

  // Upload new file with timestamp to avoid caching issues
  // WICHTIG: Keine Umlaute im Dateinamen!
  const timestamp = Date.now();
  const fileExt = file.name.split('.').pop();
  const fileName = `nebenkosten_${type}_${timestamp}.${fileExt}`;
  const filePath = `${type}/${fileName}`;

  const { error: uploadError } = await supabase
    .storage
    .from('sidecosts')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (uploadError) throw uploadError;
};

export default function useUploadSidecost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadSidecost,
    onSuccess: (_, variables) => {
      // Invalidate the appropriate query based on type
      const queryKey = variables.type === 'rent' ? SIDECOSTS_RENT : SIDECOSTS_PURCHASE;
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
}