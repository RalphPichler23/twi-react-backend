// src/modules/Properties/Details/components/details/PropertyImageGallery.tsx
import { useState } from 'react';
import type { PropertyImage } from '@modules/Properties/types';

interface PropertyImageGalleryProps {
  images: PropertyImage[];
  title: string;
}

const PropertyImageGallery = ({ images, title }: PropertyImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const defaultImage = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200';
  
  // Use images array or fallback to default
  const galleryImages = images.length > 0 
    ? images 
    : [{ id: 'default', image_url: defaultImage, display_order: 0, is_primary: true } as PropertyImage];
  
  const currentImage = galleryImages[selectedIndex];

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* Main Image Display */}
      <div className="space-y-4">
        {/* Large Image */}
        <div className="relative h-[500px] rounded-2xl overflow-hidden group bg-gray-100">
          <img
            src={currentImage.image_url}
            alt={`${title} - Bild ${selectedIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Primary Badge */}
          {currentImage.is_primary && (
            <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-lg text-sm font-semibold flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Hauptbild
            </div>
          )}

          {/* Image Counter */}
          {galleryImages.length > 1 && (
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-medium">
              {selectedIndex + 1} / {galleryImages.length}
            </div>
          )}

          {/* Navigation Arrows - Only show if multiple images */}
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </>
          )}

          {/* Action Buttons */}
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => setIsFullscreen(true)}
              className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-white transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
              </svg>
              Vollbild
            </button>
            <button className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-white transition-all flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              Bilder verwalten
            </button>
          </div>
        </div>

        {/* Thumbnail Grid - Only show if multiple images */}
        {galleryImages.length > 1 && (
          <div className="grid grid-cols-6 gap-3">
            {galleryImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedIndex(index)}
                className={`
                  relative h-20 rounded-lg overflow-hidden border-2 transition-all
                  ${index === selectedIndex 
                    ? 'border-primary ring-2 ring-primary ring-offset-2' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <img
                  src={image.image_url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {image.is_primary && (
                  <div className="absolute top-1 right-1 bg-primary text-white p-1 rounded">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 text-white bg-black/50 backdrop-blur-sm p-3 rounded-full hover:bg-black/70 transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          {/* Image Counter */}
          {galleryImages.length > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium z-10">
              {selectedIndex + 1} / {galleryImages.length}
            </div>
          )}

          {/* Navigation in Fullscreen */}
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/20 transition-all z-10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/20 transition-all z-10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </>
          )}

          {/* Main Image */}
          <img
            src={currentImage.image_url}
            alt={`${title} - Bild ${selectedIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

          {/* Thumbnail Strip in Fullscreen */}
          {galleryImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-sm p-3 rounded-lg max-w-[90vw] overflow-x-auto">
              {galleryImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedIndex(index)}
                  className={`
                    flex-shrink-0 w-16 h-16 rounded border-2 transition-all overflow-hidden
                    ${index === selectedIndex ? 'border-white ring-2 ring-white' : 'border-white/30 hover:border-white/60'}
                  `}
                >
                  <img
                    src={image.image_url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PropertyImageGallery;