import React from 'react';

const UserRoleSelector = ({ currentRole, onRoleChange }) => {
  const roles = [
    { value: 'FDA', label: 'FDA', icon: '🏛️', color: 'bg-blue-100 text-blue-800' },
    { value: 'Manufacturer', label: 'Manufacturer', icon: '🏭', color: 'bg-purple-100 text-purple-800' },
    { value: 'Distributor', label: 'Distributor', icon: '🚛', color: 'bg-green-100 text-green-800' },
    { value: 'Pharmacy', label: 'Pharmacy', icon: '💊', color: 'bg-orange-100 text-orange-800' }
  ];

  const currentRoleData = roles.find(role => role.value === currentRole);

  return (
    <div className="relative">
      <select
        value={currentRole}
        onChange={(e) => onRoleChange(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      >
        {roles.map((role) => (
          <option key={role.value} value={role.value}>
            {role.icon} {role.label}
          </option>
        ))}
      </select>
      
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {currentRoleData && (
        <div className={`absolute top-full left-0 mt-1 px-2 py-1 rounded text-xs font-medium ${currentRoleData.color}`}>
          {currentRoleData.icon} {currentRoleData.label}
        </div>
      )}
    </div>
  );
};

export default UserRoleSelector;