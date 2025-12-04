// src/modules/Properties/components/details/PropertyBasicInfoCard.tsx
import type { Property } from '@modules/Properties/types';

interface PropertyBasicInfoCardProps {
  property: Property;
}

const PropertyBasicInfoCard = ({ property }: PropertyBasicInfoCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-AT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadge = (status: Property['status']) => {
    const statusConfig = {
      available: { label: 'Verfügbar', color: 'bg-green-100 text-green-800 border-green-200' },
      sold: { label: 'Verkauft', color: 'bg-gray-100 text-gray-800 border-gray-200' },
      reserved: { label: 'Reserviert', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    };
    return statusConfig[status];
  };

  const getTypeLabel = (type: Property['type']) => {
    const typeLabels = {
      house: 'Haus',
      apartment: 'Wohnung',
      commercial: 'Gewerbe',
      land: 'Grundstück',
    };
    return typeLabels[type];
  };

  const statusBadge = getStatusBadge(property.status);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {property.title}
          </h1>
          <p className="text-lg text-gray-600 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            {property.address}, {property.city}
          </p>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${statusBadge.color}`}>
          {statusBadge.label}
        </span>
      </div>

      {/* Price */}
      <div className="bg-primary/5 rounded-lg p-4 mb-4">
        <p className="text-sm text-gray-600 mb-1">Preis</p>
        <p className="text-3xl font-bold text-primary">
          {formatPrice(property.price)}
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Fläche</p>
          <p className="text-2xl font-bold text-gray-900">{property.area} m²</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Zimmer</p>
          <p className="text-2xl font-bold text-gray-900">{property.rooms}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Badezimmer</p>
          <p className="text-2xl font-bold text-gray-900">{property.bathrooms}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Typ</p>
          <p className="text-lg font-bold text-gray-900">{getTypeLabel(property.type)}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyBasicInfoCard;