// src/modules/Blog/components/BlogEmptyState.tsx
import { FileText } from 'lucide-react';

interface BlogEmptyStateProps {
  onCreateNew: () => void;
}

const BlogEmptyState = ({ onCreateNew }: BlogEmptyStateProps) => {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
        <FileText className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Noch keine Blogbeiträge
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Erstellen Sie Ihren ersten Blogbeitrag und teilen Sie interessante
        Inhalte mit Ihren Besuchern.
      </p>
      <button
        onClick={onCreateNew}
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
      >
        <FileText className="w-5 h-5" />
        Ersten Beitrag erstellen
      </button>
    </div>
  );
};

export default BlogEmptyState;