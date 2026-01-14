import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@lib/supabase";
import { SINGLE_PROPERTY } from "./_keys";

interface UploadPropertyVideoParams {
  propertyId: string;
  file: File;
  existingVideoPath?: string | null;
}

const BUCKET = "property_video";

const uploadPropertyVideo = async ({
  propertyId,
  file,
  existingVideoPath,
}: UploadPropertyVideoParams): Promise<string> => {
  // Optional Guards
  if (file.type !== "video/mp4") {
    throw new Error("Nur MP4 Videos sind erlaubt");
  }

  if (file.size > 50 * 1024 * 1024) {
    throw new Error("Maximale Videogröße: 50MB");
  }

  // Delete old video if exists
  if (existingVideoPath) {
    await supabase.storage.from(BUCKET).remove([existingVideoPath]);
  }

  const timestamp = Date.now();
  const fileName = `${propertyId}/${timestamp}.mp4`;

  // Upload new video
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (uploadError) {
    throw new Error(`Video-Upload fehlgeschlagen: ${uploadError.message}`);
  }

  // Public URL
  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(fileName);

  // Save URL in properties table
  const { error: dbError } = await supabase
    .from("properties")
    .update({ video_url: data.publicUrl })
    .eq("id", propertyId);

  if (dbError) {
    throw new Error(`DB Update fehlgeschlagen: ${dbError.message}`);
  }

  return data.publicUrl;
};

export default function useUploadPropertyVideo(propertyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadPropertyVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SINGLE_PROPERTY, propertyId],
      });
    },
  });
}
