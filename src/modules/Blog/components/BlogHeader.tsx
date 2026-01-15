// src/modules/Blog/components/BlogHeader.tsx
import { Plus } from 'lucide-react';

interface BlogHeaderProps {
  onCreateNew: () => void;
}

const BlogHeader = ({ onCreateNew }: BlogHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog-Verwaltung</h1>
        <p className="text-gray-600">
          Verwalten und veröffentlichen Sie Ihre Blogbeiträge
        </p>
      </div>
      <button
        onClick={onCreateNew}
        className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary/80 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
      >
        <Plus className="w-5 h-5" />
        Beitrag erstellen
      </button>
    </div>
  );
};

export default BlogHeader;