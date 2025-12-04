// src/modules/Properties/Create/components/PropertyImagesStep.tsx
import { useRef, useState } from 'react';
import Button from '@/shared/components/ui/Button';
import type { PropertyCreateForm } from '../types';

interface PropertyImagesStepProps {
  data: PropertyCreateForm;
  onChange: (data: Partial<PropertyCreateForm>) => void;
  errors: Record<string, string>;
}

const PropertyImagesStep = ({ data, onChange, errors }: PropertyImagesStepProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Add new files to existing
    const newImages = [...data.images, ...files];
    onChange({ images: newImages });

    // Create previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const handleRemove = (index: number) => {
    const newImages = data.images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    
    // Revoke URL to prevent memory leaks
    URL.revokeObjectURL(previews[index]);
    
    onChange({ images: newImages });
    setPreviews(newPreviews);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );

    if (files.length === 0) return;

    const newImages = [...data.images, ...files];
    onChange({ images: newImages });

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Bilder hochladen</h3>
        <p className="text-sm text-gray-600">Fügen Sie mehrere Fotos der Immobilie hinzu (optional)</p>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
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
      {previews.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-900">
              {previews.length} {previews.length === 1 ? 'Bild' : 'Bilder'} ausgewählt
            </p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                previews.forEach(url => URL.revokeObjectURL(url));
                setPreviews([]);
                onChange({ images: [] });
              }}
            >
              Alle entfernen
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg border border-gray-200"
                />
                
                {/* Primary Badge */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
                    Hauptbild
                  </div>
                )}

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>

                {/* File Info */}
                <div className="mt-2">
                  <p className="text-xs text-gray-600 truncate">
                    {data.images[index]?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(data.images[index]?.size / 1024 / 1024).toFixed(2)} MB
                  </p>
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