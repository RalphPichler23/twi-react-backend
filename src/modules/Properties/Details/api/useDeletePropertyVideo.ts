import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@lib/supabase";
import { SINGLE_PROPERTY } from "./_keys";

interface DeletePropertyVideoParams {
  propertyId: string;
  videoPath: string;
}

const BUCKET = "property_video";

const deletePropertyVideo = async ({
  propertyId,
  videoPath,
}: DeletePropertyVideoParams): Promise<void> => {
  // Delete from storage
  const { error: storageError } = await supabase.storage
    .from(BUCKET)
    .remove([videoPath]);

  if (storageError) {
    throw new Error(`Video löschen fehlgeschlagen: ${storageError.message}`);
  }

  // Remove URL from property
  const { error: dbError } = await supabase
    .from("properties")
    .update({ video_url: null })
    .eq("id", propertyId);

  if (dbError) {
    throw new Error(`DB Update fehlgeschlagen: ${dbError.message}`);
  }
};

export default function useDeletePropertyVideo(propertyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePropertyVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SINGLE_PROPERTY, propertyId],
      });
    },
  });
}
