import React, { useState, useEffect } from 'react';
import { db } from '../../services/databaseService';
import { useApp } from '../../context/AppContext';
import {
  Database,
  Table,
  RefreshCw,
  Download,
  Search,
  Users,
  Building2,
  Package,
  FileText,
  Ship,
  CreditCard,
  Bell,
  Sparkles
} from 'lucide-react';

interface TableDefinition {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
}

const TABLES: TableDefinition[] = [
  { id: 'users', label: 'Users', icon: Users, desc: 'Registered user accounts & auth credentials' },
  { id: 'businessProfiles', label: 'Business Profiles', icon: Building2, desc: 'MSME business profiles & statutory details' },
  { id: 'products', label: 'Products', icon: Package, desc: 'Commodity items & HS Codes' },
  { id: 'documents', label: 'Documents', icon: FileText, desc: 'Document vault & binary files' },
  { id: 'shipments', label: 'Shipments', icon: Ship, desc: 'Active & past freight consignments' },
  { id: 'payments', label: 'Payments', icon: CreditCard, desc: 'Plan upgrades & transaction receipts' },
  { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'In-app user alerts' },
  { id: 'onboarding', label: 'Onboarding', icon: Sparkles, desc: 'Milestone progress state' }
];

export const DatabaseViewer: React.FC = () => {
  const { triggerToast } = useApp();
  const [selectedTable, setSelectedTable] = useState<string>('users');
  const [tableData, setTableData] = useState<any[]>([]);
  const [tableCounts, setTableCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const counts: Record<string, number> = {};
      for (const t of TABLES) {
        counts[t.id] = await (db as any)[t.id].count();
      }
      setTableCounts(counts);

      const data = await (db as any)[selectedTable].toArray();
      setTableData(data);
    } catch (err) {
      console.error('Failed to load database contents:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedTable]);

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tableData, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute('href', dataStr);
    dl.setAttribute('download', selectedTable + '-exportready.json');
    dl.click();
    triggerToast('Export Complete', 'Downloaded ' + selectedTable + '.json successfully.', 'success');
  };

  const filteredData = tableData.filter(item => {
    if (!searchQuery) return true;
    return JSON.stringify(item).toLowerCase().includes(searchQuery.toLowerCase());
  });

  const columns = tableData.length > 0 ? Object.keys(tableData[0]) : [];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <span>Live Database Viewer</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  ExportReadyDB (IndexedDB)
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Inspect, query, and verify your real isolated database tables directly inside the app.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-navy-850 hover:bg-slate-100 dark:hover:bg-navy-800 border border-slate-300 dark:border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className={loading ? 'w-3.5 h-3.5 animate-spin' : 'w-3.5 h-3.5'} />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleExportJSON}
            disabled={tableData.length === 0}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Table (.JSON)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {TABLES.map(t => {
          const Icon = t.icon;
          const isSelected = selectedTable === t.id;
          const count = tableCounts[t.id] ?? 0;

          return (
            <button
              key={t.id}
              onClick={() => setSelectedTable(t.id)}
              className={
                isSelected
                  ? 'p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between border-purple-500 bg-purple-50/50 dark:bg-purple-950/40 shadow-sm ring-2 ring-purple-500/20'
                  : 'p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={isSelected ? 'w-4 h-4 text-purple-600 dark:text-purple-400' : 'w-4 h-4 text-slate-500'} />
                <span className={
                  isSelected
                    ? 'text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-purple-200 dark:bg-purple-800 text-purple-900 dark:text-purple-100'
                    : 'text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300'
                }>
                  {count}
                </span>
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {t.label}
              </div>
            </button>
          );
        })}
      </div>

      <div className="glass-card rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-lg overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50 dark:bg-navy-850">
          <div className="flex items-center gap-2">
            <Table className="w-4 h-4 text-purple-500" />
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              Table: <span className="font-mono text-purple-600 dark:text-purple-400">{selectedTable}</span>
            </span>
            <span className="text-xs text-slate-400">({filteredData.length} rows)</span>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter rows..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {filteredData.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No records found in {selectedTable}.
          </div>
        ) : (
          <div className="overflow-x-auto max-h-[500px]">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 dark:bg-navy-900 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3 w-12 text-center text-slate-400">#</th>
                  {columns.map(col => (
                    <th key={col} className="p-3 font-mono whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono text-[11px]">
                {filteredData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-navy-850/50 transition-colors">
                    <td className="p-3 text-center text-slate-400 font-sans">{idx + 1}</td>
                    {columns.map(col => {
                      const val = row[col];
                      let displayVal = typeof val === 'object' ? JSON.stringify(val) : String(val ?? '—');
                      if (displayVal.length > 50) {
                        displayVal = displayVal.substring(0, 47) + '...';
                      }
                      return (
                        <td key={col} className="p-3 whitespace-nowrap text-slate-800 dark:text-slate-200">
                          {displayVal}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
