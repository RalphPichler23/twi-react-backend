// src/modules/Properties/components/PropertyImageGallery.tsx
import { useState } from 'react';

interface PropertyImageGalleryProps {
  imageUrl: string | null;
  title: string;
}

const PropertyImageGallery = ({ imageUrl, title }: PropertyImageGalleryProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const defaultImage = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200';
  const mainImage = imageUrl || defaultImage;

  return (
    <>
      {/* Main Image */}
      <div className="relative h-96 rounded-2xl overflow-hidden group">
        <img
          src={mainImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay with Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 right-4 flex gap-2">
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
              Bild ändern
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 text-white bg-black/50 backdrop-blur-sm p-3 rounded-full hover:bg-black/70 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <img
            src={mainImage}
            alt={title}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </>
  );
};

export default PropertyImageGallery;