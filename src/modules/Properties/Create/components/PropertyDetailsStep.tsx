// src/modules/Properties/Create/components/PropertyDetailsStep.tsx
import Input from '@/shared/components/ui/Input';
import Select from '@/shared/components/ui/Select';
import type { PropertyCreateForm } from '../types';

interface PropertyDetailsStepProps {
  data: PropertyCreateForm;
  onChange: (data: Partial<PropertyCreateForm>) => void;
  errors: Record<string, string>;
}

const PropertyDetailsStep = ({ data, onChange, errors }: PropertyDetailsStepProps) => {
  const requiresRooms = data.type === 'house' || data.type === 'apartment';

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Objektdetails</h3>
        <p className="text-sm text-gray-600">Preis und technische Daten</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Select
          label="Immobilientyp"
          value={data.type}
          onChange={(e) => onChange({ type: e.target.value as PropertyCreateForm['type'] })}
          options={[
            { value: 'house', label: '🏠 Haus' },
            { value: 'apartment', label: '🏢 Wohnung' },
            { value: 'commercial', label: '🏪 Gewerbe' },
            { value: 'land', label: '🌳 Grundstück' },
          ]}
          required
          fullWidth
          error={errors.type}
        />

        <Select
          label="Status"
          value={data.status}
          onChange={(e) => onChange({ status: e.target.value as PropertyCreateForm['status'] })}
          options={[
            { value: 'available', label: '✅ Verfügbar' },
            { value: 'reserved', label: '⏳ Reserviert' },
            { value: 'sold', label: '✓ Verkauft' },
          ]}
          required
          fullWidth
          error={errors.status}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Preis"
          type="number"
          value={data.price || ''}
          onChange={(e) => onChange({ price: Number(e.target.value) })}
          placeholder="500000"
          required
          fullWidth
          error={errors.price}
          leftIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          }
        />

        <Input
          label="Fläche (m²)"
          type="number"
          value={data.area || ''}
          onChange={(e) => onChange({ area: Number(e.target.value) })}
          placeholder="120"
          required
          fullWidth
          error={errors.area}
          leftIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
            </svg>
          }
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Zimmer"
          type="number"
          value={data.rooms || ''}
          onChange={(e) => onChange({ rooms: Number(e.target.value) })}
          placeholder="3"
          required={requiresRooms}
          fullWidth
          error={errors.rooms}
          helperText={!errors.rooms && !requiresRooms ? 'Optional für Gewerbe und Grundstücke' : undefined}
          leftIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
          }
        />

        <Input
          label="Badezimmer"
          type="number"
          value={data.bathrooms || ''}
          onChange={(e) => onChange({ bathrooms: Number(e.target.value) })}
          placeholder="2"
          required={requiresRooms}
          fullWidth
          error={errors.bathrooms}
          helperText={!errors.bathrooms && !requiresRooms ? 'Optional für Gewerbe und Grundstücke' : undefined}
          leftIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/>
            </svg>
          }
        />
      </div>

      {requiresRooms && (data.rooms < 1 || data.bathrooms < 1) && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex gap-2">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
            <p className="text-sm text-amber-800">
              Für Häuser und Wohnungen müssen mindestens 1 Zimmer und 1 Badezimmer angegeben werden.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailsStep;