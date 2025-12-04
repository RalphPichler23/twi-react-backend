// src/modules/Properties/components/edit/PropertyDescription.tsx
interface PropertyDescriptionProps {
    form: { description: string };
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  }
  
  const PropertyDescription = ({ form, onChange }: PropertyDescriptionProps) => {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Beschreibung</h2>
            <p className="text-sm text-gray-600">Detaillierte Objektbeschreibung</p>
          </div>
        </div>
  
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          rows={8}
          placeholder="Beschreiben Sie die Immobilie im Detail..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
        />
      </div>
    );
  };
  
  export default PropertyDescription;