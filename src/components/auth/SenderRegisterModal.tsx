import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductType } from '../../types/export';
import { categorizationService } from '../../services/categorizationService';
import {
  X,
  Building2,
  Package,
  FileCheck,
  Upload,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';

interface SenderRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SenderRegisterModal: React.FC<SenderRegisterModalProps> = ({ isOpen, onClose }) => {
  const { register, updateBusinessProfile, addProduct, updateDocumentStatus } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1: Business Information
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');
  const [businessType, setBusinessType] = useState('Private Limited (MSME Registered)');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [exportExperience, setExportExperience] = useState('First-Time Exporter (Tier-2 MSME)');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Step 2: Product Information
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productOrigin, setProductOrigin] = useState('');
  const [productType, setProductType] = useState<ProductType>('food');
  const [hsCode, setHsCode] = useState('');

  // Step 3: Business Documents & upload statuses
  const [uploadedDocs, setUploadedDocs] = useState<{
    coReg: boolean;
    pan: boolean;
    gstin: boolean;
    iec: boolean;
  }>({
    coReg: false,
    pan: false,
    gstin: false,
    iec: false
  });

  if (!isOpen) return null;

  const handleProductNameChange = (val: string) => {
    setProductName(val);
    if (val.trim().length >= 2) {
      const detected = categorizationService.detectCategory(val);
      if (detected) {
        setProductCategory(detected.category);
        setProductType(detected.type);
        if (detected.suggestedHs && !hsCode) {
          setHsCode(detected.suggestedHs);
        }
      }
    }
  };

  const handleNext = async () => {
    setError(null);

    if (step === 1) {
      if (!businessName.trim()) {
        setError('Please enter your business or legal enterprise name.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setError('Please enter a valid business email address.');
        return;
      }
      if (!contactNumber.trim()) {
        setError('Please enter your mobile or WhatsApp contact number.');
        return;
      }
      if (!username.trim()) {
        setError('Please choose a username for login.');
        return;
      }
      if (!password || password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match. Please re-type identical passwords.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      // Step 3 completed: Finalize real user registration
      setIsSubmitting(true);
      try {
        await register({
          email: email.trim(),
          username: username.trim(),
          password,
          role: 'sender',
          tradeType: 'international',
          businessName: businessName.trim()
        });

        await updateBusinessProfile({
          businessName: businessName.trim(),
          location: location.trim() || 'India',
          businessType,
          phone: contactNumber.trim(),
          exportExperience,
          email: email.trim(),
          username: username.trim()
        });

        if (productName.trim()) {
          await addProduct({
            name: productName.trim(),
            category: productCategory.trim() || 'General Goods',
            origin: productOrigin.trim() || 'India',
            type: productType,
            hsCode: hsCode.trim() || '00000000',
            description: `${productName.trim()} ready for export`,
            quantity: 100,
            unit: 'Units',
            weight: 100,
            dimensions: 'Standard Export Crate',
            productValue: 100000,
            certificationsNeeded: ['Certificate of Origin']
          });
        }

        if (uploadedDocs.iec) {
          await updateDocumentStatus('doc-iec', 'available', 'IEC_Registration_Copy.pdf');
        }
        if (uploadedDocs.coReg) {
          await updateDocumentStatus('doc-co-reg', 'available', 'Company_Registration.pdf');
        }
        if (uploadedDocs.gstin) {
          await updateDocumentStatus('doc-gst', 'available', 'GSTIN_Registration.pdf');
        }
        if (uploadedDocs.pan) {
          await updateDocumentStatus('doc-pan', 'available', 'PAN_Card.pdf');
        }

        onClose();
      } catch (err: any) {
        setError(err?.message || 'Registration failed. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const toggleUpload = (key: 'coReg' | 'pan' | 'gstin' | 'iec') => {
    setUploadedDocs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-navy-850">
          <div>
            <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              Step {step} of 3 — Exporter Setup
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Register as Sender (Indian Exporter)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="px-6 pt-4">
          <div className="grid grid-cols-3 gap-2">
            <div className={`h-1.5 rounded-full transition-all ${step >= 1 ? 'bg-teal-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
            <div className={`h-1.5 rounded-full transition-all ${step >= 2 ? 'bg-teal-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
            <div className={`h-1.5 rounded-full transition-all ${step >= 3 ? 'bg-teal-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
          </div>
          <div className="flex justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-2">
            <span className={step === 1 ? 'text-teal-600 dark:text-teal-400 font-bold' : ''}>1. Business Info</span>
            <span className={step === 2 ? 'text-teal-600 dark:text-teal-400 font-bold' : ''}>2. Product Info</span>
            <span className={step === 3 ? 'text-teal-600 dark:text-teal-400 font-bold' : ''}>3. Business Documents</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          
          {/* Error notification banner */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: Business Information */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Registered Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    placeholder="e.g. Acme Agro Exports Pvt Ltd"
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Business Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="e.g. exports@acmeagro.in"
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Location / City & State
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="e.g. Pune, Maharashtra, India"
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Contact Number (Mobile / WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactNumber}
                    onChange={e => setContactNumber(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Business Entity Type
                  </label>
                  <select
                    value={businessType}
                    onChange={e => setBusinessType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="Private Limited (MSME Registered)">Private Limited (MSME Registered)</option>
                    <option value="Partnership / LLP">Partnership / LLP</option>
                    <option value="Sole Proprietorship">Sole Proprietorship</option>
                    <option value="Farmer Producer Organisation (FPO)">Farmer Producer Organisation (FPO)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Current Export Experience
                  </label>
                  <select
                    value={exportExperience}
                    onChange={e => setExportExperience(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="First-Time Exporter (Tier-2 MSME)">First-Time Exporter (Tier-2 / Tier-3 MSME, No prior export)</option>
                    <option value="Novice (1 to 3 shipments done)">Novice (1 to 3 shipments completed)</option>
                    <option value="Regular Exporter (Frequent consignments)">Regular Exporter (Active shipments)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Desired Username *
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="e.g. acme_export"
                  className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full pl-3 pr-10 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Re-type password"
                      className="w-full pl-3 pr-10 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Product Information */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Primary Product Name (Auto-detects category)
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={e => handleProductNameChange(e.target.value)}
                    placeholder="e.g. Organic Cashews / Basmati Rice / Cotton Shirt"
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Product Category
                  </label>
                  <input
                    type="text"
                    value={productCategory}
                    onChange={e => setProductCategory(e.target.value)}
                    placeholder="e.g. Food / Spices / Garments"
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Product Origin (State / Region in India)
                </label>
                <input
                  type="text"
                  value={productOrigin}
                  onChange={e => setProductOrigin(e.target.value)}
                  placeholder="e.g. Palghar & Konkan, Maharashtra"
                  className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* Product Type Options (Section 5 requirement) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Select Product Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'agriculture', label: 'Agriculture Product', icon: '🌾' },
                    { id: 'food', label: 'Food', icon: '🍲' },
                    { id: 'electronics', label: 'Electronics', icon: '⚡' },
                    { id: 'medicine', label: 'Medicine', icon: '💊' }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setProductType(item.id as ProductType)}
                      className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                        productType === item.id
                          ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/50 text-teal-800 dark:text-teal-200 font-bold ring-2 ring-teal-500/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-xs">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  HSN / HS Code (Optional, can search later)
                </label>
                <input
                  type="text"
                  value={hsCode}
                  onChange={e => setHsCode(e.target.value)}
                  placeholder="e.g. 08013200"
                  className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Business Documents with Instant Status */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs text-teal-800 dark:text-teal-300">
                <span className="font-bold">Instant Document Verification:</span> Upload your statutory Indian export certificates. Status updates immediately upon selection.
              </div>

              <div className="space-y-3">
                
                {/* Company Registration */}
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-navy-850 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      Company Registration Certificate (RoC / Udyam)
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Proof of business incorporation in India
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {uploadedDocs.coReg ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Uploaded</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => toggleUpload('coReg')}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-navy-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* PAN */}
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-navy-850 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      Permanent Account Number (PAN Card)
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Required for linking GST and ICEGATE customs profile
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {uploadedDocs.pan ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Uploaded</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => toggleUpload('pan')}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-navy-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* GSTIN */}
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-navy-850 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      GSTIN Registration Certificate
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      For zero-rated export clearance under LUT
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {uploadedDocs.gstin ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Uploaded</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => toggleUpload('gstin')}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-navy-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* IEC (Importer Exporter Code) */}
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-navy-850 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <span>Importer Exporter Code (IEC)</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold">
                        Mandatory
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      10-digit DGFT license code. Can leave pending to use AI Document Agent!
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {uploadedDocs.iec ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Uploaded</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => toggleUpload('iec')}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-500 text-white hover:bg-teal-600 flex items-center gap-1.5 shadow-sm"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload IEC</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-navy-850 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(prev => (prev - 1) as any)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-800 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 shadow-glow-teal flex items-center gap-1.5 transition-all"
          >
            <span>{step === 3 ? 'Complete Registration & Open Dashboard' : 'Continue to Next Step'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
