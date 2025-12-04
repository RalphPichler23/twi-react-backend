// src/modules/Properties/components/edit/PropertyEditActions.tsx
interface PropertyEditActionsProps {
    isUpdating: boolean;
    onCancel: () => void;
  }
  
  const PropertyEditActions = ({ isUpdating, onCancel }: PropertyEditActionsProps) => {
    return (
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Aktionen</h3>
        
        <div className="space-y-3">
          <button
            type="submit"
            disabled={isUpdating}
            className="w-full bg-gradient-to-br from-primary to-primary/80 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
          >
            {isUpdating ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Speichert...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                Änderungen speichern
              </>
            )}
          </button>
  
          <button
            type="button"
            onClick={onCancel}
            className="w-full border-2 border-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            Abbrechen
          </button>
        </div>
      </div>
    );
  };
  
  export default PropertyEditActions;