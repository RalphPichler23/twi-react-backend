// src/modules/Properties/components/details/PropertyDescriptionCard.tsx
interface PropertyDescriptionCardProps {
    description: string | null;
  }
  
  const PropertyDescriptionCard = ({ description }: PropertyDescriptionCardProps) => {
    if (!description) return null;
  
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Beschreibung
        </h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </div>
    );
  };
  
  export default PropertyDescriptionCard;