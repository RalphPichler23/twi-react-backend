// src/modules/Properties/components/details/PropertyQuickActions.tsx
import { useState } from 'react';

interface PropertyQuickActionsProps {
  propertyId: string;
}

const PropertyQuickActions = ({ propertyId }: PropertyQuickActionsProps) => {
  const [showCopiedFeedback, setShowCopiedFeedback] = useState(false);

  const handleShareLink = async () => {
    const url = `${import.meta.env.VITE_FRONTEND_DOMAIN}/properties/${propertyId}`;
    
    try {
      // Try native share API first (mobile devices)
      if (navigator.share) {
        await navigator.share({
          title: 'Immobilie teilen',
          text: 'Schau dir diese Immobilie an',
          url: url,
        });
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(url);
        setShowCopiedFeedback(true);
        setTimeout(() => setShowCopiedFeedback(false), 2000);
      }
    } catch (error) {
      console.error('Share failed:', error);
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        setShowCopiedFeedback(true);
        setTimeout(() => setShowCopiedFeedback(false), 2000);
      } catch (clipboardError) {
        console.error('Clipboard failed:', clipboardError);
      }
    }
  };

  const actions = [
    {
      icon: showCopiedFeedback ? (
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
        </svg>
      ) : (
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
        </svg>
      ),
      label: showCopiedFeedback ? 'Link kopiert!' : 'Link teilen',
      onClick: handleShareLink,
      isSuccess: showCopiedFeedback,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Aktionen
      </h3>
      <div className="space-y-2">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`
              w-full flex items-center gap-3 px-4 py-3 border-2 rounded-lg transition-all text-left
              ${action.isSuccess 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 hover:border-primary hover:bg-primary/5'
              }
            `}
          >
            {action.icon}
            <span className={`font-medium ${action.isSuccess ? 'text-green-700' : 'text-gray-700'}`}>
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PropertyQuickActions;