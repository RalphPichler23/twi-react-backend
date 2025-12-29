// src/modules/Testimonials/components/TestimonialEmptyState.tsx
interface TestimonialEmptyStateProps {
  hasSearch: boolean;
  onCreateClick?: () => void;
}

const TestimonialEmptyState = ({ hasSearch, onCreateClick }: TestimonialEmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {hasSearch ? 'Keine Ergebnisse gefunden' : 'Noch keine Testimonials'}
      </h3>
      <p className="text-gray-600 mb-6">
        {hasSearch 
          ? 'Versuchen Sie eine andere Suche' 
          : 'Fügen Sie Ihr erstes Testimonial hinzu'}
      </p>
      {!hasSearch && onCreateClick && (
        <button
          onClick={onCreateClick}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
          </svg>
          Erstes Testimonial hinzufügen
        </button>
      )}
    </div>
  );
};

export default TestimonialEmptyState;