// src/modules/Properties/pages/PropertyDetails.tsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetchSingleProperty from '@modules/Properties/Details/api/useFetchSingleProperty';
import LoadingComponent from '@/shared/components/LoadingComponent';
import PropertyDetailsHeader from '@modules/Properties/Details/components/details/PropertyDetailsHeader';
import PropertyImageGallery from '@modules/Properties/Details/components/details/PropertyImageGallery';
import PropertyBasicInfoCard from '@modules/Properties/Details/components/details/PropertyBasicInfoCard';
import PropertyDescriptionCard from '@modules/Properties/Details/components/details/PropertyDescriptionCard';
import PropertyFeaturesCard from '@modules/Properties/Details/components/details/PropertyFeaturesCard';
import PropertyStatusManager from '@modules/Properties/Details/components/details/PropertyStatusManager';
import PropertyQuickActions from '@modules/Properties/Details/components/details/PropertyQuickActions';
import PropertyMetadata from '@modules/Properties/Details/components/details/PropertyMetadata';
import PropertyStats from '@modules/Properties/Details/components/details/PropertyStats';
import DeleteConfirmationModal from '@shared/components/DeleteConfirmationModal';
import PropertyCreateModal from '@modules/Properties/Create/container/PropertyCreateModal';
import ErrorHandle from '@/shared/components/ErrorHandle';
import useDeleteProperty from '../api/useDeleteProperty';

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const { data: property, isLoading, error } = useFetchSingleProperty(id!);

  const { mutate: deleteProperty, isPending: isDeleting } = useDeleteProperty();

  const handleDelete = async () => {
    deleteProperty({ id: id! });
    setShowDeleteModal(false);
    navigate('/properties');
  };

  if (isLoading) return <LoadingComponent />;
  if (error || !property) return <ErrorHandle />;

  return (
    <div>
      <PropertyDetailsHeader 
        id={id!} 
        onDelete={() => setShowDeleteModal(true)} 
        onCreateNew={() => setShowCreateModal(true)}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* NEW: Pass images array instead of single imageUrl */}
          <PropertyImageGallery 
            images={property.images || []} 
            title={property.title} 
          />
          <PropertyBasicInfoCard property={property} />
          <PropertyDescriptionCard description={property.description} />
          <PropertyFeaturesCard features={property.features} />
        </div>

        {/* Right Column - Admin Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-6 lg:top-6">
            <PropertyStatusManager 
              currentStatus={property.status} 
            />
            <PropertyQuickActions propertyId={id!} />
            <PropertyMetadata property={property} />
            <PropertyStats />
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />

      <PropertyCreateModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};

export default PropertyDetails;