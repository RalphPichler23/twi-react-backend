// src/modules/Properties/pages/PropertyEdit.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import useFetchSingleProperty from '@modules/Properties/Details/api/useFetchSingleProperty';
import useUpdateProperty from '@modules/Properties/Details/api/useUpdateProperty';
import type { Property, PropertyImage } from '@modules/Properties/types';
import LoadingComponent from '@/shared/components/LoadingComponent';
import PropertyBasicInfo from '@modules/Properties/Details/components/edit/PropertyBasicInfo';
import PropertyDetailsForm from '@modules/Properties/Details/components/edit/PropertyDetailsForm';
import PropertyDescription from '@modules/Properties/Details/components/edit/PropertyDescription';
import PropertyFeatures from '@modules/Properties/Details/components/edit/PropertyFeatures';
import PropertyImageManager from '@modules/Properties/Details/components/edit/PropertyImageManager';
import PropertyTypeStatus from '@modules/Properties/Details/components/edit/PropertyTypeStatus';
import PropertyEditActions from '@modules/Properties/Details/components/edit/PropertyEditActions';

type PropertyFormState = {
  title: string;
  address: string;
  city: string;
  district: string;
  price: number;
  area: number;
  rooms: number;
  bathrooms: number;
  type: Property["type"]; 
  status: Property["status"];
  description: string;
  features: string[];
};

const PropertyEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: property, isLoading, error } = useFetchSingleProperty(id!);
  const { mutate: updateProperty, isPending: isUpdating } = useUpdateProperty();

  const [form, setForm] = useState<PropertyFormState>({
    title: "",
    address: "",
    city: "",
    district: "",
    price: 0,
    area: 0,
    rooms: 0,
    bathrooms: 0,
    type: "apartment",
    status: "available",
    description: "",
    features: [],
  });

  const [images, setImages] = useState<PropertyImage[]>([]);

  useEffect(() => {
    if (property) {
      setForm({
        title: property.title,
        address: property.address,
        city: property.city,
        district: property.district,
        price: property.price,
        area: property.area,
        rooms: property.rooms,
        bathrooms: property.bathrooms,
        type: property.type,
        status: property.status,
        description: property.description || '',
        features: property.features || [],
      });
      setImages(property.images || []);
    }
  }, [property]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: ['price', 'area', 'rooms', 'bathrooms'].includes(name) ? Number(value) : value,
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...form.features];
    updated[index] = value;
    setForm(prev => ({ ...prev, features: updated }));
  };

  const addFeature = () => {
    setForm(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index: number) => {
    setForm(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateProperty(
      { id: id!, data: form },
      { onSuccess: () => navigate(`/properties/${id}`) }
    );
  };

  if (isLoading) return <LoadingComponent />;

  if (error || !property) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏠</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Immobilie nicht gefunden</h3>
          <p className="text-gray-600 mb-6">Die Immobilie existiert nicht oder wurde gelöscht.</p>
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

  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex cursor-pointer items-center gap-2 text-gray-600 hover:text-primary transition-colors group mb-3"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Zurück
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Immobilie bearbeiten</h1>
          <p className="text-gray-600 mt-1">Ändern Sie die Details dieser Immobilie</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <PropertyBasicInfo form={form} onChange={handleChange} />
            <PropertyDetailsForm form={form} onChange={handleChange} />
            <PropertyDescription form={form} onChange={handleChange} />
            <PropertyFeatures
              features={form.features}
              onFeatureChange={handleFeatureChange}
              onAdd={addFeature}
              onRemove={removeFeature}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6 lg:sticky lg:top-6">
              {/* Replace PropertyImageUpload with PropertyImageManager */}
              <PropertyImageManager 
                propertyId={id!}
                images={images}
                onImagesChange={setImages}
              />
              <PropertyTypeStatus form={form} onChange={handleChange} />
              <PropertyEditActions
                isUpdating={isUpdating}
                onCancel={() => navigate(`/properties/${id}`)}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PropertyEdit;