// src/modules/Properties/components/details/PropertyDetailsHeader.tsx
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/shared/components/ui/Button';

interface PropertyDetailsHeaderProps {
  id: string;
  onDelete: () => void;
  onCreateNew?: () => void;
}

const PropertyDetailsHeader = ({ id, onDelete, onCreateNew }: PropertyDetailsHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={() => navigate("/properties")}
        className="inline-flex cursor-pointer items-center gap-2 text-gray-600 hover:text-primary transition-colors group"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Zurück zur Übersicht
      </button>

      <div className="flex items-center gap-3">
        {/* Neue Immobilie Button */}
        {onCreateNew && (
          <div className='hidden md:flex'>
            <Button
              variant="outline"
              onClick={onCreateNew}
              className='hidden md:flex'
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                </svg>
              }
            >
              Neue Immobilie
            </Button>
          </div>
        )}

        {/* Bearbeiten Button */}
        <Link
          to={`/properties/${id}/edit`}
          className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary/80 text-white font-semibold py-2.5 px-5 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
          Bearbeiten
        </Link>

        {/* Löschen Button */}
        <div className='hidden md:flex'>
          <button
            onClick={onDelete}
            className="inline-flex cursor-pointer items-center gap-2 border-2 border-red-200 text-red-600 font-semibold py-2.5 px-5 rounded-lg hover:bg-red-50 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            Löschen
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsHeader;