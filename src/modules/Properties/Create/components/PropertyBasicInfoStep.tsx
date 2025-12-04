// src/modules/Properties/Create/components/PropertyBasicInfoStep.tsx
import Input from '@/shared/components/ui/Input';
import type { PropertyCreateForm } from '../types';

interface PropertyBasicInfoStepProps {
  data: PropertyCreateForm;
  onChange: (data: Partial<PropertyCreateForm>) => void;
  errors: Record<string, string>;
}

const PropertyBasicInfoStep = ({ data, onChange, errors }: PropertyBasicInfoStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Grundinformationen</h3>
        <p className="text-sm text-gray-600">Titel und Standort der Immobilie</p>
      </div>

      <Input
        label="Titel"
        value={data.title}
        onChange={(e) => onChange({ title: e.target.value })}
        placeholder="z.B. Moderne Villa mit Panoramablick"
        required
        fullWidth
        error={errors.title}
      />

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Straße & Hausnummer"
          value={data.address}
          onChange={(e) => onChange({ address: e.target.value })}
          placeholder="z.B. Beethovenstraße 12"
          required
          fullWidth
          error={errors.address}
          leftIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            </svg>
          }
        />

        <Input
          label="Stadt"
          value={data.city}
          onChange={(e) => onChange({ city: e.target.value })}
          placeholder="z.B. Baden"
          required
          fullWidth
          error={errors.city}
        />
      </div>

      <Input
        label="Postleitzahl"
        value={data.district}
        onChange={(e) => onChange({ district: e.target.value })}
        placeholder="z.B. 2500"
        required
        fullWidth
        maxLength={4}
        error={errors.district}
        helperText={!errors.district ? "Österreichische Postleitzahl (4 Ziffern)" : undefined}
        leftIcon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        }
      />
    </div>
  );
};

export default PropertyBasicInfoStep;