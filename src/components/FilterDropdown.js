import React, { useState } from 'react';

const POPULAR_SOURCES = [
  { id: 'techcrunch', label: 'TechCrunch' },
  { id: 'the-verge', label: 'The Verge' },
  { id: 'wired', label: 'Wired' },
  { id: 'the-hacker-news', label: 'The Hacker News' },
  { id: 'ars-technica', label: 'Ars Technica' },
  { id: 'engadget', label: 'Engadget' },
];

const FilterDropdown = ({ onSearch, dark = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const KEYWORD_CHIPS = [
    'malware', 'phishing', 'social engineering', 'iPhone', 'Samsung', 'Google', 'Android', 'Microsoft', 'data breach', 'ransomware', 'privacy', 'exploit'
  ];

  const toggleSource = (id) => {
    const newSources = selectedSources.includes(id) 
      ? selectedSources.filter(s => s !== id)
      : [...selectedSources, id];
    setSelectedSources(newSources);
    onSearch({ query: getCombinedQuery(query, selectedKeywords), fromDate, toDate, sources: newSources });
  };

  // Toggle keyword chip selection
  const toggleKeyword = (chip) => {
    let newKeywords;
    if (selectedKeywords.includes(chip)) {
      newKeywords = selectedKeywords.filter(k => k !== chip);
    } else {
      newKeywords = [...selectedKeywords, chip];
    }
    setSelectedKeywords(newKeywords);
    // Update query field to reflect selected keywords and manual input
    onSearch({ query: getCombinedQuery(query, newKeywords), fromDate, toDate, sources: selectedSources });
  };

  // Combine manual query and selected keywords
  const getCombinedQuery = (manualQuery, keywordsArr) => {
    let q = manualQuery.trim();
    if (keywordsArr.length > 0) {
      q = q ? `${q} ${keywordsArr.join(' ')}` : keywordsArr.join(' ');
    }
    return q;
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  onSearch({ query: getCombinedQuery(query, selectedKeywords), fromDate, toDate, sources: selectedSources });
  setIsOpen(false);
  };

  const clearFilters = () => {
  setQuery('');
  setFromDate('');
  setToDate('');
  setSelectedSources([]);
  setSelectedKeywords([]);
  onSearch({ query: '', fromDate: '', toDate: '', sources: [] });
  };

  return (
    <div className="relative mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-lg shadow-md transition-colors duration-300 flex items-center justify-between ${
          dark 
            ? 'bg-slate-800 text-slate-100 border border-slate-600' 
            : 'bg-white text-gray-700 border border-gray-300'
        }`}
      >
        <span className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span>Advanced Filters</span>
          {(query || fromDate || toDate || selectedSources.length > 0) && (
            <span className="bg-cyber-blue text-white text-xs px-2 py-1 rounded-full">
              {[query, fromDate, toDate, selectedSources.length].filter(Boolean).length}
            </span>
          )}
        </span>
        <svg 
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={`absolute top-full left-0 right-0 mt-2 rounded-lg shadow-lg z-50 transition-all duration-300 ${
          dark ? 'bg-slate-800 border border-slate-600' : 'bg-white border border-gray-200'
        }`}>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Keyword Search */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${dark ? 'text-slate-200' : 'text-gray-700'}`}>
                  Keyword Search
                </label>
                <input
                  type="text"
                  placeholder="Search keywords (e.g., ransomware, phishing)"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    onSearch({ query: getCombinedQuery(e.target.value, selectedKeywords), fromDate, toDate, sources: selectedSources });
                  }}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-cyber-blue transition-colors duration-300 ${
                    dark 
                      ? 'bg-slate-700 border-slate-600 text-slate-100' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
                {/* Keyword Chips */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {KEYWORD_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => toggleKeyword(chip)}
                      className={`px-3 py-1 rounded-full text-sm border transition-colors duration-200 ${
                        selectedKeywords.includes(chip)
                          ? 'bg-cyber-blue text-white border-cyber-blue'
                          : dark
                          ? 'bg-slate-700 text-slate-200 border-slate-600 hover:bg-slate-600'
                          : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${dark ? 'text-slate-200' : 'text-gray-700'}`}>
                    From Date
                  </label>
                  <input
                    type="date"
                    value={fromDate}
                    max={toDate || undefined}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (toDate && val > toDate) return;
                      setFromDate(val);
                      onSearch({ query: getCombinedQuery(query, selectedKeywords), fromDate: val, toDate, sources: selectedSources });
                    }}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none transition-colors duration-300 ${
                      dark 
                        ? 'bg-slate-700 border-slate-600 text-slate-100' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${dark ? 'text-slate-200' : 'text-gray-700'}`}>
                    To Date
                  </label>
                  <input
                    type="date"
                    value={toDate}
                    min={fromDate || undefined}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (fromDate && val < fromDate) return;
                      setToDate(val);
                      onSearch({ query: getCombinedQuery(query, selectedKeywords), fromDate, toDate: val, sources: selectedSources });
                    }}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none transition-colors duration-300 ${
                      dark 
                        ? 'bg-slate-700 border-slate-600 text-slate-100' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              </div>

              {/* News Sources */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${dark ? 'text-slate-200' : 'text-gray-700'}`}>
                  News Sources
                </label>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SOURCES.map((source) => (
                    <button
                      key={source.id}
                      type="button"
                      onClick={() => toggleSource(source.id)}
                      className={`px-3 py-1 rounded-full text-sm border transition-colors duration-200 ${
                        selectedSources.includes(source.id)
                          ? 'bg-cyber-blue text-white border-cyber-blue'
                          : dark
                          ? 'bg-slate-700 text-slate-200 border-slate-600 hover:bg-slate-600'
                          : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {source.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={clearFilters}
                  className={`px-4 py-2 bg-cyber-blue rounded-md text-sm transition-colors duration-200 ${
                    dark 
                      ? 'text-slate-300 hover:text-slate-100' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Clear All
                </button>
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-2 rounded-md text-sm transition-colors duration-200 ${
                      dark 
                        ? 'bg-slate-700 text-slate-200 hover:bg-slate-600' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-cyber-blue text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
