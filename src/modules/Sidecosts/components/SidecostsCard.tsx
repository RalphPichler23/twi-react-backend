// src/modules/Sidecosts/components/SidecostCard.tsx
import { Upload, FileText, Trash2, Download, Loader2 } from 'lucide-react';
import { useRef } from 'react';
import type { SidecostFile } from '../types';

interface SidecostCardProps {
  title: string;
  description: string;
  type: 'rent' | 'purchase';
  file: SidecostFile | null;
  isLoading: boolean;
  onUpload: (file: File) => void;
  onRemove: () => void;
  isUploading: boolean;
  isRemoving: boolean;
}

const SidecostCard = ({
  title,
  description,
  type,
  file,
  isLoading,
  onUpload,
  onRemove,
  isUploading,
  isRemoving,
}: SidecostCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onUpload(selectedFile);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('de-AT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <FileText className="w-6 h-6 text-primary" />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        </div>
      ) : file ? (
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-red-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.filename}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatFileSize(file.file_size)} • Hochgeladen am {formatDate(file.uploaded_at)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Öffnen</span>
            </a>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Ersetze...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Ersetzen</span>
                </>
              )}
            </button>

            <button
              onClick={onRemove}
              disabled={isRemoving}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Löschen"
            >
              {isRemoving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-700 mb-1">
              Keine Datei hochgeladen
            </p>
            <p className="text-xs text-gray-500">
              Klicken Sie unten, um eine PDF-Datei hochzuladen
            </p>
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Lade hoch...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>PDF hochladen</span>
              </>
            )}
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Nur PDF-Dateien • Max. 10MB
        </p>
      </div>
    </div>
  );
};

export default SidecostCard;