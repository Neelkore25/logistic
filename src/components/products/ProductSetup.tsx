import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductType } from '../../types/export';
import { HsCodeSearchModal } from './HsCodeSearchModal';
import { ProductCard } from './ProductCard';
import { HsCodeRecord } from '../../data/hsCodes';
import {
  Package,
  Search,
  Plus,
  Save,
  CheckCircle2,
  Sparkles,
  Info,
  Layers
} from 'lucide-react';

export const ProductSetup: React.FC = () => {
  const { products, selectedProduct, selectProductById, addProduct } = useApp();

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [origin, setOrigin] = useState('Maharashtra, India');
  const [type, setType] = useState<ProductType>('food');
  const [hsCode, setHsCode] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState<number>(1000);
  const [unit, setUnit] = useState('Kilograms (kg)');
  const [weight, setWeight] = useState<number>(1000);
  const [dimensions, setDimensions] = useState('120 x 80 x 140 cm (4 Pallets)');
  const [productValue, setProductValue] = useState<number>(750000);

  const handleHsCodeSelected = (record: HsCodeRecord) => {
    setHsCode(record.code);
    setName(record.name.split(',')[0]);
    setCategory(record.category);
    setType(record.type);
    setDescription(record.name + ' - ' + record.notes);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !hsCode) return;

    addProduct({
      name,
      category: category || 'Export Goods',
      origin: origin || 'India',
      type,
      hsCode,
      description: description || `${name} for export`,
      quantity: Number(quantity) || 100,
      unit,
      weight: Number(weight) || 100,
      dimensions: dimensions || 'Standard Export Pallet',
      productValue: Number(productValue) || 100000,
      certificationsNeeded: ['Certificate of Origin', 'Quality NOC']
    });

    // Reset fields to clean state
    setName('');
    setCategory('');
    setHsCode('');
    setDescription('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Product Setup & Catalog
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
              {products.length} Registered
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Register your export products, classify with official ITC-HS codes, and calculate individual readiness.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsSearchModalOpen(true)}
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 shadow-glow-teal flex items-center gap-2 cursor-pointer transition-all"
        >
          <Search className="w-4 h-4" />
          <span>Search HS Code Database</span>
        </button>
      </div>

      {/* Grid: Form (Left) & Saved Product Cards (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: Product Registration Form (5 cols) */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-lg">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-teal-500" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Register New Product
              </h3>
            </div>
            <span className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold">
              Instant HS Lookup
            </span>
          </div>

          <form onSubmit={handleSaveProduct} className="mt-4 space-y-3.5">
            
            {/* Product Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Organic Cashew Nuts W320"
                className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* HS Code with Search button right inside */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  HSN / HS Code (8-digit) *
                </label>
                <button
                  type="button"
                  onClick={() => setIsSearchModalOpen(true)}
                  className="text-[11px] text-teal-600 dark:text-teal-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Search className="w-3 h-3" />
                  <span>Lookup</span>
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={hsCode}
                  onChange={e => setHsCode(e.target.value)}
                  placeholder="e.g. 08013200"
                  className="flex-1 px-3 py-2 rounded-xl text-xs sm:text-sm font-mono bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                />
                <button
                  type="button"
                  onClick={() => setIsSearchModalOpen(true)}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 border border-slate-300 dark:border-slate-700 shrink-0"
                >
                  Search HS
                </button>
              </div>
            </div>

            {/* Category & Origin */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  placeholder="e.g. Food / Agriculture"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Product Origin
                </label>
                <input
                  type="text"
                  value={origin}
                  onChange={e => setOrigin(e.target.value)}
                  placeholder="e.g. Maharashtra, India"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Product Type (Section 13) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Product Type
              </label>
              <select
                value={type}
                onChange={e => setType(e.target.value as ProductType)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="agriculture">Agriculture Product</option>
                <option value="food">Food</option>
                <option value="electronics">Electronics</option>
                <option value="medicine">Medicine</option>
                <option value="textile">Textiles & Apparel</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Commercial Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Product packaging specs, grade, moisture content..."
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            {/* Quantity, Unit & Value */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={e => setQuantity(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Unit
                </label>
                <select
                  value={unit}
                  onChange={e => setUnit(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="Kilograms (kg)">kg</option>
                  <option value="Pieces (pcs)">pcs</option>
                  <option value="Metric Tonnes (MT)">MT</option>
                  <option value="Boxes / Cartons">boxes</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Value (INR)
                </label>
                <input
                  type="number"
                  value={productValue}
                  onChange={e => setProductValue(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Weight & Dimensions */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Gross Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={e => setWeight(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Packaging Dimensions
                </label>
                <input
                  type="text"
                  value={dimensions}
                  onChange={e => setDimensions(e.target.value)}
                  placeholder="e.g. 120 x 80 x 140 cm"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Action button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 shadow-glow-teal flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Product</span>
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT: Saved Products Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Saved Export Products ({products.length})
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click any product to set as active cargo for packaging, logistics, and shipment planning.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map(prod => (
              <ProductCard
                key={prod.id}
                product={prod}
                isSelected={selectedProduct.id === prod.id}
                onSelect={() => selectProductById(prod.id)}
              />
            ))}
          </div>

          {/* Active Product Highlight banner */}
          <div className="p-4 rounded-xl bg-teal-50/70 dark:bg-navy-850 border border-teal-200 dark:border-teal-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-teal-500 text-white">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                  Currently Active Consignment Product
                </span>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {selectedProduct.name} (HS {selectedProduct.hsCode})
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white dark:bg-navy-900 border border-teal-400 text-teal-700 dark:text-teal-300">
              Readiness: {selectedProduct.readinessScore}%
            </span>
          </div>
        </div>

      </div>

      {/* HS Code Search Modal */}
      <HsCodeSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelect={handleHsCodeSelected}
      />

    </div>
  );
};
