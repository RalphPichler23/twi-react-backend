// src/modules/Blog/components/BlogCard.tsx
import { Calendar, Clock, Eye, EyeOff, Edit, Trash2 } from 'lucide-react';
import type { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, isPublished: boolean) => void;
}

const BlogCard = ({ post, onEdit, onDelete, onToggleStatus }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-AT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Featured Image */}
      {post.featured_image_url ? (
        <div className="relative h-48 bg-gray-100">
          <img
            src={post.featured_image_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            {post.is_published ? (
              <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                Veröffentlicht
              </span>
            ) : (
              <span className="px-3 py-1 bg-gray-500 text-white text-xs font-semibold rounded-full">
                Entwurf
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
          <div className="text-center">
            <svg
              className="w-16 h-16 text-primary/30 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <p className="text-sm text-gray-500">Kein Bild</p>
          </div>
          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            {post.is_published ? (
              <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                Veröffentlicht
              </span>
            ) : (
              <span className="px-3 py-1 bg-gray-500 text-white text-xs font-semibold rounded-full">
                Entwurf
              </span>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>
              {post.published_at
                ? formatDate(post.published_at)
                : formatDate(post.created_at)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.reading_time} Min.</span>
          </div>
        </div>

        {/* Author */}
        <div className="text-sm text-gray-600 mb-4">
          Von <span className="font-medium">{post.author}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
          <button
            onClick={() => onToggleStatus(post.id, post.is_published)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              post.is_published
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {post.is_published ? (
              <>
                <EyeOff className="w-4 h-4" />
                <span>Verstecken</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                <span>Veröffentlichen</span>
              </>
            )}
          </button>

          <button
            onClick={() => onEdit(post)}
            className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
            title="Bearbeiten"
          >
            <Edit className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDelete(post.id)}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            title="Löschen"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;