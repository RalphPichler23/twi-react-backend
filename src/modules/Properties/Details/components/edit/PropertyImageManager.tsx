// src/modules/Properties/Details/components/edit/PropertyImageManager.tsx
import { useState, useRef, useEffect } from 'react';
import type { PropertyImage } from '@modules/Properties/types';
import useUploadPropertyImage from '@modules/Properties/Details/api/useUploadPropertyImage';
import useDeletePropertyImage from '@modules/Properties/Details/api/useDeletePropertyImage';
import useUpdatePropertyImage from '@modules/Properties/Details/api/useUpdatePropertyImage';
import useBulkUpdateImageOrder from '@modules/Properties/Details/api/useBulkUpdateImageOrder';

interface PropertyImageManagerProps {
  propertyId: string;
  images: PropertyImage[];
}

const PropertyImageManager = ({ propertyId, images }: PropertyImageManagerProps) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [localImages, setLocalImages] = useState<PropertyImage[]>(images);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadImage, isPending: isUploading } = useUploadPropertyImage(propertyId);
  const { mutate: deleteImage, isPending: isDeleting } = useDeletePropertyImage(propertyId);
  const { mutate: updateImage, isPending: isUpdating } = useUpdatePropertyImage(propertyId);
  const { mutate: bulkUpdateOrder } = useBulkUpdateImageOrder(propertyId);

  // Update local images when props change
  useEffect(() => {
    setLocalImages(images);
  }, [images]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const maxOrder = Math.max(...images.map(img => img.display_order), -1);

    // Upload files sequentially
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isPrimary = images.length === 0 && i === 0;
      
      uploadImage({
        propertyId,
        file,
        displayOrder: maxOrder + 1 + i,
        isPrimary,
      });
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSetPrimary = (imageId: string) => {
    updateImage({
      propertyId,
      imageId,
      updates: { is_primary: true },
    });
  };

  const handleDelete = (imageId: string, imageUrl: string) => {
    if (!confirm('Möchten Sie dieses Bild wirklich löschen?')) return;

    deleteImage({ propertyId, imageId, imageUrl });
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newImages = [...localImages];
    const draggedImage = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedImage);

    setDraggedIndex(index);
    setLocalImages(newImages);
  };

  const handleDragEnd = () => {
    if (draggedIndex === null) return;

    // Update display_order for all images
    const updates = localImages.map((img, i) => ({
      id: img.id,
      display_order: i,
    }));

    bulkUpdateOrder({ propertyId, images: updates });
    setDraggedIndex(null);
  };

  const isPending = isUploading || isDeleting || isUpdating;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Bildergalerie</h2>
            <p className="text-sm text-gray-600 mt-0.5">
              {images.length === 0 ? 'Keine Bilder' : `${images.length} ${images.length === 1 ? 'Bild' : 'Bilder'}`}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isPending}
          className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm hover:shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
          </svg>
          Bilder hochladen
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Loading State */}
      {isPending && (
        <div className="mb-6 bg-primary/5 border border-primary/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent" />
            <span className="text-sm font-medium text-primary">
              {isUploading && 'Bilder werden hochgeladen...'}
              {isDeleting && 'Bild wird gelöscht...'}
              {isUpdating && 'Wird aktualisiert...'}
            </span>
          </div>
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-16 text-center bg-gray-50">
          <div className="max-w-sm mx-auto">
            <svg className="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Keine Bilder vorhanden</h3>
            <p className="text-gray-600 mb-4">Laden Sie Bilder hoch, um eine ansprechende Galerie zu erstellen</p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 bg-white text-primary border-2 border-primary px-5 py-2.5 rounded-lg font-medium hover:bg-primary hover:text-white transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
              </svg>
              Jetzt hochladen
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {localImages.map((image, index) => (
              <div
                key={image.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`
                  relative group cursor-move border-2 rounded-2xl overflow-hidden transition-all
                  hover:shadow-xl
                  ${image.is_primary 
                    ? 'border-primary ring-4 ring-primary/20 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                  ${draggedIndex === index ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}
                `}
              >
                {/* Image */}
                <div className="aspect-[4/3] bg-gray-100">
                  <img
                    src={image.image_url}
                    alt={`Bild ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Primary Badge */}
                {image.is_primary && (
                  <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5 shadow-lg">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Hauptbild
                  </div>
                )}

                {/* Order Number */}
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-sm font-bold shadow-lg">
                  #{index + 1}
                </div>

                {/* Actions Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                    {!image.is_primary && (
                      <button
                        type="button"
                        onClick={() => handleSetPrimary(image.id)}
                        className="flex-1 bg-white text-gray-900 py-2.5 px-3 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                        title="Als Hauptbild setzen"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                        </svg>
                        Primary
                      </button>
                    )}
                    
                    <button
                      type="button"
                      onClick={() => handleDelete(image.id, image.image_url)}
                      className={`${image.is_primary ? 'flex-1' : ''} bg-red-500 text-white py-2.5 px-3 rounded-lg hover:bg-red-600 transition-colors font-medium text-sm flex items-center justify-center gap-2`}
                      title="Löschen"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                      {image.is_primary ? 'Löschen' : ''}
                    </button>
                  </div>
                </div>

                {/* Drag Handle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyImageManager;