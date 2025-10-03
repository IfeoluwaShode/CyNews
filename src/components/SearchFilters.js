import React, { useState } from 'react';

const POPULAR_SOURCES = [
  { id: 'techcrunch', label: 'TechCrunch' },
  { id: 'the-verge', label: 'The Verge' },
  { id: 'wired', label: 'Wired' },
  { id: 'the-hacker-news', label: 'The Hacker News' },
  { id: 'ars-technica', label: 'Ars Technica' },
  { id: 'engadget', label: 'Engadget' },
];

const SearchFilters = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedSources, setSelectedSources] = useState([]);

  const toggleSource = (id) => {
    setSelectedSources((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const submit = (e) => {
    e.preventDefault();
    onSearch({ query, fromDate, toDate, sources: selectedSources });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-6">
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search keywords (e.g., ransomware, phishing)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-cyber-blue dark:bg-slate-900 dark:text-slate-100"
          />
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none dark:bg-slate-900 dark:text-slate-100"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none dark:bg-slate-900 dark:text-slate-100"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-cyber-blue text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {POPULAR_SOURCES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                toggleSource(s.id);
                onSearch({ query, fromDate, toDate, sources: selectedSources.includes(s.id) ? selectedSources.filter(x=>x!==s.id) : [...selectedSources, s.id] });
              }}
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                selectedSources.includes(s.id)
                  ? 'bg-cyber-blue text-white border-cyber-blue'
                  : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-200 border-gray-300 dark:border-slate-600 hover:bg-gray-200 dark:hover:bg-slate-600'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;


