// src/modules/Properties/components/details/DeleteConfirmationModal.tsx
interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isDeleting?: boolean;
  }
  
  const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, isDeleting }: DeleteConfirmationModalProps) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Immobilie löschen?
              </h3>
              <p className="text-gray-600">
                Diese Aktion kann nicht rückgängig gemacht werden.
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 cursor-pointer px-4 py-2.5 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Abbrechen
            </button>
            <button
              disabled={isDeleting}
              onClick={onConfirm}
              className="flex-1 cursor-pointer px-4 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Löschen
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteConfirmationModal;