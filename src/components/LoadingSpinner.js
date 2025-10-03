import React from 'react';

/**
 * Loading spinner component
 * Displays a centered spinner while data is being fetched
 */
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-blue"></div>
    </div>
  );
};

export default LoadingSpinner;
