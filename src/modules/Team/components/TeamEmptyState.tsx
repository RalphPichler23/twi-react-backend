// src/modules/Team/components/TeamEmptyState.tsx

interface TeamEmptyStateProps {
  hasSearch: boolean;
  onCreateClick?: () => void;
}

const TeamEmptyState = ({ hasSearch, onCreateClick }: TeamEmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {hasSearch ? 'Keine Ergebnisse gefunden' : 'Noch keine Teammitglieder'}
      </h3>
      <p className="text-gray-600 mb-6">
        {hasSearch 
          ? 'Versuchen Sie eine andere Suche' 
          : 'Fügen Sie Ihr erstes Teammitglied hinzu'}
      </p>
      {!hasSearch && onCreateClick && (
        <button
          onClick={onCreateClick}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
          </svg>
          Erstes Mitglied hinzufügen
        </button>
      )}
    </div>
  );
};

export default TeamEmptyState;