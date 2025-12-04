// src/modules/Properties/Create/container/PropertyCreateModal.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyBasicInfoStep from '../components/PropertyBasicInfoStep';
import PropertyDetailsStep from '../components/PropertyDetailsStep';
import PropertyImagesStep from '../components/PropertyImagesStep';
import PropertyFeaturesStep from '../components/PropertyFeaturesStep';
import useCreateProperty from '../api/useCreateProperty';
import Button from '@/shared/components/ui/Button';
import { propertyCreateSchema, stepValidations } from '../validation';
import type { PropertyCreateForm, PropertyCreateStep } from '../types';
import { z } from 'zod';

interface PropertyCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// DEV Mode Test Data
const getInitialFormData = (): PropertyCreateForm => {
  const isDev = import.meta.env.VITE_DEV_MODE === 'true';

  if (isDev) {
    return {
      title: 'Luxuriöse Penthouse-Wohnung mit Panoramablick',
      address: 'Hauptstraße 42',
      city: 'Baden',
      district: '2500',
      price: 850000,
      area: 180,
      rooms: 4,
      bathrooms: 3,
      type: 'apartment',
      status: 'available',
      description: 'Exklusive Penthouse-Wohnung in bester Lage mit atemberaubendem Blick über die Stadt. Die hochwertig ausgestattete Immobilie überzeugt durch großzügige Raumaufteilung, bodentiefe Fenster und eine luxuriöse Ausstattung.\n\nDie Wohnung befindet sich im obersten Stockwerk eines modernen Wohnhauses und bietet einen direkten Aufzug zur Wohnung.',
      features: [
        'Dachterrasse 80m²',
        'Fußbodenheizung',
        'Smart Home System',
        'Klimaanlage',
        'Einbauküche Miele',
        'Parkettboden Eiche',
        '2 TG-Stellplätze',
        'Aufzug direkt zur Wohnung',
      ],
      images: [],
    };
  }

  return {
    title: '',
    address: '',
    city: '',
    district: '',
    price: 0,
    area: 0,
    rooms: 0,
    bathrooms: 0,
    type: 'apartment',
    status: 'available',
    description: '',
    features: [],
    images: [],
  };
};

const PropertyCreateModal = ({ isOpen, onClose }: PropertyCreateModalProps) => {
  const navigate = useNavigate();
  const { mutate: createProperty, isPending } = useCreateProperty();

  const [currentStep, setCurrentStep] = useState<PropertyCreateStep>('basic');
  const [formData, setFormData] = useState<PropertyCreateForm>(getInitialFormData());
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps: { id: PropertyCreateStep; label: string; description: string }[] = [
    { id: 'basic', label: 'Grunddaten', description: 'Titel & Standort' },
    { id: 'details', label: 'Details', description: 'Preis & Kennzahlen' },
    { id: 'images', label: 'Bilder', description: 'Fotos hochladen' },
    { id: 'features', label: 'Ausstattung', description: 'Features & Beschreibung' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const validateStep = (step: PropertyCreateStep): boolean => {
    try {
      const schema = stepValidations[step];
      schema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep) && !isLastStep) {
      setCurrentStep(steps[currentStepIndex + 1].id);
      setErrors({});
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStep(steps[currentStepIndex - 1].id);
      setErrors({});
    }
  };

  const handleSubmit = () => {
    try {
      // Validate entire form
      propertyCreateSchema.parse(formData);
      
      createProperty(formData, {
        onSuccess: (data) => {
          onClose();
          setFormData(getInitialFormData());
          setCurrentStep('basic');
          setErrors({});
          navigate(`/properties/${data.id}`);
        },
        onError: (error) => {
          console.error('Create error:', error);
          setErrors({ submit: 'Fehler beim Erstellen der Immobilie' });
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
        
        // Jump to first step with error
        const firstErrorStep = error.issues[0]?.path[0]?.toString();
        if (firstErrorStep) {
          if (['title', 'address', 'city', 'district'].includes(firstErrorStep)) {
            setCurrentStep('basic');
          } else if (['price', 'area', 'rooms', 'bathrooms', 'type', 'status'].includes(firstErrorStep)) {
            setCurrentStep('details');
          } else if (firstErrorStep === 'images') {
            setCurrentStep('images');
          } else if (['description', 'features'].includes(firstErrorStep)) {
            setCurrentStep('features');
          }
        }
      }
    }
  };

  const updateFormData = (data: Partial<PropertyCreateForm>) => {
    setFormData(prev => ({ ...prev, ...data }));
    // Clear errors for updated fields
    const updatedKeys = Object.keys(data);
    setErrors(prev => {
      const newErrors = { ...prev };
      updatedKeys.forEach(key => delete newErrors[key]);
      return newErrors;
    });
  };

  const handleClose = () => {
    setFormData(getInitialFormData());
    setCurrentStep('basic');
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">Neue Immobilie</h2>
              {import.meta.env.VITE_DEV_MODE === 'true' && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">
                  DEV MODE
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Schritt {currentStepIndex + 1} von {steps.length}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center gap-3">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all
                    ${index <= currentStepIndex 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-gray-400'
                    }
                  `}>
                    {index < currentStepIndex ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="hidden md:block">
                    <p className={`text-sm font-semibold ${index <= currentStepIndex ? 'text-gray-900' : 'text-gray-400'}`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${index < currentStepIndex ? 'bg-primary' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentStep === 'basic' && (
            <PropertyBasicInfoStep 
              data={formData} 
              onChange={updateFormData}
              errors={errors}
            />
          )}
          {currentStep === 'details' && (
            <PropertyDetailsStep 
              data={formData} 
              onChange={updateFormData}
              errors={errors}
            />
          )}
          {currentStep === 'images' && (
            <PropertyImagesStep 
              data={formData} 
              onChange={updateFormData}
              errors={errors}
            />
          )}
          {currentStep === 'features' && (
            <PropertyFeaturesStep 
              data={formData} 
              onChange={updateFormData}
              errors={errors}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 p-6 border-t border-gray-100 bg-gray-50">
          <Button
            variant="ghost"
            onClick={handleClose}
          >
            Abbrechen
          </Button>

          <div className="flex flex-col items-end gap-2">
            {errors.submit && (
              <p className="text-sm text-red-600">{errors.submit}</p>
            )}
            <div className="flex gap-3">
              {!isFirstStep && (
                <Button
                  variant="secondary"
                  onClick={handlePrev}
                  leftIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                  }
                >
                  Zurück
                </Button>
              )}

              {isLastStep ? (
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  isLoading={isPending}
                  leftIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  }
                >
                  Immobilie erstellen
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleNext}
                  rightIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  }
                >
                  Weiter
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCreateModal;