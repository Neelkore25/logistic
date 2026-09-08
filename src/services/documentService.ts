import { DocumentItem, DocumentStatus } from '../types/export';
import { db } from './databaseService';

const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15 MB
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

export const documentService = {
  /**
   * Validates file size and format
   */
  validateFile(file: File): { valid: boolean; error?: string } {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return { valid: false, error: 'File size exceeds 15 MB limit. Please select a smaller file.' };
    }
    if (!ALLOWED_MIME_TYPES.includes(file.type) && !file.name.match(/\.(pdf|jpe?g|png|webp|docx?)$/i)) {
      return { valid: false, error: 'Unsupported file format. Please upload PDF, PNG, JPG, or DOCX.' };
    }
    return { valid: true };
  },

  /**
   * Convert file to Base64 data URL for local storage and viewing
   */
  fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  },

  /**
   * Format bytes to readable size
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  },

  /**
   * Upload real document to user's database vault
   */
  async uploadDocument(userId: string, documentId: string, file: File): Promise<DocumentItem> {
    const validation = this.validateFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const fileDataUrl = await this.fileToDataUrl(file);
    const existing = await db.documents.get(documentId);

    if (!existing || existing.userId !== userId) {
      throw new Error('Document record not found or access denied.');
    }

    const updatedDoc: DocumentItem = {
      ...existing,
      status: 'available',
      uploadedAt: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      fileName: file.name,
      fileSize: this.formatFileSize(file.size),
      fileData: fileDataUrl,
      mimeType: file.type || 'application/octet-stream'
    };

    await db.documents.put(updatedDoc);
    return updatedDoc;
  },

  /**
   * Save an AI-generated draft as an uploaded document in the vault
   */
  async saveAiDraftDocument(userId: string, documentId: string, fileName: string, contentText: string): Promise<DocumentItem> {
    const existing = await db.documents.get(documentId);
    if (!existing || existing.userId !== userId) {
      throw new Error('Document record not found or access denied.');
    }

    // Convert text draft to data URL
    const blob = new Blob([contentText], { type: 'text/plain;charset=utf-8' });
    const dataUrl = `data:text/plain;base64,${btoa(unescape(encodeURIComponent(contentText)))}`;

    const updatedDoc: DocumentItem = {
      ...existing,
      status: 'available',
      uploadedAt: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      fileName,
      fileSize: `${Math.round(blob.size / 1024)} KB`,
      fileData: dataUrl,
      mimeType: 'text/plain'
    };

    await db.documents.put(updatedDoc);
    return updatedDoc;
  },

  /**
   * Trigger browser file download from dataURL
   */
  downloadDocument(doc: DocumentItem): void {
    if (!doc.fileData) {
      // Generate fallback text file if no binary is stored
      const sampleText = `EXPORTREADY CERTIFICATE DRAFT\n\nDocument: ${doc.name}\nCode: ${doc.code}\nAuthority: ${doc.authority}\nRequired For: ${doc.requiredFor}\nUploaded: ${doc.uploadedAt || 'N/A'}`;
      const blob = new Blob([sampleText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.fileName || `${doc.code}_document.txt`;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    const a = document.createElement('a');
    a.href = doc.fileData;
    a.download = doc.fileName || `${doc.code}_document`;
    a.click();
  },

  /**
   * Delete uploaded file from document, returning it to 'missing'
   */
  async clearDocument(userId: string, documentId: string): Promise<DocumentItem> {
    const existing = await db.documents.get(documentId);
    if (!existing || existing.userId !== userId) {
      throw new Error('Document record not found or access denied.');
    }

    const clearedDoc: DocumentItem = {
      ...existing,
      status: 'missing',
      uploadedAt: undefined,
      fileName: undefined,
      fileSize: undefined,
      fileData: undefined,
      mimeType: undefined
    };

    await db.documents.put(clearedDoc);
    return clearedDoc;
  }
};
