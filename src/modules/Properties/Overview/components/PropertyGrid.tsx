import PropertyCard from './PropertyCard';
import type { Property } from '@modules/Properties/types';

interface PropertyGridProps {
  properties: Property[];
  isLoading?: boolean;
}

const PropertyGrid = ({ properties, isLoading }: PropertyGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200" />
            <div className="p-5">
              <div className="h-6 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4" />
              <div className="flex gap-4 mb-4">
                <div className="h-4 bg-gray-200 rounded flex-1" />
                <div className="h-4 bg-gray-200 rounded flex-1" />
              </div>
              <div className="h-10 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="text-6xl mb-4">🏠</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Keine Immobilien gefunden
        </h3>
        <p className="text-gray-600">
          Versuchen Sie, Ihre Filter anzupassen, um mehr Ergebnisse zu sehen.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyGrid;