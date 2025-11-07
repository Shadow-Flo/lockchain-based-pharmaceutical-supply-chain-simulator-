import React from 'react';

const BlockchainLog = ({ blockchain }) => {
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'genesis':
        return '🏗️';
      case 'transfer':
        return '📦';
      case 'approve':
        return '✅';
      case 'ship':
        return '🚛';
      case 'distribute':
        return '📋';
      case 'dispense':
        return '💊';
      case 'manufacture':
        return '🏭';
      default:
        return '📄';
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'genesis':
        return 'bg-lumacure-pearl/10 text-lumacure-pearl border border-lumacure-pearl/30';
      case 'transfer':
        return 'bg-lumacure-teal/20 text-lumacure-teal border border-lumacure-teal/40';
      case 'approve':
        return 'bg-green-500/20 text-green-400 border border-green-400/40';
      case 'ship':
        return 'bg-lumacure-lavender/20 text-lumacure-lavender border border-lumacure-lavender/40';
      case 'distribute':
        return 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/40';
      case 'dispense':
        return 'bg-purple-500/20 text-purple-400 border border-purple-400/40';
      default:
        return 'bg-lumacure-pearl/10 text-lumacure-pearl border border-lumacure-pearl/30';
    }
  };

  return (
    <div className="bg-lumacure-navy/40 backdrop-blur-xl shadow-2xl rounded-3xl p-6 border border-lumacure-lavender/20 animate-slideInRight">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-lumacure-lavender to-lumacure-teal rounded-2xl flex items-center justify-center animate-pulse-glow">
            <span className="text-white text-sm">🔗</span>
          </div>
          <h3 className="text-xl font-heading font-bold text-lumacure-pearl">Blockchain Transaction Log</h3>
        </div>
        <div className="flex items-center space-x-2 bg-lumacure-teal/10 px-4 py-2 rounded-full border border-lumacure-teal/30">
          <div className="w-3 h-3 bg-lumacure-teal rounded-full animate-pulse"></div>
          <span className="text-sm font-heading font-semibold text-lumacure-teal">Chain Valid</span>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {blockchain.slice().reverse().map((block, index) => (
          <div key={block.hash} className="border-2 border-lumacure-teal/20 rounded-2xl p-5 bg-gradient-to-br from-lumacure-navy/30 to-lumacure-navy/20 backdrop-blur-sm hover:shadow-lg hover:shadow-lumacure-teal/20 transition-all duration-300 transform hover:scale-[1.02] animate-scaleIn" style={{animationDelay: `${index * 0.1}s`}}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="text-3xl animate-pulse-glow">
                  {getTransactionIcon(block.data.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-heading font-semibold ${
                      getTransactionColor(block.data.type)
                    }`}>
                      {block.data.type}
                    </span>
                    <span className="text-sm text-lumacure-pearl/60 font-body">
                      Block #{blockchain.length - index - 1}
                    </span>
                  </div>
                  
                  {(block.data.type === 'transfer' || block.data.type === 'ship' || block.data.type === 'distribute' || block.data.type === 'dispense' || block.data.type === 'approve') && (
                    <div className="space-y-2 text-sm">
                      <div className="text-lumacure-pearl font-body">
                        <span className="text-lumacure-pearl/60">Batch:</span> 
                        <span className="font-heading font-semibold text-lumacure-teal ml-1">{block.data.batchId}</span>
                      </div>
                      {block.data.from && (
                        <div className="text-lumacure-pearl font-body">
                          <span className="text-lumacure-pearl/60">From:</span> 
                          <span className="ml-1">{block.data.from}</span>
                        </div>
                      )}
                      {block.data.to && (
                        <div className="text-lumacure-pearl font-body">
                          <span className="text-lumacure-pearl/60">To:</span> 
                          <span className="ml-1">{block.data.to}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <span className="text-lumacure-pearl/60 font-body">Role:</span> 
                        <span className="font-heading font-semibold text-lumacure-pearl">{block.data.userRole}</span>
                        {block.data.type === 'approve' && (
                          <div className="flex items-center space-x-1 bg-green-500/20 px-2 py-1 rounded-full border border-green-400/30">
                            <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs font-heading font-semibold text-green-400">APPROVED</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {block.data.type === 'genesis' && (
                    <div className="text-sm text-lumacure-pearl/70 font-body">
                      {block.data.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right text-xs text-lumacure-pearl/60">
                <div className="font-body">{formatTimestamp(block.timestamp)}</div>
                <div className="mt-1 font-mono text-xs text-lumacure-pearl/40">
                  {block.hash.substring(0, 8)}...
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-lumacure-teal/20">
              <div className="grid grid-cols-2 gap-4 text-xs text-lumacure-pearl/50">
                <div>
                  <span className="font-heading font-medium">Previous Hash:</span>
                  <div className="font-mono mt-1 break-all text-lumacure-pearl/40">
                    {block.previousHash.substring(0, 16)}...
                  </div>
                </div>
                <div>
                  <span className="font-heading font-medium">Current Hash:</span>
                  <div className="font-mono mt-1 break-all text-lumacure-teal/80">
                    {block.hash.substring(0, 16)}...
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {blockchain.length === 1 && (
        <div className="text-center py-12 text-lumacure-pearl/60">
          <div className="text-6xl mb-4 animate-float">📋</div>
          <p className="font-body text-lg">No transactions yet.</p>
          <p className="font-body text-sm mt-2">Blockchain transactions will appear here once you initiate transfers or actions.</p>
        </div>
      )}
    </div>
  );
};

export default BlockchainLog;