import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DocumentItem } from '../../types/export';
import { DocumentCard } from './DocumentCard';
import {
  FileText,
  Upload,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Bot,
  X,
  Eye,
  Download
} from 'lucide-react';

export const DocumentVault: React.FC = () => {
  const { documents, updateDocumentStatus, openAiDocumentAgent, triggerToast } = useApp();

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [uploadTargetDoc, setUploadTargetDoc] = useState<DocumentItem | null>(null);
  const [uploadFileName, setUploadFileName] = useState<string>('');

  const availableCount = documents.filter(d => d.status === 'available').length;
  const pendingCount = documents.filter(d => d.status === 'pending').length;
  const missingCount = documents.filter(d => d.status === 'missing').length;

  const filteredDocs = documents.filter(d => {
    const matchesCategory = filterCategory === 'all' || d.category === filterCategory;
    const matchesSearch =
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.authority.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleManualUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTargetDoc) return;
    const finalName = uploadFileName || `${uploadTargetDoc.code}_Signed_Copy.pdf`;
    updateDocumentStatus(uploadTargetDoc.id, 'available', finalName);
    setUploadTargetDoc(null);
    setUploadFileName('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      
      {/* Vault Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Document Vault
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
              {availableCount} of {documents.length} Available
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Central repository for mandatory statutory, customs, commercial, and transport certificates.
          </p>
        </div>

        {/* Quick status counters */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>{availableCount} Available</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>{pendingCount} Pending</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
            <XCircle className="w-4 h-4" />
            <span>{missingCount} Missing</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search documents (e.g. IEC, Invoice, Packing List)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'All Documents' },
            { id: 'statutory', label: 'Statutory' },
            { id: 'commercial', label: 'Commercial' },
            { id: 'customs', label: 'Customs' },
            { id: 'compliance', label: 'Compliance' },
            { id: 'transport', label: 'Transport' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                filterCategory === cat.id
                  ? 'bg-teal-500 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Document Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map(doc => (
          <DocumentCard
            key={doc.id}
            document={doc}
            onPreview={d => setPreviewDoc(d)}
            onUploadClick={d => {
              setUploadTargetDoc(d);
              setUploadFileName(`${d.code}_ExportCopy.pdf`);
            }}
          />
        ))}
      </div>

      {/* Modal: Document Preview */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-500" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate max-w-xs">
                  {previewDoc.name}
                </h3>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs font-mono bg-slate-50 dark:bg-navy-850 p-4 rounded-xl border border-slate-200 dark:border-slate-800 leading-relaxed">
              <p className="text-teal-600 dark:text-teal-400 font-bold">// DOCUMENT VERIFICATION RECORD</p>
              <p>CODE: {previewDoc.code}</p>
              <p>ISSUING AUTHORITY: {previewDoc.authority}</p>
              <p>STATUS: {previewDoc.status.toUpperCase()}</p>
              <p>FILE NAME: {previewDoc.fileName || 'Verified_Digital_Record.pdf'}</p>
              <p>HASH: SHA-256 (Verifiable on ICEGATE / DGFT)</p>
              <p className="text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
                Purpose: {previewDoc.requiredFor}
              </p>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-navy-800"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Manual File Upload / Replace */}
      {uploadTargetDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Upload {uploadTargetDoc.code}
              </h3>
              <button
                onClick={() => setUploadTargetDoc(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleManualUpload} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Document File Name
                </label>
                <input
                  type="text"
                  required
                  value={uploadFileName}
                  onChange={e => setUploadFileName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-navy-850">
                <Upload className="w-8 h-8 text-teal-500 mx-auto mb-2" />
                <p className="font-bold text-slate-700 dark:text-slate-200">
                  Click or drag signed PDF to upload
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  Supports PDF, PNG, JPG up to 15 MB
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setUploadTargetDoc(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500"
                >
                  Confirm & Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
