// src/modules/Properties/components/details/PropertyStats.tsx
const PropertyStats = () => {
    const stats = [
      { label: 'Aufrufe', value: 0 },
      { label: 'Anfragen', value: 0 },
      { label: 'Favoriten', value: 0 },
    ];
  
    return (
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Statistiken
        </h3>
        <div className="space-y-3">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-gray-700">{stat.label}</span>
              <span className="text-2xl font-bold text-primary">{stat.value}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-4">
          Statistiken werden erfasst sobald die Immobilie auf der Website veröffentlicht ist.
        </p>
      </div>
    );
  };
  
  export default PropertyStats;