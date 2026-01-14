// src/modules/Sidecosts/types.ts
export interface SidecostFile {
  id: string;
  type: 'rent' | 'purchase';
  filename: string;
  url: string;
  uploaded_at: string;
  file_size: number;
}

export interface UploadSidecostParams {
  type: 'rent' | 'purchase';
  file: File;
}