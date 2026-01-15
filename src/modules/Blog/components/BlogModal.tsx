// src/modules/Blog/components/BlogModal.tsx
import { useState, useEffect } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import type { BlogPost, CreateBlogPostParams, UpdateBlogPostParams } from '../types';
import { supabase } from '@lib/supabase';

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateBlogPostParams | UpdateBlogPostParams) => void;
  editPost?: BlogPost | null;
  isLoading: boolean;
}

const BlogModal = ({ isOpen, onClose, onSubmit, editPost, isLoading }: BlogModalProps) => {
  const [formData, setFormData] = useState<CreateBlogPostParams>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image_url: null,
    author: '',
    published_at: null,
    is_published: false,
    reading_time: 5,
    tags: [],
  });

  const [tagInput, setTagInput] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (editPost) {
      setFormData({
        title: editPost.title,
        slug: editPost.slug,
        excerpt: editPost.excerpt,
        content: editPost.content,
        featured_image_url: editPost.featured_image_url,
        author: editPost.author,
        published_at: editPost.published_at,
        is_published: editPost.is_published,
        reading_time: editPost.reading_time,
        tags: editPost.tags || [],
      });
    } else {
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featured_image_url: null,
        author: '',
        published_at: null,
        is_published: false,
        reading_time: 5,
        tags: [],
      });
    }
  }, [editPost, isOpen]);

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Bitte nur Bilddateien hochladen');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Bild ist zu groß (max. 5MB)');
      return;
    }

    setUploadingImage(true);

    try {
      const userId = await supabase.auth.getUser().then(({ data }) => data.user?.id || null);
      const fileExt = file.name.split('.').pop();
      const fileName = `blog_${Date.now()}.${fileExt}`;
      const filePath = `${userId}/blog/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog_images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('blog_images')
        .getPublicUrl(filePath);

      setFormData((prev) => ({
        ...prev,
        featured_image_url: urlData.publicUrl,
      }));
    } catch (error) {
      console.error('Upload error:', error);
      alert('Fehler beim Hochladen des Bildes');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editPost) {
      onSubmit({ id: editPost.id, ...formData } as UpdateBlogPostParams);
    } else {
      onSubmit(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">
              {editPost ? 'Blogbeitrag bearbeiten' : 'Neuer Blogbeitrag'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titel *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Blogbeitrag Titel"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL-Slug *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="url-slug"
                />
                <p className="text-xs text-gray-500 mt-1">
                  URL: https://immo-tipp.at/blog/{formData.slug || 'slug'}
                </p>
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Autor *
                </label>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, author: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Max Mustermann"
                />
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titelbild
                </label>
                {formData.featured_image_url ? (
                  <div className="relative">
                    <img
                      src={formData.featured_image_url}
                      alt="Featured"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, featured_image_url: null }))
                      }
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      disabled={uploadingImage}
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors"
                    >
                      {uploadingImage ? (
                        <Loader2 className="w-12 h-12 text-primary animate-spin" />
                      ) : (
                        <>
                          <Upload className="w-12 h-12 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">
                            Klicken zum Hochladen
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG bis zu 5MB
                          </p>
                        </>
                      )}
                    </label>
                  </div>
                )}
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kurzbeschreibung *
                </label>
                <textarea
                  required
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Kurze Zusammenfassung des Blogbeitrags..."
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inhalt *
                </label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, content: e.target.value }))
                  }
                  rows={12}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none font-mono text-sm"
                  placeholder="Blogbeitrag Inhalt (Markdown unterstützt)..."
                />
              </div>

              {/* Reading Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lesezeit (Minuten) *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.reading_time}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      reading_time: parseInt(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Tag hinzufügen"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                  >
                    Hinzufügen
                  </button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-primary/70"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Publish Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_published"
                  checked={formData.is_published}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, is_published: e.target.checked }))
                  }
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="is_published" className="text-sm font-medium text-gray-700">
                  Sofort veröffentlichen
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                Abbrechen
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {editPost ? 'Aktualisieren' : 'Erstellen'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;