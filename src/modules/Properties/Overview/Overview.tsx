import { useState } from 'react';
import PropertyFilters from '@modules/Properties/Overview/components/PropertyFilters';
import PropertyGrid from '@modules/Properties/Overview/components/PropertyGrid';
import Pagination from '@modules/Properties/Overview/components/Pagination';
import useFetchProperties from '@modules/Properties/Overview/api/useFetchProperties';
import type { PropertyFilters as Filters } from '@modules/Properties/types';
import LoadingComponent from '@/shared/components/LoadingComponent';
import ErrorHandle from '@/shared/components/ErrorHandle';
import Button from '@/shared/components/ui/Button';
import PropertyCreateModal from '@modules/Properties/Create/container/PropertyCreateModal';

const Properties = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;
  
  const [filters, setFilters] = useState<Filters>({});

  const [showCreateModal, setShowCreateModal] = useState(false);

  // Fetch properties with filters
  const { 
    data: propertiesData, 
    isLoading, 
    error 
  } = useFetchProperties(filters, currentPage, pageSize);

  // Extract data
  const properties = propertiesData?.data || [];
  const totalCount = propertiesData?.count || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <ErrorHandle title="Fehler beim Laden" message="Fehler beim Laden der Immobilien." />
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Immobilien Verwaltung
          </h1>
          <p className="text-gray-600">
            Verwalten und durchsuchen Sie alle Immobilien
          </p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary/80 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
          </svg>
          Neue Immobilie
        </Button>
      </div>

      {/* Filters */}
      <PropertyFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* Results Header */}
      <div className="flex items-center justify-between mb-4"> 
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{totalCount}</span> Immobilien gefunden
        </p>
      </div>

      {/* Property Grid */}
      <PropertyGrid properties={properties} isLoading={isLoading} />

      {/* Pagination */}
      {!isLoading && totalCount > 0 && (
        <Pagination
          pagination={{
            currentPage,
            totalPages,
            totalItems: totalCount,
            itemsPerPage: pageSize,
          }}
          onPageChange={handlePageChange}
        />
      )}

      <PropertyCreateModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};

export default Properties;