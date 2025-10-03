import React from 'react';

/**
 * Pagination component for navigating through news pages
 */
const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalResults,
  articlesPerPage,
  dark = false
}) => {
  // Calculate visible page numbers
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();
  const startResult = (currentPage - 1) * articlesPerPage + 1;
  const endResult = Math.min(currentPage * articlesPerPage, totalResults);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between mt-8 px-4 py-6 rounded-lg shadow-md transition-colors duration-300 ${
      dark ? 'bg-slate-800' : 'bg-white'
    }`}>
      {/* Results info */}
      <div className={`text-sm mb-4 sm:mb-0 transition-colors duration-300 ${
        dark ? 'text-slate-300' : 'text-gray-600'
      }`}>
        Showing {startResult}-{endResult} of {totalResults} articles
      </div>

      {/* Pagination controls */}
      <div className="flex items-center space-x-2">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : dark
              ? 'text-slate-300 hover:bg-slate-700 hover:text-cyber-blue'
              : 'text-gray-700 hover:bg-gray-100 hover:text-cyber-blue'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {visiblePages.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-3 py-2 text-gray-500">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    currentPage === page
                      ? 'bg-cyber-blue text-white'
                      : dark
                      ? 'text-slate-300 hover:bg-slate-700 hover:text-cyber-blue'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-cyber-blue'
                  }`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : dark
              ? 'text-slate-300 hover:bg-slate-700 hover:text-cyber-blue'
              : 'text-gray-700 hover:bg-gray-100 hover:text-cyber-blue'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
