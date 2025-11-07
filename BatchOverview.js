import React from 'react';

const BatchOverview = ({ batches, userRole, onBatchAction }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'manufacturing':
        return 'bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 text-yellow-300 border border-yellow-400/30';
      case 'in_transit':
        return 'bg-gradient-to-r from-lumacure-teal/20 to-lumacure-teal/30 text-lumacure-teal border border-lumacure-teal/40';
      case 'delivered':
        return 'bg-gradient-to-r from-green-400/20 to-green-500/20 text-green-300 border border-green-400/30';
      case 'recalled':
        return 'bg-gradient-to-r from-red-400/20 to-red-500/20 text-red-300 border border-red-400/30';
      default:
        return 'bg-gradient-to-r from-lumacure-pearl/10 to-lumacure-pearl/20 text-lumacure-pearl border border-lumacure-pearl/30';
    }
  };

  const handleBatchAction = async (batchId, action) => {
    if (onBatchAction) {
      await onBatchAction(batchId, action, userRole);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'manufacturing':
        return '🏭';
      case 'in_transit':
        return '🚛';
      case 'delivered':
        return '✅';
      case 'recalled':
        return '⚠️';
      default:
        return '📦';
    }
  };

  const canUserInteract = (batch) => {
    switch (userRole) {
      case 'FDA':
        return !batch.fdaApproved; // FDA can only interact with non-approved batches
      case 'Manufacturer':
        return batch.status === 'manufacturing';
      case 'Distributor':
        return batch.status === 'in_transit';
      case 'Pharmacy':
        return batch.status === 'delivered';
      default:
        return false;
    }
  };

  return (
    <div className="bg-lumacure-navy/40 backdrop-blur-xl shadow-2xl rounded-3xl p-6 border border-lumacure-teal/20 animate-slideInUp">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-lumacure-teal to-lumacure-lavender rounded-2xl flex items-center justify-center">
            <span className="text-white text-sm">📋</span>
          </div>
          <h3 className="text-xl font-heading font-bold text-lumacure-pearl">Batch Overview</h3>
        </div>
        <div className="bg-lumacure-teal/10 px-4 py-2 rounded-full border border-lumacure-teal/30">
          <span className="text-sm font-heading font-semibold text-lumacure-pearl/80">Role: </span>
          <span className="font-heading font-bold text-lumacure-teal">{userRole}</span>
        </div>
      </div>

      <div className="space-y-4">
        {batches.map((batch, index) => (
          <div
            key={batch.id}
            className={`border-2 rounded-2xl p-5 transition-all duration-300 transform hover:scale-[1.02] animate-fadeIn ${
              canUserInteract(batch) 
                ? 'border-lumacure-teal/40 bg-gradient-to-br from-lumacure-teal/5 to-lumacure-lavender/5 shadow-lg shadow-lumacure-teal/10' 
                : 'border-lumacure-pearl/20 bg-gradient-to-br from-lumacure-navy/30 to-lumacure-navy/20'
            }`}
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="text-3xl animate-pulse-glow">
                  {getStatusIcon(batch.status)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-lg font-heading font-bold text-lumacure-pearl">
                      {batch.id}
                    </h4>
                    {batch.fdaApproved && (
                      <div className="flex items-center space-x-1 bg-green-500/20 px-2 py-1 rounded-full border border-green-400/30">
                        <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-heading font-semibold text-green-400">FDA</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-body text-lumacure-pearl/70">
                    {batch.drug}
                  </p>
                </div>
              </div>
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-heading font-semibold ${
                getStatusColor(batch.status)
              }`}>
                {batch.status.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm mb-4">
              <div className="bg-lumacure-navy/30 p-3 rounded-xl border border-lumacure-teal/20">
                <span className="text-lumacure-pearl/60 font-body">Manufacturer:</span>
                <div className="font-heading font-semibold text-lumacure-pearl mt-1">{batch.manufacturer}</div>
              </div>
              <div className="bg-lumacure-navy/30 p-3 rounded-xl border border-lumacure-teal/20">
                <span className="text-lumacure-pearl/60 font-body">Batch ID:</span>
                <div className="font-mono text-lumacure-teal font-semibold mt-1">{batch.id}</div>
              </div>
            </div>

            {canUserInteract(batch) && (
              <div className="mt-4 pt-4 border-t border-lumacure-teal/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-lumacure-teal rounded-full animate-pulse"></div>
                    <span className="text-xs text-lumacure-teal font-heading font-semibold">
                      {userRole === 'FDA' && batch.fdaApproved 
                        ? 'FDA Approved' 
                        : `Available for ${userRole} actions`
                      }
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    {userRole === 'FDA' && !batch.fdaApproved && (
                      <button 
                        onClick={() => handleBatchAction(batch.id, 'approve')}
                        className="text-xs bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white px-4 py-2 rounded-xl font-heading font-semibold shadow-lg shadow-green-400/30 hover:shadow-xl hover:shadow-green-400/50 transform hover:scale-105 transition-all duration-200"
                      >
                        ✓ Approve
                      </button>
                    )}
                    {userRole === 'FDA' && batch.fdaApproved && (
                      <div className="text-xs bg-gradient-to-r from-green-500/20 to-green-400/20 text-green-300 px-4 py-2 rounded-xl font-heading font-semibold border border-green-400/30">
                        ✓ Approved
                      </div>
                    )}
                    {userRole === 'Manufacturer' && batch.status === 'manufacturing' && (
                      <button 
                        onClick={() => handleBatchAction(batch.id, 'ship')}
                        className="text-xs bg-gradient-to-r from-lumacure-teal to-lumacure-teal-light hover:from-lumacure-teal-light hover:to-lumacure-teal text-white px-4 py-2 rounded-xl font-heading font-semibold shadow-lg shadow-lumacure-teal/30 hover:shadow-xl hover:shadow-lumacure-teal/50 transform hover:scale-105 transition-all duration-200"
                      >
                        🚛 Ship
                      </button>
                    )}
                    {userRole === 'Distributor' && batch.status === 'in_transit' && (
                      <button 
                        onClick={() => handleBatchAction(batch.id, 'distribute')}
                        className="text-xs bg-gradient-to-r from-lumacure-lavender to-lumacure-lavender-light hover:from-lumacure-lavender-light hover:to-lumacure-lavender text-white px-4 py-2 rounded-xl font-heading font-semibold shadow-lg shadow-lumacure-lavender/30 hover:shadow-xl hover:shadow-lumacure-lavender/50 transform hover:scale-105 transition-all duration-200"
                      >
                        📦 Distribute
                      </button>
                    )}
                    {userRole === 'Pharmacy' && batch.status === 'delivered' && (
                      <button 
                        onClick={() => handleBatchAction(batch.id, 'dispense')}
                        className="text-xs bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-white px-4 py-2 rounded-xl font-heading font-semibold shadow-lg shadow-yellow-400/30 hover:shadow-xl hover:shadow-yellow-400/50 transform hover:scale-105 transition-all duration-200"
                      >
                        💊 Dispense
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {batches.length === 0 && (
        <div className="text-center py-12 text-lumacure-pearl/60">
          <div className="text-6xl mb-4 animate-float">✅</div>
          <p className="font-body text-lg">All batches completed!</p>
          <p className="font-body text-sm mt-2">Batches are removed from tracking once they are dispensed by pharmacies. Initiate new transfers to continue monitoring.</p>
        </div>
      )}
    </div>
  );
};

export default BatchOverview;