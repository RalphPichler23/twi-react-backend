// src/modules/Properties/components/edit/PropertyFeatures.tsx
interface PropertyFeaturesProps {
    features: string[];
    onFeatureChange: (index: number, value: string) => void;
    onAdd: () => void;
    onRemove: (index: number) => void;
  }
  
  const PropertyFeatures = ({ features, onFeatureChange, onAdd, onRemove }: PropertyFeaturesProps) => {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Ausstattung</h2>
              <p className="text-sm text-gray-600">Features und Besonderheiten</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
            </svg>
            Hinzufügen
          </button>
        </div>
  
        {features.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
            </svg>
            <p className="text-gray-600">Keine Features hinzugefügt</p>
            <p className="text-sm text-gray-500 mt-1">Klicken Sie auf "Hinzufügen" um Features zu ergänzen</p>
          </div>
        ) : (
          <div className="space-y-3">
            {features.map((feat, i) => (
              <div key={i} className="flex gap-3 items-center">
                <div className="flex-1 relative">
                  <input
                    value={feat}
                    onChange={e => onFeatureChange(i, e.target.value)}
                    placeholder={`Feature ${i + 1}`}
                    className="w-full pl-10 pr-4 py-3 focus:outline-none border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                  <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(i)}
                  className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default PropertyFeatures;