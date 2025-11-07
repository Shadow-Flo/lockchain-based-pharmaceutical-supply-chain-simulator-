import React from 'react';
import IoTCharts from './IoTCharts';
import BlockchainLog from './BlockchainLog';
import BatchOverview from './BatchOverview';

const Dashboard = ({ iotData, blockchain, batches, userRole, onBatchAction, onCoolerControl }) => {
  // Get only batches that have blockchain activity and are not dispensed
  const getTrackedBatches = () => {
    const trackedBatchIds = new Set();
    
    // Get all batch IDs that have blockchain transactions
    blockchain.forEach(block => {
      if (block.data.batchId) {
        trackedBatchIds.add(block.data.batchId);
      }
    });
    
    // Filter batches to only include those with blockchain activity and not dispensed
    return batches.filter(batch => 
      trackedBatchIds.has(batch.id) && batch.status !== 'dispensed'
    );
  };

  const trackedBatches = getTrackedBatches();
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="relative group bg-lumacure-navy/40 backdrop-blur-xl overflow-hidden shadow-2xl rounded-3xl border border-lumacure-teal/20 hover:border-lumacure-teal/40 hover:shadow-lumacure-teal/20 transition-all duration-500 transform hover:scale-105 animate-fadeIn">
          <div className="absolute inset-0 bg-gradient-to-br from-lumacure-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="relative w-14 h-14 bg-gradient-to-r from-lumacure-teal to-lumacure-lavender rounded-2xl flex items-center justify-center animate-pulse-glow shadow-lg shadow-lumacure-teal/30">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <div className="absolute inset-0 bg-lumacure-teal rounded-2xl animate-ping opacity-20"></div>
                </div>
              </div>
              <div className="flex-1">
                <dt className="text-sm font-heading font-semibold text-lumacure-pearl/80 truncate mb-1">
                  Tracked Batches
                </dt>
                <dd className="text-3xl font-heading font-bold text-lumacure-teal animate-pulse">
                  {trackedBatches.length}
                </dd>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group bg-lumacure-navy/40 backdrop-blur-xl overflow-hidden shadow-2xl rounded-3xl border border-lumacure-lavender/20 hover:border-lumacure-lavender/40 hover:shadow-lumacure-lavender/20 transition-all duration-500 transform hover:scale-105 animate-fadeIn" style={{animationDelay: '0.1s'}}>
          <div className="absolute inset-0 bg-gradient-to-br from-lumacure-lavender/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="relative w-14 h-14 bg-gradient-to-r from-lumacure-lavender to-lumacure-teal rounded-2xl flex items-center justify-center animate-pulse-glow shadow-lg shadow-lumacure-lavender/30">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  <div className="absolute inset-0 bg-lumacure-lavender rounded-2xl animate-ping opacity-20"></div>
                </div>
              </div>
              <div className="flex-1">
                <dt className="text-sm font-heading font-semibold text-lumacure-pearl/80 truncate mb-1">
                  Transactions
                </dt>
                <dd className="text-3xl font-heading font-bold text-lumacure-lavender animate-pulse">
                  {blockchain.length - 1}
                </dd>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group bg-lumacure-navy/40 backdrop-blur-xl overflow-hidden shadow-2xl rounded-3xl border border-yellow-400/20 hover:border-yellow-400/40 hover:shadow-yellow-400/20 transition-all duration-500 transform hover:scale-105 animate-fadeIn" style={{animationDelay: '0.2s'}}>
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="relative w-14 h-14 bg-gradient-to-r from-yellow-400 to-lumacure-teal rounded-2xl flex items-center justify-center animate-pulse-glow shadow-lg shadow-yellow-400/30">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <div className="absolute inset-0 bg-yellow-400 rounded-2xl animate-ping opacity-20"></div>
                </div>
              </div>
              <div className="flex-1">
                <dt className="text-sm font-heading font-semibold text-lumacure-pearl/80 truncate mb-1">
                  Active Sensors
                </dt>
                <dd className="text-3xl font-heading font-bold text-yellow-400 animate-pulse">
                  {iotData.length}
                </dd>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group bg-lumacure-navy/40 backdrop-blur-xl overflow-hidden shadow-2xl rounded-3xl border border-red-400/20 hover:border-red-400/40 hover:shadow-red-400/20 transition-all duration-500 transform hover:scale-105 animate-fadeIn" style={{animationDelay: '0.3s'}}>
          <div className="absolute inset-0 bg-gradient-to-br from-red-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="relative w-14 h-14 bg-gradient-to-r from-red-500 to-red-400 rounded-2xl flex items-center justify-center animate-pulse-glow shadow-lg shadow-red-400/30">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                  </svg>
                  <div className="absolute inset-0 bg-red-400 rounded-2xl animate-ping opacity-20"></div>
                </div>
              </div>
              <div className="flex-1">
                <dt className="text-sm font-heading font-semibold text-lumacure-pearl/80 truncate mb-1">
                  Active Alerts
                </dt>
                <dd className="text-3xl font-heading font-bold text-red-400 animate-pulse">
                  {iotData.reduce((acc, data) => acc + (data.alerts?.length || 0), 0)}
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <IoTCharts iotData={iotData} onCoolerControl={onCoolerControl} />
          <BatchOverview batches={trackedBatches} userRole={userRole} onBatchAction={onBatchAction} />
        </div>
        <div>
          <BlockchainLog blockchain={blockchain} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;