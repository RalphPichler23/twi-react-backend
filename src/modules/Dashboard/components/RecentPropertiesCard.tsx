// src/modules/Dashboard/components/RecentPropertiesCard.tsx
import { Link } from 'react-router-dom';
import type { Property } from '@modules/Properties/types';

interface RecentPropertiesCardProps {
  properties: Property[];
  isLoading: boolean;
}

const RecentPropertiesCard = ({ properties, isLoading }: RecentPropertiesCardProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-AT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-AT', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: Property['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-700';
      case 'sold':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: Property['status']) => {
    switch (status) {
      case 'available':
        return 'Verfügbar';
      case 'reserved':
        return 'Reserviert';
      case 'sold':
        return 'Verkauft';
      default:
        return status;
    }
  };

  const getTypeText = (type: Property['type']) => {
    switch (type) {
      case 'apartment':
        return 'Wohnung';
      case 'house':
        return 'Haus';
      case 'commercial':
        return 'Gewerbe';
      default:
        return type;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="h-7 bg-gray-200 rounded w-48 mb-6 animate-pulse" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Neueste Immobilien
        </h2>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏠</div>
          <p className="text-gray-600 mb-4">Noch keine Immobilien vorhanden</p>
          <Link
            to="/properties/create"
            className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
            </svg>
            Erste Immobilie erstellen
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Neueste Immobilien
        </h2>
        <Link
          to="/properties"
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Alle anzeigen →
        </Link>
      </div>

      <div className="space-y-3">
        {properties.map((property) => (
          <Link
            key={property.id}
            to={`/properties/${property.id}`}
            className="group block p-4 rounded-xl border-2 border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              {/* Image */}
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                {property.image_url ? (
                  <img
                    src={property.image_url}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="font-semibold text-gray-900 truncate group-hover:text-primary transition-colors">
                    {property.title}
                  </h3>
                  <span className={`flex-shrink-0 px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(property.status)}`}>
                    {getStatusText(property.status)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {getTypeText(property.type)} • {property.rooms} Zimmer • {property.area} m²
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    {formatCurrency(property.price)}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatDate(property.created_at)}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentPropertiesCard;