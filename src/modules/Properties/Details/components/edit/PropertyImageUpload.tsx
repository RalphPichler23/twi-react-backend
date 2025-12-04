// src/modules/Properties/components/edit/PropertyImageUpload.tsx
interface PropertyImageUploadProps {
    imageUrl: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const PropertyImageUpload = ({ imageUrl, onChange }: PropertyImageUploadProps) => {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Titelbild</h2>
            <p className="text-xs text-gray-600">URL zum Hauptbild</p>
          </div>
        </div>
  
        <input
          name="image_url"
          value={imageUrl}
          onChange={onChange}
          placeholder="https://..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors mb-4"
        />
  
        {imageUrl ? (
          <div className="relative group">
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Bild+nicht+gefunden';
              }}
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <p className="text-white text-sm font-medium">Vorschau</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <p className="text-sm text-gray-500">Kein Bild</p>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default PropertyImageUpload;