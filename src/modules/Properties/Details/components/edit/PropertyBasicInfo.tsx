// src/modules/Properties/components/edit/PropertyBasicInfo.tsx
interface PropertyBasicInfoProps {
    form: {
      title: string;
      address: string;
      city: string;
      district: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const PropertyBasicInfo = ({ form, onChange }: PropertyBasicInfoProps) => {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Grundinformationen</h2>
            <p className="text-sm text-gray-600">Titel und Standort der Immobilie</p>
          </div>
        </div>
  
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Titel *</label>
            <input
              name="title"
              value={form.title}
              onChange={onChange}
              required
              placeholder="z.B. Moderne Villa mit Panoramablick"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>
  
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Adresse *</label>
              <input
                name="address"
                value={form.address}
                onChange={onChange}
                required
                placeholder="Straße und Hausnummer"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
  
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Stadt *</label>
              <input
                name="city"
                value={form.city}
                onChange={onChange}
                required
                placeholder="z.B. Baden"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </div>
  
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Bezirk *</label>
            <input
              name="district"
              value={form.district}
              onChange={onChange}
              required
              placeholder="z.B. Baden, Mödling"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default PropertyBasicInfo;