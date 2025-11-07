import React, { useState } from 'react';

const TransferModal = ({ batches, userRole, onTransfer, onClose, blockchain }) => {
  const [formData, setFormData] = useState({
    batchId: '',
    from: '',
    to: ''
  });

  const isFormValid = formData.batchId && formData.from && formData.to && formData.from !== formData.to;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onTransfer(formData);
      onClose();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Get batches that haven't been transferred yet
  const getAvailableBatches = () => {
    if (!blockchain) return batches;
    
    const transferredBatchIds = new Set();
    blockchain.forEach(block => {
      if (block.data.batchId && block.data.type === 'transfer') {
        transferredBatchIds.add(block.data.batchId);
      }
    });
    
    return batches.filter(batch => !transferredBatchIds.has(batch.id));
  };

  const availableBatches = getAvailableBatches();

  const entities = [
    'PharmaCorp Manufacturing',
    'MediLab Production',
    'BioTech Facility',
    'Central Distribution Hub',
    'Regional Warehouse A',
    'Regional Warehouse B',
    'City Pharmacy Network',
    'Hospital Pharmacy',
    'Retail Pharmacy Chain',
    'Emergency Medical Services'
  ];

  return (
    <div className="fixed inset-0 bg-lumacure-navy/80 backdrop-blur-sm overflow-y-auto h-full w-full z-[60] flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-gradient-to-br from-lumacure-navy/90 to-lumacure-navy-light/90 backdrop-blur-xl border border-lumacure-teal/30 shadow-2xl shadow-lumacure-teal/20 rounded-3xl animate-scaleIn">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-lumacure-teal/5 to-lumacure-lavender/5 rounded-3xl"></div>
        
        <div className="relative p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-lumacure-teal to-lumacure-lavender rounded-2xl flex items-center justify-center animate-pulse-glow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-lumacure-pearl">
                Initiate Transfer
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-lumacure-teal/20 transition-all duration-200 group"
            >
              <svg className="w-5 h-5 text-lumacure-pearl/60 group-hover:text-lumacure-teal transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-heading font-semibold text-lumacure-pearl mb-3">
                Pharmaceutical Batch
              </label>
              <select
                name="batchId"
                value={formData.batchId}
                onChange={handleChange}
                className="w-full bg-lumacure-navy/50 border border-lumacure-teal/30 rounded-2xl px-4 py-3 text-lumacure-pearl focus:outline-none focus:ring-2 focus:ring-lumacure-teal focus:border-transparent backdrop-blur-sm transition-all duration-200"
                required
              >
                <option value="" className="bg-lumacure-navy text-lumacure-pearl">
                  {availableBatches.length > 0 ? 'Select a batch' : 'No batches available for transfer'}
                </option>
                {availableBatches.map((batch) => (
                  <option key={batch.id} value={batch.id} className="bg-lumacure-navy text-lumacure-pearl">
                    {batch.id} - {batch.drug}
                  </option>
                ))}
              </select>
              {availableBatches.length === 0 && (
                <p className="text-xs text-lumacure-pearl/60 mt-2">
                  All batches have already been transferred. Use batch actions to continue the supply chain.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-heading font-semibold text-lumacure-pearl mb-3">
                Origin Location
              </label>
              <select
                name="from"
                value={formData.from}
                onChange={handleChange}
                className="w-full bg-lumacure-navy/50 border border-lumacure-teal/30 rounded-2xl px-4 py-3 text-lumacure-pearl focus:outline-none focus:ring-2 focus:ring-lumacure-teal focus:border-transparent backdrop-blur-sm transition-all duration-200"
                required
              >
                <option value="" className="bg-lumacure-navy text-lumacure-pearl">Select origin</option>
                {entities.map((entity) => (
                  <option key={entity} value={entity} className="bg-lumacure-navy text-lumacure-pearl">
                    {entity}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-heading font-semibold text-lumacure-pearl mb-3">
                Destination Location
              </label>
              <select
                name="to"
                value={formData.to}
                onChange={handleChange}
                className="w-full bg-lumacure-navy/50 border border-lumacure-teal/30 rounded-2xl px-4 py-3 text-lumacure-pearl focus:outline-none focus:ring-2 focus:ring-lumacure-teal focus:border-transparent backdrop-blur-sm transition-all duration-200"
                required
              >
                <option value="" className="bg-lumacure-navy text-lumacure-pearl">Select destination</option>
                {entities.map((entity) => (
                  <option key={entity} value={entity} className="bg-lumacure-navy text-lumacure-pearl">
                    {entity}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-lumacure-teal/10 border border-lumacure-teal/30 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-r from-lumacure-teal to-lumacure-lavender rounded-full flex items-center justify-center animate-pulse-glow">
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-body text-lumacure-pearl/90">
                    <span className="font-heading font-semibold text-lumacure-teal">Smart Contract Validation:</span> This transfer will be cryptographically verified against FDA approvals and permanently recorded on the blockchain ledger.
                  </p>
                </div>
              </div>
            </div>

            {/* Form completion indicator */}
            <div className="flex items-center justify-between bg-lumacure-navy/30 rounded-2xl p-4 border border-lumacure-pearl/10">
              <span className="text-sm font-body text-lumacure-pearl/70">Form Completion:</span>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${formData.batchId ? 'bg-lumacure-teal' : 'bg-lumacure-pearl/20'}`}></div>
                  <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${formData.from ? 'bg-lumacure-teal' : 'bg-lumacure-pearl/20'}`}></div>
                  <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${formData.to ? 'bg-lumacure-teal' : 'bg-lumacure-pearl/20'}`}></div>
                </div>
                <span className={`text-xs font-heading font-semibold transition-colors duration-200 ${
                  isFormValid ? 'text-lumacure-teal' : 'text-lumacure-pearl/40'
                }`}>
                  {isFormValid ? 'Ready' : `${Object.values(formData).filter(Boolean).length}/3`}
                </span>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-sm font-heading font-semibold text-lumacure-pearl/80 bg-lumacure-navy/50 hover:bg-lumacure-navy/70 border border-lumacure-pearl/20 hover:border-lumacure-pearl/40 rounded-2xl transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormValid}
                className={`px-8 py-3 text-sm font-heading font-semibold rounded-2xl transition-all duration-200 flex items-center space-x-2 ${
                  isFormValid
                    ? 'text-white bg-gradient-to-r from-lumacure-teal to-lumacure-lavender hover:from-lumacure-teal-light hover:to-lumacure-lavender-light shadow-lg shadow-lumacure-teal/30 hover:shadow-xl hover:shadow-lumacure-teal/50 transform hover:scale-105'
                    : 'text-lumacure-pearl/40 bg-lumacure-navy/30 border border-lumacure-pearl/10 cursor-not-allowed'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Execute Transfer</span>
              </button>
            </div>
          </form>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-lumacure-teal rounded-full animate-ping opacity-30"></div>
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-lumacure-lavender rounded-full animate-ping opacity-40" style={{animationDelay: '1s'}}></div>
      </div>
    </div>
  );
};

export default TransferModal;