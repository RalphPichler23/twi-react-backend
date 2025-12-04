// src/modules/Properties/components/details/PropertyFeaturesCard.tsx
interface PropertyFeaturesCardProps {
    features: string[] | null;
  }
  
  const PropertyFeaturesCard = ({ features }: PropertyFeaturesCardProps) => {
    if (!features || features.length === 0) return null;
  
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Ausstattung
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
            >
              <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default PropertyFeaturesCard;