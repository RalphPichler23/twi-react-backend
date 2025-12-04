// src/modules/Properties/components/PropertyFeatures.tsx
interface PropertyFeaturesProps {
    features: string[] | null;
  }
  
  const PropertyFeatures = ({ features }: PropertyFeaturesProps) => {
    if (!features || features.length === 0) {
      return null;
    }
  
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Ausstattung & Features
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-primary/5 transition-colors"
            >
              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
              <span className="text-gray-700 font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default PropertyFeatures;