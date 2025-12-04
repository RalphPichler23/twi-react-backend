// src/modules/Properties/components/edit/PropertyEditActions.tsx
import Button from '@/shared/components/ui/Button';

interface PropertyEditActionsProps {
  isUpdating: boolean;
  onCancel: () => void;
}

const PropertyEditActions = ({ isUpdating, onCancel }: PropertyEditActionsProps) => {
  return (
    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Aktionen</h3>
      
      <div className="space-y-3">
        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isUpdating}
          leftIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
            </svg>
          }
        >
          Änderungen speichern
        </Button>

        <Button
          type="button"
          variant="secondary"
          fullWidth
          onClick={onCancel}
          leftIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          }
        >
          Abbrechen
        </Button>
      </div>
    </div>
  );
};

export default PropertyEditActions;