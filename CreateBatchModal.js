import { useState } from 'react';

const CreateBatchModal = ({ onCreateBatch, onClose }) => {
  const [formData, setFormData] = useState({
    batchId: '',
    drug: '',
    manufacturer: '',
    expiryDate: '',
    quantity: '',
    description: ''
  });

  const isFormValid = formData.batchId && formData.drug && formData.manufacturer && formData.quantity;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onCreateBatch({
        ...formData,
        id: formData.batchId,
        status: 'manufacturing',
        fdaApproved: false,
        createdAt: Date.now()
      });
      onClose();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-lumacure-navy/80 backdrop-blur-sm overflow-y-auto h-full w-full z-[60] flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-gradient-to-br from-lumacure-navy/90 to-lumacure-navy-light/90 backdrop-blur-xl border border-lumacure-teal/30 shadow-2xl shadow-lumacure-teal/20 rounded-3xl animate-scaleIn">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-lumacure-teal/5 to-lumacure-lavender/5 rounded-3xl"></div>
        
        <div className="relative p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-lumacure-teal to-lumacure-lavender rounded-2xl flex items-center justify-center animate-pulse-glow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-lumacure-pearl">
                Create New Batch
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-heading font-semibold text-lumacure-pearl mb-3">
                  Batch ID *
                </label>
                <input
                  type="text"
                  name="batchId"
                  value={formData.batchId}
                  onChange={handleChange}
                  placeholder="e.g., BATCH001"
                  className="w-full bg-lumacure-navy/50 border border-lumacure-teal/30 rounded-2xl px-4 py-3 text-lumacure-pearl placeholder-lumacure-pearl/40 focus:outline-none focus:ring-2 focus:ring-lumacure-teal focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-heading font-semibold text-lumacure-pearl mb-3">
                  Quantity *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g., 1000"
                  className="w-full bg-lumacure-navy/50 border border-lumacure-teal/30 rounded-2xl px-4 py-3 text-lumacure-pearl placeholder-lumacure-pearl/40 focus:outline-none focus:ring-2 focus:ring-lumacure-teal focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-heading font-semibold text-lumacure-pearl mb-3">
                Drug Name *
              </label>
              <input
                type="text"
                name="drug"
                value={formData.drug}
                onChange={handleChange}
                placeholder="e.g., Insulin, Antibiotics, Vaccines"
                className="w-full bg-lumacure-navy/50 border border-lumacure-teal/30 rounded-2xl px-4 py-3 text-lumacure-pearl placeholder-lumacure-pearl/40 focus:outline-none focus:ring-2 focus:ring-lumacure-teal focus:border-transparent backdrop-blur-sm transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-heading font-semibold text-lumacure-pearl mb-3">
                Manufacturer *
              </label>
              <input
                type="text"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                placeholder="e.g., PharmaCorp, MediLab, BioTech"
                className="w-full bg-lumacure-navy/50 border border-lumacure-teal/30 rounded-2xl px-4 py-3 text-lumacure-pearl placeholder-lumacure-pearl/40 focus:outline-none focus:ring-2 focus:ring-lumacure-teal focus:border-transparent backdrop-blur-sm transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-heading font-semibold text-lumacure-pearl mb-3">
                Expiry Date
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full bg-lumacure-navy/50 border border-lumacure-teal/30 rounded-2xl px-4 py-3 text-lumacure-pearl focus:outline-none focus:ring-2 focus:ring-lumacure-teal focus:border-transparent backdrop-blur-sm transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-heading font-semibold text-lumacure-pearl mb-3">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Additional batch information..."
                rows={3}
                className="w-full bg-lumacure-navy/50 border border-lumacure-teal/30 rounded-2xl px-4 py-3 text-lumacure-pearl placeholder-lumacure-pearl/40 focus:outline-none focus:ring-2 focus:ring-lumacure-teal focus:border-transparent backdrop-blur-sm transition-all duration-200 resize-none"
              />
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
                    <span className="font-heading font-semibold text-lumacure-teal">Batch Creation:</span> This batch will be added to the manufacturing queue and will be available for transfer initiation once created.
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
                  <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${formData.drug ? 'bg-lumacure-teal' : 'bg-lumacure-pearl/20'}`}></div>
                  <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${formData.manufacturer ? 'bg-lumacure-teal' : 'bg-lumacure-pearl/20'}`}></div>
                  <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${formData.quantity ? 'bg-lumacure-teal' : 'bg-lumacure-pearl/20'}`}></div>
                </div>
                <span className={`text-xs font-heading font-semibold transition-colors duration-200 ${
                  isFormValid ? 'text-lumacure-teal' : 'text-lumacure-pearl/40'
                }`}>
                  {isFormValid ? 'Ready' : `${Object.values(formData).filter(Boolean).length}/4`}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Create Batch</span>
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

export default CreateBatchModal;