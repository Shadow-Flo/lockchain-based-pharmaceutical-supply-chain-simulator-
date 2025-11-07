import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Dashboard from './components/Dashboard';
import UserRoleSelector from './components/UserRoleSelector';
import TransferModal from './components/TransferModal';
import CreateBatchModal from './components/CreateBatchModal';
import AlertSystem from './components/AlertSystem';

const socket = io('http://localhost:3001');

function App() {
  const [userRole, setUserRole] = useState('FDA');
  const [iotData, setIotData] = useState([]);
  const [blockchain, setBlockchain] = useState([]);
  const [batches, setBatches] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showCreateBatchModal, setShowCreateBatchModal] = useState(false);
  const [hasTransfers, setHasTransfers] = useState(false);
  const [processedAlerts, setProcessedAlerts] = useState(new Set()); // eslint-disable-line no-unused-vars

  useEffect(() => {
    socket.on('iot_data', (data) => {
      setIotData(data);
    });

    socket.on('blockchain_update', (chain) => {
      setBlockchain(chain);
      // Check if there are any non-genesis blocks (actual transfers/actions)
      const hasActualTransactions = chain.length > 1;
      setHasTransfers(hasActualTransactions);
    });

    socket.on('batches_update', (batchData) => {
      setBatches(batchData);
    });

    socket.on('alert', (alert) => {
      // Only add temperature alerts from server, ignore others to prevent duplicates
      if (alert.type === 'warning' && alert.message.includes('Temperature')) {
        const alertKey = `${alert.data?.batchId}-${alert.message}`;
        setProcessedAlerts(prev => {
          if (!prev.has(alertKey)) {
            const newSet = new Set(prev);
            newSet.add(alertKey);
            setAlerts(prevAlerts => [...prevAlerts, { ...alert, id: Date.now() }]);
            return newSet;
          }
          return prev;
        });
      }
    });

    return () => {
      socket.off('iot_data');
      socket.off('blockchain_update');
      socket.off('batches_update');
      socket.off('alert');
    };
  }, []);

  const handleTransfer = async (transferData) => {
    try {
      const response = await fetch('/api/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...transferData, userRole }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setHasTransfers(true);
        addUniqueAlert({
          type: 'success',
          message: `Transfer initiated successfully for ${transferData.batchId}`
        });
      } else {
        addUniqueAlert({
          type: 'error',
          message: result.error
        });
      }
    } catch (error) {
      console.error('Transfer failed:', error);
      addUniqueAlert({
        type: 'error',
        message: 'Network error: Failed to initiate transfer'
      });
    }
  };

  const removeAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const addUniqueAlert = (newAlert) => {
    const alertKey = `${newAlert.type}-${newAlert.message}`;
    setProcessedAlerts(prev => {
      if (!prev.has(alertKey)) {
        const newSet = new Set(prev);
        newSet.add(alertKey);
        setAlerts(prevAlerts => [...prevAlerts, { ...newAlert, id: Date.now() }]);
        return newSet;
      }
      return prev;
    });
  };

  const handleCoolerControl = async (batchId, action) => {
    try {
      const response = await fetch('/api/cooler-control', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ batchId, action }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        addUniqueAlert({
          type: 'success',
          message: action === 'activate' 
            ? `Cooler activated for ${batchId}. Temperature regulation in progress.`
            : `Cooler deactivated for ${batchId}.`
        });
      } else {
        addUniqueAlert({
          type: 'error',
          message: result.error || `Failed to ${action} cooler for ${batchId}`
        });
      }
    } catch (error) {
      console.error('Cooler control failed:', error);
      addUniqueAlert({
        type: 'error',
        message: `Network error: Failed to control cooler for ${batchId}`
      });
    }
  };

  const handleCreateBatch = async (batchData) => {
    try {
      const response = await fetch('/api/create-batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(batchData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setBatches(prev => [...prev, result.batch]);
        addUniqueAlert({
          type: 'success',
          message: `Batch ${batchData.batchId} created successfully`
        });
      } else {
        addUniqueAlert({
          type: 'error',
          message: result.error || 'Failed to create batch'
        });
      }
    } catch (error) {
      console.error('Batch creation failed:', error);
      addUniqueAlert({
        type: 'error',
        message: 'Network error: Failed to create batch'
      });
    }
  };

  const handleBatchAction = async (batchId, action, userRole) => {
    try {
      const response = await fetch('/api/batch-action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ batchId, action, userRole }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setHasTransfers(true);
        
        // Special message for dispensing (end of supply chain)
        const message = action === 'dispense' 
          ? `🎉 Supply chain completed! ${batchId} has been dispensed and removed from tracking.`
          : `${action} completed successfully for ${batchId}`;
        
        addUniqueAlert({
          type: 'success',
          message
        });
        
        // Update batch status and FDA approval locally
        setBatches(prev => prev.map(batch => 
          batch.id === batchId ? { 
            ...batch, 
            status: result.newStatus,
            fdaApproved: result.fdaApproved !== undefined ? result.fdaApproved : batch.fdaApproved
          } : batch
        ));
      } else {
        addUniqueAlert({
          type: 'error',
          message: result.error || `Failed to ${action} batch ${batchId}`
        });
      }
    } catch (error) {
      console.error('Batch action failed:', error);
      addUniqueAlert({
        type: 'error',
        message: `Network error: Failed to ${action} batch ${batchId}`
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-900 via-lumacure-navy to-secondary-800 relative overflow-hidden">
      {/* Animated background network pattern */}
      <div className="fixed inset-0 bg-network-pattern opacity-20"></div>
      
      {/* Floating luminous particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-lumacure-teal rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-lumacure-lavender rounded-full animate-float opacity-80" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-lumacure-teal rounded-full animate-float opacity-40" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-20 w-2 h-2 bg-lumacure-lavender rounded-full animate-float opacity-70" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-lumacure-teal rounded-full animate-float opacity-90" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Glowing orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-lumacure-teal/5 rounded-full animate-pulse-glow"></div>
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-lumacure-lavender/5 rounded-full animate-pulse-glow" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-lumacure-teal/5 rounded-full animate-pulse-glow" style={{animationDelay: '2s'}}></div>
      </div>

      <header className="relative bg-lumacure-navy/80 backdrop-blur-xl border-b border-lumacure-teal/20 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-lumacure-navy/90 to-lumacure-navy-light/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-lumacure-teal to-lumacure-lavender rounded-2xl flex items-center justify-center animate-pulse-glow shadow-lg shadow-lumacure-teal/30">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-lumacure-teal to-lumacure-lavender rounded-2xl blur opacity-30 animate-pulse"></div>
                  </div>
                  <div>
                    <h1 className="text-4xl font-heading font-bold bg-gradient-to-r from-lumacure-teal via-white to-lumacure-lavender bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                      LunaCure
                    </h1>
                    <p className="text-lumacure-pearl/80 font-body text-sm font-medium tracking-wide">
                      Illuminating Pharmaceutical Supply Chain Security
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <UserRoleSelector 
                currentRole={userRole} 
                onRoleChange={setUserRole} 
              />
              <button
                onClick={() => setShowCreateBatchModal(true)}
                className="relative group bg-gradient-to-r from-lumacure-lavender to-lumacure-teal hover:from-lumacure-lavender-light hover:to-lumacure-teal-light text-white px-6 py-3 rounded-2xl font-heading font-semibold shadow-lg shadow-lumacure-lavender/30 hover:shadow-xl hover:shadow-lumacure-lavender/50 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="relative z-10">New Batch</span>
              </button>
              <button
                onClick={() => setShowTransferModal(true)}
                className="relative group bg-gradient-to-r from-lumacure-teal to-lumacure-lavender hover:from-lumacure-teal-light hover:to-lumacure-lavender-light text-white px-8 py-3 rounded-2xl font-heading font-semibold shadow-lg shadow-lumacure-teal/30 hover:shadow-xl hover:shadow-lumacure-teal/50 transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <span className="relative z-10">Initiate Transfer</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto py-8 sm:px-6 lg:px-8 z-10">
        <div className="animate-fadeIn">
          {hasTransfers ? (
            <Dashboard 
              iotData={iotData}
              blockchain={blockchain}
              batches={batches}
              userRole={userRole}
              onBatchAction={handleBatchAction}
              onCoolerControl={handleCoolerControl}
            />
          ) : (
            <div className="text-center py-20">
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-r from-lumacure-teal/20 to-lumacure-lavender/20 rounded-full mx-auto flex items-center justify-center animate-pulse-glow">
                  <svg className="w-16 h-16 text-lumacure-teal/60" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                  </svg>
                </div>
                <div className="absolute -top-4 -right-4 w-6 h-6 bg-lumacure-teal rounded-full animate-ping opacity-40"></div>
                <div className="absolute -bottom-4 -left-4 w-4 h-4 bg-lumacure-lavender rounded-full animate-ping opacity-60" style={{animationDelay: '1s'}}></div>
              </div>
              <h2 className="text-3xl font-heading font-bold text-lumacure-pearl mb-4">
                Welcome to LunaCure
              </h2>
              <p className="text-lg text-lumacure-pearl/80 font-body mb-8 max-w-2xl mx-auto">
                Your pharmaceutical supply chain monitoring system is ready. Initiate your first transfer to begin tracking batches with IoT sensors and blockchain verification.
              </p>
              <div className="bg-lumacure-teal/10 border border-lumacure-teal/30 rounded-2xl p-6 max-w-md mx-auto backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-lumacure-teal to-lumacure-lavender rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">💡</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lumacure-pearl">Getting Started</h3>
                </div>
                <p className="text-sm text-lumacure-pearl/70 font-body text-left">
                  Click the <span className="text-lumacure-teal font-semibold">"Initiate Transfer"</span> button above to start your first pharmaceutical batch transfer and activate the monitoring dashboard.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <AlertSystem alerts={alerts} onRemoveAlert={removeAlert} />

      {showCreateBatchModal && (
        <CreateBatchModal
          onCreateBatch={handleCreateBatch}
          onClose={() => setShowCreateBatchModal(false)}
        />
      )}

      {showTransferModal && (
        <TransferModal
          batches={batches}
          blockchain={blockchain}
          userRole={userRole}
          onTransfer={handleTransfer}
          onClose={() => setShowTransferModal(false)}
        />
      )}
    </div>
  );
}

export default App;