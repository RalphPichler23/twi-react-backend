// src/modules/Testimonials/components/TestimonialCard.tsx
import type { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  onToggleStatus: (id: string, isActive: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (testimonial: Testimonial) => void;
}

const TestimonialCard = ({ testimonial, onToggleStatus, onDelete, onEdit }: TestimonialCardProps) => {
  const renderStars = (rating: number | null) => {
    if (!rating) return null;
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all flex flex-col h-full">
      {/* Header with Photo */}
      <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/50">
            {testimonial.photo_url ? (
              <img
                src={testimonial.photo_url}
                alt={testimonial.client_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/20">
                <span className="text-2xl font-bold text-primary">
                  {testimonial.client_name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 truncate">
              {testimonial.client_name}
            </h3>
            {testimonial.client_position && (
              <p className="text-sm text-gray-600 truncate">
                {testimonial.client_position}
              </p>
            )}
            {testimonial.client_company && (
              <p className="text-sm text-primary font-medium truncate">
                {testimonial.client_company}
              </p>
            )}
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              testimonial.is_active 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-700'
            }`}>
              {testimonial.is_active ? 'Aktiv' : 'Inaktiv'}
            </span>
          </div>
        </div>

        {/* Rating */}
        {testimonial.rating && (
          <div className="mt-3">
            {renderStars(testimonial.rating)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Testimonial Text with fixed height */}
        <div className="mb-4 flex-1">
          <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
            "{testimonial.testimonial_text}"
          </p>
        </div>

        {/* Actions - push to bottom with mt-auto */}
        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-100">
          <button
            onClick={() => onEdit(testimonial)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            Bearbeiten
          </button>

          <button
            onClick={() => onToggleStatus(testimonial.id, testimonial.is_active)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title={testimonial.is_active ? 'Deaktivieren' : 'Aktivieren'}
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {testimonial.is_active ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              )}
            </svg>
          </button>

          <button
            onClick={() => onDelete(testimonial.id)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
            title="Löschen"
          >
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;