// src/modules/Properties/components/details/PropertyMetadata.tsx
import type { Property } from '@modules/Properties/types';

interface PropertyMetadataProps {
  property: Property;
}

const PropertyMetadata = ({ property }: PropertyMetadataProps) => {
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('de-AT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Metadaten
      </h3>
      <div className="space-y-3 text-sm">
        <div>
          <p className="text-gray-600 mb-1">ID</p>
          <p className="text-gray-900 font-mono text-xs bg-gray-50 p-2 rounded break-all">
            {property.id}
          </p>
        </div>
        <div>
          <p className="text-gray-600 mb-1">Erstellt am</p>
          <p className="text-gray-900 font-medium">
            {formatDate(property.created_at)}
          </p>
        </div>
        <div>
          <p className="text-gray-600 mb-1">Bezirk</p>
          <p className="text-gray-900 font-medium capitalize">
            {property.district}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyMetadata;