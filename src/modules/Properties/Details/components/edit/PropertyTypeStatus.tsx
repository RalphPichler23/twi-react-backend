// src/modules/Properties/components/edit/PropertyTypeStatus.tsx
import type { Property } from '@modules/Properties/types';

interface PropertyTypeStatusProps {
  form: {
    type: Property['type'];
    status: Property['status'];
  };
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PropertyTypeStatus = ({ form, onChange }: PropertyTypeStatusProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Typ & Status</h2>
          <p className="text-xs text-gray-600">Kategorisierung</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Immobilientyp</label>
          <div className="relative">
            <select
              name="type"
              value={form.type}
              onChange={onChange}
              className="w-full pl-4 pr-10 py-3 focus:outline-none border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none bg-white cursor-pointer"
            >
              <option value="house">🏠 Haus</option>
              <option value="apartment">🏢 Wohnung</option>
              <option value="commercial">🏪 Gewerbe</option>
              <option value="land">🌳 Grundstück</option>
            </select>
            <svg className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Verkaufsstatus</label>
          <div className="relative">
            <select
              name="status"
              value={form.status}
              onChange={onChange}
              className="w-full pl-4 pr-10 py-3 border focus:outline-none border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none bg-white cursor-pointer"
            >
              <option value="available">✅ Verfügbar</option>
              <option value="reserved">⏳ Reserviert</option>
              <option value="sold">✓ Verkauft</option>
            </select>
            <svg className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyTypeStatus;