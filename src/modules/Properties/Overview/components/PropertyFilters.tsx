// src/modules/Properties/components/PropertyFilters.tsx
import type { PropertyFilters as Filters } from '@modules/Properties/types';

interface PropertyFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onReset: () => void;
}

const PropertyFilters = ({ filters, onFilterChange, onReset }: PropertyFiltersProps) => {
  const handleChange = (key: keyof Filters, value: string) => {
    // ✅ Create new filters object properly
    if (['minPrice', 'maxPrice', 'minArea', 'maxArea', 'minRooms'].includes(key)) {
      onFilterChange({
        ...filters,
        [key]: value ? Number(value) : undefined,
      });
    } else {
      onFilterChange({
        ...filters,
        [key]: value || undefined,
      });
    }
  };

  const selectClassName = "w-full pl-4 pr-10 py-2.5 border focus:outline-none border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none bg-white cursor-pointer";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
          </svg>
          Filter
        </h2>
        <button
          onClick={onReset}
          className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
        >
          Zurücksetzen
        </button>
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Suche
          </label>
          <div className="relative">
            <input
              type="text"
              value={filters.search || ''}
              onChange={(e) => handleChange('search', e.target.value)}
              placeholder="Adresse, Stadt, Bezirk..."
              className="w-full pl-10 pr-4 py-2.5 border focus:outline-none border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
            <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Typ
          </label>
          <div className="relative">
            <select
              value={filters.type || ''}
              onChange={(e) => handleChange('type', e.target.value)}
              className={selectClassName}
            >
              <option value="">Alle Typen</option>
              <option value="house">Haus</option>
              <option value="apartment">Wohnung</option>
              <option value="commercial">Gewerbe</option>
              <option value="land">Grundstück</option>
            </select>
            <svg className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Status
          </label>
          <div className="relative">
            <select
              value={filters.status || ''}
              onChange={(e) => handleChange('status', e.target.value)}
              className={selectClassName}
            >
              <option value="">Alle Status</option>
              <option value="available">Verfügbar</option>
              <option value="reserved">Reserviert</option>
              <option value="sold">Verkauft</option>
            </select>
            <svg className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </div>

        {/* District */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Bezirk
          </label>
          <div className="relative">
            <select
              value={filters.district || ''}
              onChange={(e) => handleChange('district', e.target.value)}
              className={selectClassName}
            >
              <option value="">Alle Bezirke</option>
              <option value="baden">Baden</option>
              <option value="mödling">Mödling</option>
              <option value="wr-neustadt">Wr. Neustadt</option>
            </select>
            <svg className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </div>

        {/* Min Price */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Preis von
          </label>
          <input
            type="number"
            value={filters.minPrice ?? ''}
            onChange={(e) => handleChange('minPrice', e.target.value)}
            placeholder="Min. €"
            className="w-full focus:outline-none px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Preis bis
          </label>
          <input
            type="number"
            value={filters.maxPrice ?? ''}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
            placeholder="Max. €"
            className="w-full px-4 focus:outline-none py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>

        {/* Min Area */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Fläche von (m²)
          </label>
          <input
            type="number"
            value={filters.minArea ?? ''}
            onChange={(e) => handleChange('minArea', e.target.value)}
            placeholder="Min. m²"
            className="w-full px-4 focus:outline-none py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>

        {/* Max Area */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Fläche bis (m²)
          </label>
          <input
            type="number"
            value={filters.maxArea ?? ''}
            onChange={(e) => handleChange('maxArea', e.target.value)}
            placeholder="Max. m²"
            className="w-full px-4 py-2.5 focus:outline-none border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>

        {/* Min Rooms */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Min. Zimmer
          </label>
          <div className="relative">
            <select
              value={filters.minRooms ?? ''}
              onChange={(e) => handleChange('minRooms', e.target.value)}
              className={selectClassName}
            >
              <option value="">Beliebig</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
            <svg className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Sortieren nach
          </label>
          <div className="relative">
            <select
              value={filters.sortBy || 'newest'}
              onChange={(e) => handleChange('sortBy', e.target.value)}
              className={selectClassName}
            >
              <option value="newest">Neueste zuerst</option>
              <option value="oldest">Älteste zuerst</option>
              <option value="price-asc">Preis aufsteigend</option>
              <option value="price-desc">Preis absteigend</option>
              <option value="area-asc">Fläche aufsteigend</option>
              <option value="area-desc">Fläche absteigend</option>
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

export default PropertyFilters;