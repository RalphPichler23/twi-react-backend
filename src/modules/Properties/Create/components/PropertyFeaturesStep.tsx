// src/modules/Properties/Create/components/PropertyFeaturesStep.tsx
import { useState } from 'react';
import Input from '@/shared/components/ui/Input';
import Button from '@/shared/components/ui/Button';
import type { PropertyCreateForm } from '../types';

interface PropertyFeaturesStepProps {
  data: PropertyCreateForm;
  onChange: (data: Partial<PropertyCreateForm>) => void;
  errors: Record<string, string>;
}

const PropertyFeaturesStep = ({ data, onChange, errors }: PropertyFeaturesStepProps) => {
  const [newFeature, setNewFeature] = useState('');

  const addFeature = () => {
    if (newFeature.trim()) {
      onChange({ features: [...data.features, newFeature.trim()] });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    onChange({ features: data.features.filter((_, i) => i !== index) });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFeature();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Ausstattung & Beschreibung</h3>
        <p className="text-sm text-gray-600">Features und Details der Immobilie</p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Beschreibung
          <span className="text-red-500 ml-1">*</span>
        </label>
        <textarea
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={6}
          placeholder="Beschreiben Sie die Immobilie im Detail... (mind. 20 Zeichen)"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none ${
            errors.description ? 'border-red-300' : 'border-gray-200'
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {errors.description}
          </p>
        )}
      </div>

      {/* Features */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Ausstattung
        </label>
        
        <div className="flex gap-2 mb-4">
          <Input
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="z.B. Garten, Garage, Balkon..."
            fullWidth
          />
          <Button
            type="button"
            variant="secondary"
            onClick={addFeature}
            disabled={!newFeature.trim()}
          >
            Hinzufügen
          </Button>
        </div>

        {data.features.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
            </svg>
            <p className="text-gray-600 text-sm">Noch keine Ausstattungsmerkmale</p>
            <p className="text-gray-500 text-xs mt-1">Fügen Sie Features hinzu</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {data.features.map((feature, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-2 rounded-lg group hover:bg-primary/20 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span className="text-sm font-medium">{feature}</span>
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="ml-1 text-primary/60 hover:text-red-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {errors.features && data.features.length === 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex gap-2">
              <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p className="text-sm text-red-800">{errors.features}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyFeaturesStep;