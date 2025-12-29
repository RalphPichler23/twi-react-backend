// src/modules/Testimonials/Testimonials.tsx
import { useState, useMemo } from 'react';
import { 
  TestimonialCard, 
  TestimonialSearchBar, 
  TestimonialEmptyState, 
  TestimonialModal 
} from '@testimonials/components';
import { 
  useFetchTestimonials,
  useCreateTestimonial,
  useUpdateTestimonial,
  useDeleteTestimonial, 
  useToggleTestimonialStatus 
} from '@testimonials/api';
import type { Testimonial, TestimonialFormData } from '@testimonials/types';
import LoadingComponent from '@/shared/components/LoadingComponent';
import ErrorHandle from '@/shared/components/ErrorHandle';
import DeleteConfirmationModal from '@/shared/components/DeleteConfirmationModal';

const Testimonials = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [deletingTestimonialId, setDeletingTestimonialId] = useState<string | null>(null);

  // Queries & Mutations
  const { data: testimonials = [], isLoading, error } = useFetchTestimonials();
  const createTestimonial = useCreateTestimonial();
  const updateTestimonial = useUpdateTestimonial(editingTestimonial?.id || '');
  const deleteTestimonial = useDeleteTestimonial();
  const toggleStatus = useToggleTestimonialStatus();

  // Filtered testimonials
  const filteredTestimonials = useMemo<Testimonial[]>(() => 
    (testimonials as Testimonial[]).filter((testimonial: Testimonial) =>
      testimonial.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.client_company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.testimonial_text.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [testimonials, searchQuery]
  );

  // Get testimonial name for delete modal
  const deletingTestimonialName = useMemo(() => {
    if (!deletingTestimonialId) return '';
    const testimonial = (testimonials as Testimonial[]).find(t => t.id === deletingTestimonialId);
    return testimonial?.client_name || '';
  }, [deletingTestimonialId, testimonials]);

  // Handlers
  const handleCreate = async (formData: TestimonialFormData) => {
    try {
      if (editingTestimonial) {
        await updateTestimonial.mutateAsync(formData);
      } else {
        await createTestimonial.mutateAsync(formData);
      }
      setIsModalOpen(false);
      setEditingTestimonial(null);
    } catch (error) {
      console.error('Error saving testimonial:', error);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTestimonial(null);
  };

  const handleToggleStatus = (id: string, isActive: boolean) => {
    toggleStatus.mutate({ id, isActive });
  };

  const handleDeleteClick = (id: string) => {
    setDeletingTestimonialId(id);
  };

  const handleDeleteConfirm = () => {
    if (deletingTestimonialId) {
      deleteTestimonial.mutate(deletingTestimonialId, {
        onSuccess: () => {
          setDeletingTestimonialId(null);
        }
      });
    }
  };

  // Error State
  if (error) {
    return (
      <ErrorHandle 
        title="Fehler beim Laden" 
        message="Die Testimonials konnten nicht geladen werden." 
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Testimonials-Verwaltung</h1>
          <p className="text-gray-600">
            Verwalten und durchsuchen Sie alle Kundenbewertungen
          </p>
        </div>
        <button
          onClick={() => {
            setEditingTestimonial(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary/80 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
          </svg>
          Testimonial hinzufügen
        </button>
      </div>

      {/* Search */}
      <TestimonialSearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* Results Header */}
      <div className="flex items-center justify-between mb-4">
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{filteredTestimonials.length}</span> 
            {' '}von{' '}
            <span className="font-semibold text-gray-900">{(testimonials as Testimonial[]).length}</span>
            {' '}Testimonials
          </p>
        )}
      </div>

      {/* Testimonials Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
              <div className="p-6 space-y-3">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
                <div className="space-y-2 pt-4">
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <div className="flex-1 h-10 bg-gray-200 rounded" />
                  <div className="w-10 h-10 bg-gray-200 rounded" />
                  <div className="w-10 h-10 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredTestimonials.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial: Testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              onEdit={handleEdit}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      ) : (
        <TestimonialEmptyState 
          hasSearch={searchQuery.length > 0} 
          onCreateClick={() => {
            setEditingTestimonial(null);
            setIsModalOpen(true);
          }}
        />
      )}

      {/* Create/Edit Modal */}
      <TestimonialModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreate}
        initialData={editingTestimonial ? {
          client_name: editingTestimonial.client_name,
          client_position: editingTestimonial.client_position || '',
          client_company: editingTestimonial.client_company || '',
          testimonial_text: editingTestimonial.testimonial_text,
          rating: editingTestimonial.rating,
          photo_url: editingTestimonial.photo_url,
          is_active: editingTestimonial.is_active,
        } : undefined}
        isLoading={editingTestimonial ? updateTestimonial.isPending : createTestimonial.isPending}
        title={editingTestimonial ? 'Testimonial bearbeiten' : 'Testimonial hinzufügen'}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={!!deletingTestimonialId}
        onClose={() => setDeletingTestimonialId(null)}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleteTestimonial.isPending}
        title="Testimonial löschen?"
        message={`Möchten Sie das Testimonial von ${deletingTestimonialName} wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.`}
      />
    </div>
  );
};

export default Testimonials;