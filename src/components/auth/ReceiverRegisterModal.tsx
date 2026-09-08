import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Building2, Upload, CheckCircle2, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface ReceiverRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReceiverRegisterModal: React.FC<ReceiverRegisterModalProps> = ({ isOpen, onClose }) => {
  const { register, updateBusinessProfile } = useApp();

  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');
  const [businessType, setBusinessType] = useState('Import Wholesaler & Food Distributor');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!businessName.trim()) {
      setError('Please enter your buyer company or business name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid business email.');
      return;
    }
    if (!contactNumber.trim()) {
      setError('Please enter your contact phone number.');
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

    setIsSubmitting(true);
    try {
      await register({
        email: email.trim(),
        username: username.trim(),
        password,
        role: 'receiver',
        tradeType: 'international',
        businessName: businessName.trim()
      });

      await updateBusinessProfile({
        businessName: businessName.trim(),
        location: location.trim() || 'Global',
        businessType,
        phone: contactNumber.trim(),
        email: email.trim(),
        username: username.trim()
      });

      onClose();
    } catch (err: any) {
      setError(err?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-navy-850">
          <div>
            <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
              Receiver / Buyer Portal Setup
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Register as Receiver (Importer / Buyer)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Buyer / Company Name *
              </label>
              <input
                type="text"
                required
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
                placeholder="e.g. Bavaria Bio-Foods GmbH"
                className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
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
                placeholder="e.g. import@bavariabio.de"
                className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Destination Location & Country
              </label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. Munich, Bavaria, Germany"
                className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Contact Phone Number *
              </label>
              <input
                type="tel"
                required
                value={contactNumber}
                onChange={e => setContactNumber(e.target.value)}
                placeholder="e.g. +49 89 2444 8920"
                className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Business Type
              </label>
              <select
                value={businessType}
                onChange={e => setBusinessType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
              >
                <option value="Import Wholesaler & Food Distributor">Import Wholesaler & Food Distributor</option>
                <option value="Retail Chain & Supermarket Buyer">Retail Chain & Supermarket Buyer</option>
                <option value="Industrial Manufacturer">Industrial Manufacturer</option>
                <option value="Trading House / Broker">Trading House / Broker</option>
              </select>
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
                placeholder="e.g. bavaria_buyer"
                className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
              />
            </div>
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
                  className="w-full pl-3 pr-10 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
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
                  className="w-full pl-3 pr-10 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
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

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-glow-blue flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Registering...' : 'Complete Registration & Open Receiver Portal'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
