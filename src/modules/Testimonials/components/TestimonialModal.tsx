// src/modules/Testimonials/components/TestimonialModal.tsx
import { useState, useEffect } from 'react';
import type { TestimonialFormData } from '../types';

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TestimonialFormData) => void;
  initialData?: Partial<TestimonialFormData> & { photo_url?: string | null };
  isLoading?: boolean;
  title?: string;
}

const TestimonialModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
  title = 'Testimonial hinzufügen'
}: TestimonialModalProps) => {
  const [formData, setFormData] = useState<TestimonialFormData>({
    client_name: initialData?.client_name || '',
    client_position: initialData?.client_position || '',
    client_company: initialData?.client_company || '',
    testimonial_text: initialData?.testimonial_text || '',
    rating: initialData?.rating ?? null,
    photo: null,
    is_active: initialData?.is_active ?? true,
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(initialData?.photo_url || null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        client_name: initialData.client_name || '',
        client_position: initialData.client_position || '',
        client_company: initialData.client_company || '',
        testimonial_text: initialData.testimonial_text || '',
        rating: initialData.rating ?? null,
        photo: null,
        is_active: initialData.is_active ?? true,
      });
      setPhotoPreview(initialData.photo_url || null);
    }
  }, [initialData]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.client_name.trim()) {
      newErrors.client_name = 'Name ist erforderlich';
    }

    if (!formData.testimonial_text.trim()) {
      newErrors.testimonial_text = 'Testimonial-Text ist erforderlich';
    }

    if (formData.rating && (formData.rating < 1 || formData.rating > 5)) {
      newErrors.rating = 'Bewertung muss zwischen 1 und 5 liegen';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleClose = () => {
    setFormData({
      client_name: '',
      client_position: '',
      client_company: '',
      testimonial_text: '',
      rating: null,
      photo: null,
      is_active: true,
    });
    setPhotoPreview(null);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-600 mt-1">
              Füllen Sie die Informationen aus
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Foto
              </label>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg font-medium text-gray-700 cursor-pointer transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    Foto auswählen
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    JPG, PNG oder GIF (max. 5MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Name & Position */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.client_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                    errors.client_name ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="Max Mustermann"
                />
                {errors.client_name && (
                  <p className="text-xs text-red-600 mt-1">{errors.client_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Position
                </label>
                <input
                  type="text"
                  value={formData.client_position}
                  onChange={(e) => setFormData(prev => ({ ...prev, client_position: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Geschäftsführer"
                />
              </div>
            </div>

            {/* Company & Rating */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Firma
                </label>
                <input
                  type="text"
                  value={formData.client_company}
                  onChange={(e) => setFormData(prev => ({ ...prev, client_company: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Firma GmbH"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Bewertung (1-5 Sterne)
                </label>
                <div className="relative">
                  <select
                    value={formData.rating ?? ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value ? Number(e.target.value) : null }))}
                    className={`w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none bg-white cursor-pointer ${
                      errors.rating ? 'border-red-300' : 'border-gray-200'
                    }`}
                  >
                    <option value="">Keine Bewertung</option>
                    <option value="5">⭐⭐⭐⭐⭐ (5 Sterne)</option>
                    <option value="4">⭐⭐⭐⭐ (4 Sterne)</option>
                    <option value="3">⭐⭐⭐ (3 Sterne)</option>
                    <option value="2">⭐⭐ (2 Sterne)</option>
                    <option value="1">⭐ (1 Stern)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </div>
                {errors.rating && (
                  <p className="text-xs text-red-600 mt-1">{errors.rating}</p>
                )}
              </div>
            </div>

            {/* Testimonial Text */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Testimonial <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.testimonial_text}
                onChange={(e) => setFormData(prev => ({ ...prev, testimonial_text: e.target.value }))}
                rows={6}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                  errors.testimonial_text ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="Was sagt der Kunde über Sie..."
              />
              {errors.testimonial_text && (
                <p className="text-xs text-red-600 mt-1">{errors.testimonial_text}</p>
              )}
            </div>

            {/* Active Status */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary/20"
              />
              <label htmlFor="is_active" className="text-sm font-medium text-gray-900">
                Aktives Testimonial (auf Website anzeigen)
              </label>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 p-6 border-t border-gray-100 bg-gray-50">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-2.5 border border-gray-200 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={isLoading}
          >
            Abbrechen
          </button>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Speichert...
              </span>
            ) : (
              'Speichern'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialModal;