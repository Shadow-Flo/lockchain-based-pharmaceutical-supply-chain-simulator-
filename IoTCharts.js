import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const IoTCharts = ({ iotData, onCoolerControl }) => {
  const handleCoolerControl = async (batchId, action) => {
    if (onCoolerControl) {
      await onCoolerControl(batchId, action);
    }
  };
  const [historicalData, setHistoricalData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('temperature');

  useEffect(() => {
    if (iotData.length > 0) {
      const timestamp = new Date().toLocaleTimeString();
      const newDataPoint = {
        time: timestamp,
        ...iotData.reduce((acc, sensor) => {
          acc[`${sensor.batchId}_temp`] = sensor.temperature;
          acc[`${sensor.batchId}_humidity`] = sensor.humidity;
          acc[`${sensor.batchId}_pressure`] = sensor.pressure;
          return acc;
        }, {})
      };

      setHistoricalData(prev => {
        const updated = [...prev, newDataPoint];
        return updated.slice(-20); // Keep last 20 data points
      });
    }
  }, [iotData]);

  const getMetricData = () => {
    return historicalData.map(point => {
      const result = { time: point.time };
      iotData.forEach(sensor => {
        const key = `${sensor.batchId}_${selectedMetric === 'temperature' ? 'temp' : selectedMetric}`;
        result[sensor.batchId] = point[key];
      });
      return result;
    });
  };

  const getMetricUnit = () => {
    switch (selectedMetric) {
      case 'temperature': return '°C';
      case 'humidity': return '%';
      case 'pressure': return 'hPa';
      default: return '';
    }
  };

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="bg-lumacure-navy/40 backdrop-blur-xl shadow-2xl rounded-3xl p-6 border border-lumacure-teal/20 animate-slideInLeft">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-lumacure-teal to-lumacure-lavender rounded-2xl flex items-center justify-center animate-pulse-glow">
            <span className="text-white text-sm">📊</span>
          </div>
          <h3 className="text-xl font-heading font-bold text-lumacure-pearl">IoT Sensor Data</h3>
        </div>
        {iotData.length > 0 && (
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="bg-lumacure-navy/50 border border-lumacure-teal/30 rounded-2xl px-4 py-2 text-sm font-heading font-medium text-lumacure-pearl focus:outline-none focus:ring-2 focus:ring-lumacure-teal focus:border-transparent backdrop-blur-sm transition-all duration-200"
          >
            <option value="temperature" className="bg-lumacure-navy text-lumacure-pearl">🌡️ Temperature</option>
            <option value="humidity" className="bg-lumacure-navy text-lumacure-pearl">💧 Humidity</option>
            <option value="pressure" className="bg-lumacure-navy text-lumacure-pearl">📊 Pressure</option>
          </select>
        )}
      </div>

      {iotData.length > 0 ? (
        <>
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getMetricData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#00E6D2" opacity={0.1} />
                <XAxis dataKey="time" stroke="#F5F7FA" fontSize={12} />
                <YAxis label={{ value: getMetricUnit(), angle: -90, position: 'insideLeft' }} stroke="#F5F7FA" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0B1E3F', 
                    border: '1px solid #00E6D2', 
                    borderRadius: '12px',
                    color: '#F5F7FA'
                  }} 
                />
                <Legend />
                {iotData.map((sensor, index) => (
                  <Line
                    key={sensor.batchId}
                    type="monotone"
                    dataKey={sensor.batchId}
                    stroke={colors[index % colors.length]}
                    strokeWidth={3}
                    dot={{ r: 4, fill: colors[index % colors.length] }}
                    activeDot={{ r: 6, stroke: colors[index % colors.length], strokeWidth: 2 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Current Readings */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {iotData.map((sensor, index) => (
              <div key={sensor.batchId} className="border-2 border-lumacure-teal/20 rounded-2xl p-4 bg-gradient-to-br from-lumacure-navy/30 to-lumacure-navy/20 backdrop-blur-sm hover:shadow-lg hover:shadow-lumacure-teal/20 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-heading font-bold text-lumacure-pearl flex items-center space-x-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-lumacure-teal to-lumacure-teal-light text-white shadow-lg shadow-lumacure-teal/30">
                      {sensor.batchId}
                    </span>
                    {sensor.coolerActive && (
                      <div className="flex items-center space-x-1 bg-blue-500/20 px-2 py-1 rounded-full border border-blue-400/30">
                        <svg className="w-3 h-3 text-blue-400 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-heading font-semibold text-blue-400">COOLING</span>
                      </div>
                    )}
                  </h4>
                  <div className={`w-4 h-4 rounded-full animate-pulse-glow ${
                    sensor.alerts?.length > 0 ? 'bg-red-500 shadow-lg shadow-red-400/50' : 'bg-lumacure-teal shadow-lg shadow-lumacure-teal/50'
                  }`}></div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-lumacure-pearl/60 font-body">Temp:</span>
                    <span className={`font-heading font-semibold ${
                      sensor.temperature < 2 || sensor.temperature > 8 ? 'text-red-400' : 'text-lumacure-teal'
                    }`}>
                      {sensor.temperature.toFixed(1)}°C
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lumacure-pearl/60 font-body">Humidity:</span>
                    <span className="font-heading font-semibold text-lumacure-pearl">
                      {sensor.humidity.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lumacure-pearl/60 font-body">Pressure:</span>
                    <span className="font-heading font-semibold text-lumacure-pearl">
                      {sensor.pressure.toFixed(1)} hPa
                    </span>
                  </div>
                </div>
                {sensor.alerts?.length > 0 && (
                  <div className="mt-3 p-3 bg-red-500/10 border border-red-400/30 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs text-red-400 font-body">
                        {sensor.alerts[0].message}
                      </div>
                      {sensor.alerts[0].type === 'temperature' && !sensor.coolerActive && (
                        <button
                          onClick={() => handleCoolerControl(sensor.batchId, 'activate')}
                          className="text-xs bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-3 py-1 rounded-lg font-heading font-semibold shadow-lg shadow-blue-400/30 hover:shadow-xl hover:shadow-blue-400/50 transform hover:scale-105 transition-all duration-200 flex items-center space-x-1"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                          </svg>
                          <span>Cooler</span>
                        </button>
                      )}
                    </div>
                    {sensor.coolerActive && (
                      <div className="text-xs text-blue-400 font-body flex items-center space-x-1">
                        <svg className="w-3 h-3 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                        <span>Cooling system active - regulating temperature...</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-lumacure-teal/20 to-lumacure-lavender/20 rounded-full mx-auto flex items-center justify-center animate-pulse-glow">
              <svg className="w-12 h-12 text-lumacure-teal/60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-lumacure-teal rounded-full animate-ping opacity-40"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-lumacure-lavender rounded-full animate-ping opacity-60" style={{animationDelay: '1s'}}></div>
          </div>
          <h4 className="text-xl font-heading font-bold text-lumacure-pearl mb-3">
            No Active IoT Monitoring
          </h4>
          <p className="text-lumacure-pearl/70 font-body mb-4 max-w-md mx-auto">
            IoT sensors activate when batches enter the supply chain and are deactivated once batches are dispensed by pharmacies.
          </p>
          <div className="inline-flex items-center space-x-2 bg-lumacure-teal/10 px-4 py-2 rounded-full border border-lumacure-teal/30">
            <div className="w-2 h-2 bg-lumacure-teal rounded-full animate-pulse"></div>
            <span className="text-sm font-body text-lumacure-teal">Waiting for batch activity...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default IoTCharts;