// src/modules/Properties/Create/components/PropertyImagesStep.tsx
import { useRef, useState } from 'react';
import Button from '@/shared/components/ui/Button';
import type { PropertyCreateForm } from '../types';

interface PropertyImagesStepProps {
  data: PropertyCreateForm;
  onChange: (data: Partial<PropertyCreateForm>) => void;
  errors: Record<string, string>;
}

interface ImagePreview {
  file: File;
  preview: string;
  isPrimary: boolean;
}

const PropertyImagesStep = ({ data, onChange, errors }: PropertyImagesStepProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    addNewImages(files);
  };

  const addNewImages = (files: File[]) => {
    const newPreviews: ImagePreview[] = files.map((file, index) => ({
      file,
      preview: URL.createObjectURL(file),
      isPrimary: imagePreviews.length === 0 && index === 0 // Erstes Bild ist primary
    }));

    const updatedPreviews = [...imagePreviews, ...newPreviews];
    setImagePreviews(updatedPreviews);
    
    const updatedFiles = updatedPreviews.map(img => img.file);
    onChange({ images: updatedFiles });
  };

  const handleRemove = (index: number) => {
    const removedImage = imagePreviews[index];
    const wasPrimary = removedImage.isPrimary;
    
    // Revoke URL to prevent memory leaks
    URL.revokeObjectURL(removedImage.preview);
    
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    
    // Wenn das Primary-Bild gelöscht wurde, mache das erste zum Primary
    if (wasPrimary && newPreviews.length > 0) {
      newPreviews[0].isPrimary = true;
    }
    
    setImagePreviews(newPreviews);
    onChange({ images: newPreviews.map(img => img.file) });
  };

  const handleSetPrimary = (index: number) => {
    const updatedPreviews = imagePreviews.map((img, i) => ({
      ...img,
      isPrimary: i === index
    }));
    
    setImagePreviews(updatedPreviews);
    // Optional: Sortiere so dass Primary-Bild an erster Stelle ist
    // const reordered = [updatedPreviews[index], ...updatedPreviews.filter((_, i) => i !== index)];
    // setImagePreviews(reordered);
    // onChange({ images: reordered.map(img => img.file) });
  };

  // Drag & Drop für Sortierung
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === index) return;

    const newPreviews = [...imagePreviews];
    const draggedItem = newPreviews[draggedIndex];
    
    // Entferne das gezogene Element
    newPreviews.splice(draggedIndex, 1);
    // Füge es an der neuen Position ein
    newPreviews.splice(index, 0, draggedItem);
    
    setImagePreviews(newPreviews);
    setDraggedIndex(index);
    onChange({ images: newPreviews.map(img => img.file) });
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // Drag & Drop für Upload-Area
  const handleUploadAreaDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleUploadAreaDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );

    if (files.length === 0) return;
    addNewImages(files);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Bilder hochladen</h3>
        <p className="text-sm text-gray-600">Fügen Sie mehrere Fotos der Immobilie hinzu (optional)</p>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleUploadAreaDragOver}
        onDrop={handleUploadAreaDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center hover:border-primary hover:bg-primary/5 transition-all cursor-pointer ${
          errors.images ? 'border-red-300 bg-red-50/50' : 'border-gray-300'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="flex flex-col items-center gap-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            errors.images ? 'bg-red-100' : 'bg-primary/10'
          }`}>
            <svg className={`w-8 h-8 ${errors.images ? 'text-red-600' : 'text-primary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          
          <div>
            <p className="text-base font-semibold text-gray-900 mb-1">
              Bilder hochladen
            </p>
            <p className="text-sm text-gray-600">
              Klicken oder Dateien hierher ziehen
            </p>
            <p className="text-xs text-gray-500 mt-2">
              PNG, JPG, WEBP bis zu 10MB
            </p>
          </div>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            Dateien auswählen
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {errors.images && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex gap-2">
            <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p className="text-sm text-red-800">{errors.images}</p>
          </div>
        </div>
      )}

      {/* Image Grid */}
      {imagePreviews.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {imagePreviews.length} {imagePreviews.length === 1 ? 'Bild' : 'Bilder'} ausgewählt
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Ziehen Sie Bilder zum Sortieren • Klicken Sie auf den Stern für das Hauptbild
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                imagePreviews.forEach(img => URL.revokeObjectURL(img.preview));
                setImagePreviews([]);
                onChange({ images: [] });
              }}
            >
              Alle entfernen
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {imagePreviews.map((imagePreview, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`relative group cursor-move transition-all ${
                  draggedIndex === index ? 'opacity-50 scale-95' : ''
                }`}
              >
                <img
                  src={imagePreview.preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg border border-gray-200"
                />
                
                {/* Order Badge */}
                <div className="absolute top-2 left-2 bg-gray-900/80 text-white text-xs font-semibold px-2 py-1 rounded backdrop-blur-sm">
                  #{index + 1}
                </div>

                {/* Primary Star Button */}
                <button
                  type="button"
                  onClick={() => handleSetPrimary(index)}
                  className={`absolute top-2 right-2 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    imagePreview.isPrimary
                      ? 'bg-amber-500 text-white'
                      : 'bg-white/90 text-gray-400 hover:text-amber-500 hover:bg-white'
                  }`}
                  title={imagePreview.isPrimary ? 'Hauptbild' : 'Als Hauptbild festlegen'}
                >
                  <svg 
                    className="w-5 h-5" 
                    fill={imagePreview.isPrimary ? 'currentColor' : 'none'} 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </button>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute bottom-0 right-2 w-8 h-8 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>

                {/* Primary Badge Overlay */}
                {imagePreview.isPrimary && (
                  <div className="absolute top-2 left-12 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded shadow-lg">
                    Hauptbild
                  </div>
                )}

                {/* File Info */}
                <div className="mt-2">
                  <p className="text-xs text-gray-600 truncate">
                    {imagePreview.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(imagePreview.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                {/* Drag Handle Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-gray-900/80 text-white p-2 rounded-lg backdrop-blur-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyImagesStep;