import { useState } from "react";
import useUploadPropertyVideo from "@modules/Properties/Details/api/useUploadPropertyVideo";
import useDeletePropertyVideo from "@modules/Properties/Details/api/useDeletePropertyVideo";
import type { Property } from "@modules/Properties/types";

interface Props {
  property: Property;
}

const PropertyVideoManager = ({ property }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(!!property.video_url);

  const { mutate: uploadVideo, isPending: isUploading } =
    useUploadPropertyVideo(property.id);

  const { mutate: deleteVideo, isPending: isDeleting } =
    useDeletePropertyVideo(property.id);

  const isLoading = isUploading || isDeleting;

  const videoPath = property.video_url
    ? property.video_url.split("/property_video/")[1]
    : null;

  const videoFileName =
    file?.name ||
    (videoPath ? videoPath.split("/").pop() : null);

  return (
    <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Header (Clickable) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h11a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"
              />
            </svg>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">Objektvideo</h2>
            <p className="text-xs text-gray-600">
              {videoFileName
                ? `Ausgewählt: ${videoFileName}`
                : "Optional – ein Video pro Immobilie"}
            </p>
          </div>
        </div>

        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Collapsible Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6">
          {property.video_url ? (
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden bg-black">
                <video
                  src={property.video_url}
                  controls
                  className="w-full aspect-video object-cover"
                />

                <div className="absolute top-3 right-3 flex gap-2">
                  <label className="cursor-pointer bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-800 hover:bg-white shadow transition">
                    Ersetzen
                    <input
                      type="file"
                      accept="video/mp4"
                      hidden
                      onChange={(e) => {
                        const selected = e.target.files?.[0];
                        if (!selected || !videoPath) return;

                        setFile(selected);

                        uploadVideo({
                          propertyId: property.id,
                          file: selected,
                          existingVideoPath: videoPath,
                        });
                      }}
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      videoPath &&
                      deleteVideo({ propertyId: property.id, videoPath })
                    }
                    className="bg-red-500/90 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-red-600 shadow transition"
                  >
                    Löschen
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <p className="font-semibold text-gray-900 mb-1">
                Kein Video vorhanden
              </p>
              <p className="text-sm text-gray-500 mb-4">
                MP4-Datei hochladen (optional)
              </p>

              <label className="cursor-pointer inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/20 transition">
                Datei auswählen
                <input
                  type="file"
                  accept="video/mp4"
                  hidden
                  onChange={(e) => {
                    const selected = e.target.files?.[0];
                    if (!selected) return;
                    setFile(selected);
                    setIsOpen(true);
                  }}
                />
              </label>

              {file && (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() =>
                      uploadVideo({
                        propertyId: property.id,
                        file,
                      })
                    }
                    className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition"
                  >
                    Video hochladen
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
          <div className="flex items-center gap-3 text-primary font-semibold">
            <svg
              className="w-6 h-6 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v2m0 12v2m8-8h-2M6 12H4"
              />
            </svg>
            Verarbeitung läuft…
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyVideoManager;
