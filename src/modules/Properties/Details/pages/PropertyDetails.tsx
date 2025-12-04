// src/modules/Properties/pages/PropertyDetails.tsx
import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import useFetchSingleProperty from '@modules/Properties/Details/api/useFetchSingleProperty';
import PropertyImageGallery from '@/modules/Properties/Details/components/details/PropertyImageGallery';
import LoadingComponent from '@/shared/components/LoadingComponent';

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const { data: property, isLoading, error } = useFetchSingleProperty(id!);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-AT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('de-AT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      available: { label: 'Verfügbar', color: 'bg-green-100 text-green-800 border-green-200' },
      sold: { label: 'Verkauft', color: 'bg-gray-100 text-gray-800 border-gray-200' },
      reserved: { label: 'Reserviert', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const getTypeLabel = (type: string) => {
    const typeLabels = {
      house: 'Haus',
      apartment: 'Wohnung',
      commercial: 'Gewerbe',
      land: 'Grundstück',
    };
    return typeLabels[type as keyof typeof typeLabels];
  };

  const handleDelete = async () => {
    // TODO: Implement delete with Supabase
    console.log('Delete property:', id);
    setShowDeleteModal(false);
    navigate('/properties');
  };

  const handleStatusChange = async (newStatus: string) => {
    // TODO: Implement status update
    console.log('Update status to:', newStatus);
  };

  // Loading State
  if (isLoading) {
    return (
      <LoadingComponent />
    );
  }

  // Error State
  if (error || !property) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏠</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Immobilie nicht gefunden
          </h3>
          <p className="text-gray-600 mb-6">
            Die gesuchte Immobilie existiert nicht oder wurde entfernt.
          </p>
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary/80 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
          >
            Zurück zur Übersicht
          </Link>
        </div>
      </div>
    );
  }

  const statusBadge = getStatusBadge(property.status);

  return (
    <div>
      {/* Header with Back Button & Actions */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Zurück zur Übersicht
        </button>

        {/* Admin Actions */}
        <div className="flex items-center gap-3">
          <Link
            to={`/properties/${id}/edit`}
            className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary/80 text-white font-semibold py-2.5 px-5 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            Bearbeiten
          </Link>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center gap-2 border-2 border-red-200 text-red-600 font-semibold py-2.5 px-5 rounded-lg hover:bg-red-50 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            Löschen
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <PropertyImageGallery 
            imageUrl={property.image_url} 
            title={property.title} 
          />

          {/* Basic Info Card */}
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

          {/* Description */}
          {property.description && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Beschreibung
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>
          )}

          {/* Features */}
          {property.features && property.features.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Ausstattung
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
                  >
                    <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Admin Sidebar */}
        <div className="space-y-6">
          {/* Status Management */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Status ändern
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => handleStatusChange('available')}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                  property.status === 'available'
                    ? 'border-green-200 bg-green-50 text-green-800 font-semibold'
                    : 'border-gray-200 hover:border-green-200 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${property.status === 'available' ? 'bg-green-500' : 'bg-gray-300'}`} />
                  Verfügbar
                </div>
              </button>
              <button
                onClick={() => handleStatusChange('reserved')}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                  property.status === 'reserved'
                    ? 'border-yellow-200 bg-yellow-50 text-yellow-800 font-semibold'
                    : 'border-gray-200 hover:border-yellow-200 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${property.status === 'reserved' ? 'bg-yellow-500' : 'bg-gray-300'}`} />
                  Reserviert
                </div>
              </button>
              <button
                onClick={() => handleStatusChange('sold')}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                  property.status === 'sold'
                    ? 'border-gray-300 bg-gray-50 text-gray-800 font-semibold'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${property.status === 'sold' ? 'bg-gray-500' : 'bg-gray-300'}`} />
                  Verkauft
                </div>
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Aktionen
            </h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
                <span className="font-medium text-gray-700">Duplizieren</span>
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                </svg>
                <span className="font-medium text-gray-700">Link teilen</span>
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <span className="font-medium text-gray-700">Als PDF exportieren</span>
              </button>
            </div>
          </div>

          {/* Metadata */}
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

          {/* Stats Placeholder */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Statistiken
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Aufrufe</span>
                <span className="text-2xl font-bold text-primary">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Anfragen</span>
                <span className="text-2xl font-bold text-primary">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Favoriten</span>
                <span className="text-2xl font-bold text-primary">0</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-4">
              Statistiken werden erfasst sobald die Immobilie auf der Website veröffentlicht ist.
            </p>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Immobilie löschen?
                </h3>
                <p className="text-gray-600">
                  Diese Aktion kann nicht rückgängig gemacht werden.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Löschen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;