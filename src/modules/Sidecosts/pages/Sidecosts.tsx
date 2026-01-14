// src/modules/Sidecosts/pages/Sidecosts.tsx
import { toast } from 'sonner';
import SidecostCard from '../components/SidecostsCard';
import { useFetchRentSidecost, useFetchPurchaseSidecost } from '../api/useFetchSidecosts';
import useUploadSidecost from '../api/useUploadSideCosts';
import useRemoveSidecost from '../api/useRemoveSidecosts';

const Sidecosts = () => {
  const { data: rentFile, isLoading: rentLoading } = useFetchRentSidecost();
  const { data: purchaseFile, isLoading: purchaseLoading } = useFetchPurchaseSidecost();
  
  const uploadMutation = useUploadSidecost();
  const removeMutation = useRemoveSidecost();

  const handleUpload = async (type: 'rent' | 'purchase', file: File) => {
    try {
      await uploadMutation.mutateAsync({ type, file });
      toast.success('PDF erfolgreich hochgeladen');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Fehler beim Hochladen');
    }
  };

  const handleRemove = async (type: 'rent' | 'purchase') => {
    if (!confirm('Möchten Sie diese Datei wirklich löschen?')) return;
    
    try {
      await removeMutation.mutateAsync(type);
      toast.success('PDF erfolgreich gelöscht');
    } catch (error) {
      console.error('Remove error:', error);
      toast.error('Fehler beim Löschen');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Rent/Lease Sidecosts */}
          <SidecostCard
            title="Miete | Pacht | Baurecht"
            description="Nebenkostenübersicht für Mieter/Vermieter sowie Pächter/Verpächter und Informationen zum Maklervertrag"
            type="rent"
            file={rentFile || null}
            isLoading={rentLoading}
            onUpload={(file) => handleUpload('rent', file)}
            onRemove={() => handleRemove('rent')}
            isUploading={uploadMutation.isPending && uploadMutation.variables?.type === 'rent'}
            isRemoving={removeMutation.isPending && removeMutation.variables === 'rent'}
          />

          {/* Purchase/Sale Sidecosts */}
          <SidecostCard
            title="Kauf / Verkauf"
            description="Nebenkostenübersicht für Käufer sowie Verkäufer einer Immobilie und Informationen zum Maklervertrag"
            type="purchase"
            file={purchaseFile || null}
            isLoading={purchaseLoading}
            onUpload={(file) => handleUpload('purchase', file)}
            onRemove={() => handleRemove('purchase')}
            isUploading={uploadMutation.isPending && uploadMutation.variables?.type === 'purchase'}
            isRemoving={removeMutation.isPending && removeMutation.variables === 'purchase'}
          />
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">ℹ️ Hinweis</h3>
          <p className="text-sm text-blue-800">
            Diese PDFs werden auf der öffentlichen Website unter "Nebenkosten" angezeigt. 
            Stellen Sie sicher, dass die Dokumente aktuell und korrekt sind.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidecosts;