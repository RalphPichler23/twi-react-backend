// src/modules/Dashboard/components/PropertyOfMonthCard.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Property } from '@modules/Properties/types';
import PropertySelectionModal from './PropertySelectionModal';
import useFetchPropertyOfMonth from '../api/useFetchPropertyOfMonth';
import useSetPropertyOfMonth from '../api/useSetPropertyOfMonth';
import useRemovePropertyOfMonth from '../api/useRemovePropertyOfMonth';

interface PropertyOfMonthCardProps {
  allProperties: Property[];
  allPropertiesLoading: boolean;
}

const PropertyOfMonthCard = ({ allProperties, allPropertiesLoading }: PropertyOfMonthCardProps) => {
  const [showModal, setShowModal] = useState(false);

  const { data: propertyOfMonth, isLoading } = useFetchPropertyOfMonth();
  const { mutate: setProperty, isPending: isSetting } = useSetPropertyOfMonth();
  const { mutate: removeProperty, isPending: isRemoving } = useRemovePropertyOfMonth();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-AT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getTypeText = (type: Property['type']) => {
    switch (type) {
      case 'apartment': return 'Wohnung';
      case 'house': return 'Haus';
      case 'commercial': return 'Gewerbe';
      default: return type;
    }
  };

  const handleRemove = () => {
    if (propertyOfMonth && confirm('Möchten Sie die Immobilie des Monats wirklich entfernen?')) {
      removeProperty(propertyOfMonth.id);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="h-7 bg-gray-200 rounded w-48 mb-6 animate-pulse" />
        <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Immobilie des Monats
            </h2>
          </div>
          {propertyOfMonth && (
            <button
              onClick={handleRemove}
              disabled={isRemoving}
              className="text-sm text-gray-500 hover:text-red-600 transition-colors disabled:opacity-50"
            >
              Entfernen
            </button>
          )}
        </div>

        {!propertyOfMonth ? (
          /* Empty State */
          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Noch keine Immobilie gewählt
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Heben Sie eine besondere Immobilie hervor, die Sie diesen Monat besonders bewerben möchten
            </p>
            <button
              onClick={() => setShowModal(true)}
              disabled={allPropertiesLoading}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all font-medium disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              Immobilie auswählen
            </button>
          </div>
        ) : (
          /* Selected Property Display */
          <div className="space-y-4">
            {/* Featured Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 py-1.5 rounded-lg text-sm font-semibold">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Ausgewählte Immobilie
            </div>

            {/* Property Image */}
            <Link to={`/properties/${propertyOfMonth.id}`} className="block group">
              <div className="relative h-64 rounded-xl overflow-hidden bg-gray-100">
                {propertyOfMonth.image_url ? (
                  <img
                    src={propertyOfMonth.image_url}
                    alt={propertyOfMonth.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                  </div>
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 text-white font-medium">
                    Details ansehen
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Property Details */}
            <div>
              <Link to={`/properties/${propertyOfMonth.id}`} className="group">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-2">
                  {propertyOfMonth.title}
                </h3>
              </Link>
              <p className="text-gray-600 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {propertyOfMonth.city}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                  {getTypeText(propertyOfMonth.type)}
                </span>
                <span>•</span>
                <span>{propertyOfMonth.rooms} Zimmer</span>
                <span>•</span>
                <span>{propertyOfMonth.area} m²</span>
              </div>

              <div className="text-2xl font-bold text-primary mb-4">
                {formatCurrency(propertyOfMonth.price)}
              </div>

              <div className="flex gap-3">
                <Link
                  to={`/properties/${propertyOfMonth.id}`}
                  className="flex-1 py-3 px-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors text-center"
                >
                  Details ansehen
                </Link>
                <button
                  onClick={() => setShowModal(true)}
                  disabled={isSetting}
                  className="py-3 px-4 border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
                >
                  Ändern
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Selection Modal */}
      <PropertySelectionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        properties={allProperties}
        onSelect={setProperty}
        isLoading={isSetting}
      />
    </>
  );
};

export default PropertyOfMonthCard;