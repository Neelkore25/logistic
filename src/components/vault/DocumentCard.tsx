import React, { useState } from 'react';
import { DocumentItem, DocumentStatus } from '../../types/export';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  Upload,
  Eye,
  Download,
  Trash2,
  Bot,
  RefreshCw,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface DocumentCardProps {
  document: DocumentItem;
  onPreview: (doc: DocumentItem) => void;
  onUploadClick: (doc: DocumentItem) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  onPreview,
  onUploadClick
}) => {
  const { deleteDocument, openAiDocumentAgent, updateDocumentStatus } = useApp();

  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case 'available':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Available</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Pending Review</span>
          </span>
        );
      case 'missing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
            <XCircle className="w-3.5 h-3.5" />
            <span>Missing</span>
          </span>
        );
    }
  };

  const handleDownloadSample = () => {
    // Generate sample text file
    const content = `EXPORTREADY COMPLIANCE DRAFT\nDocument: ${document.name}\nCode: ${document.code}\nAuthority: ${document.authority}\nRequired For: ${document.requiredFor}\nGenerated on: ${new Date().toLocaleDateString()}\nNote: For Indian Customs & DGFT filing review.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${document.code}_Sample_Template.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-navy-850/80 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between gap-4">
      
      {/* Top Header: Doc name, code, status */}
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2.5">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {document.name}
                </h4>
                {document.mandatory && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
                    Mandatory
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                {document.code} • {document.authority}
              </p>
            </div>
          </div>

          <div className="shrink-0">
            {getStatusBadge(document.status)}
          </div>
        </div>

        <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
          {document.requiredFor}
        </p>

        {document.fileName && (
          <div className="mt-2 text-[11px] text-teal-600 dark:text-teal-400 font-mono truncate">
            📄 {document.fileName} {document.fileSize ? `(${document.fileSize})` : ''}
          </div>
        )}
      </div>

      {/* Actions Toolbar */}
      <div className="pt-3 border-t border-slate-200/70 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
        
        {/* Left: AI Assist button if missing/pending */}
        {document.status !== 'available' && document.canAiAssist ? (
          <button
            onClick={() => openAiDocumentAgent(document)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 shadow-glow-teal flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Get AI Assistance</span>
          </button>
        ) : (
          <div className="text-[11px] text-slate-400">
            {document.uploadedAt ? `Updated: ${document.uploadedAt}` : 'Ready for upload'}
          </div>
        )}

        {/* Right: Operational actions */}
        <div className="flex items-center gap-1.5">
          {document.status === 'available' ? (
            <>
              <button
                onClick={() => onPreview(document)}
                className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800"
                title="View / Preview Document"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={handleDownloadSample}
                className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800"
                title="Download Template / Export Copy"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => onUploadClick(document)}
                className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800"
                title="Replace Document"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteDocument(document.id)}
                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                title="Delete Document"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={() => onUploadClick(document)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 dark:hover:bg-navy-750 border border-slate-300 dark:border-slate-700 flex items-center gap-1"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
