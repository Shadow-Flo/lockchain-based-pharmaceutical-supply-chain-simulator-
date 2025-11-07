import { useEffect } from 'react';

const AlertSystem = ({ alerts, onRemoveAlert }) => {
  useEffect(() => {
    const timers = [];

    // Auto-remove non-error alerts after 5 seconds
    alerts.forEach(alert => {
      if (alert.type !== 'error') {
        const timer = setTimeout(() => {
          onRemoveAlert(alert.id);
        }, 5000);
        timers.push(timer);
      }
    });

    // Cleanup function
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [alerts, onRemoveAlert]);

  const getAlertStyles = (type) => {
    const baseStyles = 'border rounded-2xl p-5 shadow-2xl backdrop-blur-xl transition-all duration-300 transform relative overflow-hidden animate-slideInUp hover:scale-105';

    switch (type) {
      case 'success':
        return `${baseStyles} bg-gradient-to-br from-lumacure-teal/10 to-lumacure-teal/5 border-lumacure-teal/30 text-lumacure-pearl shadow-lumacure-teal/20`;
      case 'warning':
        return `${baseStyles} bg-gradient-to-br from-yellow-500/10 to-yellow-400/5 border-yellow-400/30 text-lumacure-pearl shadow-yellow-400/20`;
      case 'error':
        return `${baseStyles} bg-gradient-to-br from-red-500/10 to-red-400/5 border-red-400/30 text-lumacure-pearl shadow-red-400/20`;
      default:
        return `${baseStyles} bg-gradient-to-br from-lumacure-lavender/10 to-lumacure-lavender/5 border-lumacure-lavender/30 text-lumacure-pearl shadow-lumacure-lavender/20`;
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'success':
        return (
          <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-r from-lumacure-teal to-lumacure-teal-light rounded-full animate-pulse-glow shadow-lg shadow-lumacure-teal/40">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div className="absolute inset-0 bg-lumacure-teal rounded-full animate-ping opacity-20"></div>
          </div>
        );
      case 'warning':
        return (
          <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full animate-pulse-glow shadow-lg shadow-yellow-400/40">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-20"></div>
          </div>
        );
      case 'error':
        return (
          <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-r from-red-500 to-red-400 rounded-full animate-pulse-glow shadow-lg shadow-red-400/40">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-20"></div>
          </div>
        );
      default:
        return (
          <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-r from-lumacure-lavender to-lumacure-lavender-light rounded-full animate-pulse-glow shadow-lg shadow-lumacure-lavender/40">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="absolute inset-0 bg-lumacure-lavender rounded-full animate-ping opacity-20"></div>
          </div>
        );
    }
  };

  if (alerts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm">
      <div className="flex flex-col-reverse space-y-reverse space-y-3">
        {alerts.slice().reverse().map((alert, index) => (
          <div
            key={alert.id}
            className={getAlertStyles(alert.type)}
            style={{
              animationDelay: `${index * 0.1}s`,
              zIndex: 50 + index
            }}
          >
            {/* Glow effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-lumacure-teal/5 to-transparent rounded-2xl opacity-50"></div>

            <div className="relative flex items-start space-x-4">
              <div className="flex-shrink-0">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-heading font-semibold leading-tight text-lumacure-pearl">
                      {alert.message}
                    </p>
                    {alert.data && (
                      <div className="mt-3 p-3 bg-lumacure-navy/30 backdrop-blur-sm rounded-xl border border-lumacure-teal/20">
                        <div className="flex items-center space-x-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-heading font-medium bg-gradient-to-r from-lumacure-teal to-lumacure-teal-light text-white shadow-lg shadow-lumacure-teal/30">
                            {alert.data.batchId}
                          </span>
                          <span className="text-lumacure-pearl/70 font-body text-xs flex items-center space-x-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span>{alert.data.location}</span>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      console.log('Removing alert:', alert.id);
                      onRemoveAlert(alert.id);
                    }}
                    className="ml-3 flex-shrink-0 p-2 rounded-full hover:bg-lumacure-teal/20 transition-all duration-200 group relative cursor-pointer"
                    style={{ zIndex: 100 }}
                  >
                    <svg className="w-4 h-4 text-lumacure-pearl/60 group-hover:text-lumacure-teal transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <div className="absolute inset-0 bg-lumacure-teal/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200"></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Progress bar for auto-dismiss */}
            {alert.type !== 'error' && (
              <div className="relative mt-4 w-full bg-lumacure-navy/40 rounded-full h-1 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-lumacure-teal to-lumacure-lavender animate-pulse opacity-60"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-lumacure-teal to-lumacure-lavender animate-shimmer bg-[length:200%_100%] opacity-30"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertSystem;