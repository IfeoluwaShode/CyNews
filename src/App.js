import React, { useState, useEffect } from 'react';
import FilterControls from './components/FilterControls';
import NewsList from './components/NewsList';
import Pagination from './components/Pagination';
import FilterDropdown from './components/FilterDropdown';
import Toast from './components/Toast';
import newsService from './services/newsService';
import './App.css';

/**
 * Main App component
 * Manages state and coordinates between filter controls and news list
 */
function App() {
  // State management
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [country, setCountry] = useState('us');
  const [language, setLanguage] = useState('en');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [sources, setSources] = useState([]);
  const [showToast, setShowToast] = useState('');
  const [dark, setDark] = useState(false);

  /**
   * Fetch news articles based on current country and language
   */
  const fetchNews = async (page = 1) => {
    fetchNewsWithParams(page, query, fromDate, toDate, sources);
  };

  /**
   * Handle country change
   * @param {string} newCountry - New country code
   */
  const handleCountryChange = (newCountry) => {
    setCountry(newCountry);
    // Reset language to English when changing country for better API results
    setLanguage('en');
    // Reset to page 1 when changing country
    setCurrentPage(1);
  };

  /**
   * Handle language change
   * @param {string} newLanguage - New language code
   */
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    // Reset to page 1 when changing language
    setCurrentPage(1);
  };

  /**
   * Handle page change
   * @param {number} page - Page number to navigate to
   */
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchNews(page);
  };

  const handleSearch = ({ query, fromDate, toDate, sources }) => {
    const newQuery = query || '';
    const newFromDate = fromDate || '';
    const newToDate = toDate || '';
    const newSources = sources || [];
    
    setQuery(newQuery);
    setFromDate(newFromDate);
    setToDate(newToDate);
    setSources(newSources);
    setCurrentPage(1);
    
    // Trigger search with new parameters immediately
    fetchNewsWithParams(1, newQuery, newFromDate, newToDate, newSources);
  };

  const fetchNewsWithParams = async (page, searchQuery, searchFromDate, searchToDate, searchSources) => {
    setLoading(true);
    setError(null);
    try {
      const newsData = await newsService.fetchCybersecurityNews(
        country,
        language,
        page,
        searchQuery,
        searchFromDate,
        searchToDate,
        searchSources
      );
      setArticles(newsData.articles);
      setTotalResults(newsData.totalResults);
      setCurrentPage(newsData.currentPage);
      setTotalPages(Math.ceil(newsData.totalResults / 20));

      // Show toast if date filter is set and no articles found
      if ((searchFromDate || searchToDate) && (newsData.totalResults === 0 || newsData.articles.length === 0)) {
        setShowToast('No news found for the selected date range.');
      } else {
        setShowToast('');
      }
    } catch (err) {
      setError('Failed to fetch news articles');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  // Fetch news when component mounts or when country/language changes
  useEffect(() => {
    fetchNews(currentPage);
  }, [country, language]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`text-white shadow-lg transition-colors duration-300 ${dark ? 'bg-slate-900' : 'bg-cyber-dark'}`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">CYNews</h1>
              <p className={`mt-1 transition-colors duration-300 ${dark ? 'text-slate-300' : 'text-cyber-gray'}`}>Your source for cybersecurity news</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Live Updates</span>
                </div>
              </div>
              <button
                onClick={() => setDark(d => !d)}
                className="px-3 py-2 bg-white/10 rounded-md text-sm hover:bg-white/20 transition-colors duration-200 flex items-center space-x-2"
                aria-label="Toggle dark mode"
              >
                {dark ? (
                  <>
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                    <span>Light</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 text-slate-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                    <span>Dark</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`container mx-auto px-4 py-8 transition-colors duration-300 ${dark ? 'bg-slate-900 text-slate-100' : 'bg-gray-50'}`}>
        <Toast message={showToast} onClose={() => setShowToast('')} />
        {/* Filter Controls */}
        <FilterControls
          country={country}
          language={language}
          onCountryChange={handleCountryChange}
          onLanguageChange={handleLanguageChange}
          dark={dark}
        />

        {/* Advanced Filters Dropdown */}
        <FilterDropdown onSearch={handleSearch} dark={dark} />


        {/* News List */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-cyber-dark">
              Latest Cybersecurity News
            </h2>
            <div className="text-sm text-cyber-gray">
              {totalResults > 0 ? `${totalResults} total articles` : `${articles.length} articles found`}
              {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
            </div>
          </div>
          
          <NewsList
            articles={articles}
            loading={loading}
            error={error}
            dark={dark}
          />
        </div>

        {/* Pagination */}
        {!loading && !error && articles.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalResults={totalResults}
            articlesPerPage={20}
            dark={dark}
          />
        )}

        {/* Footer */}
        <footer className={`mt-12 py-8 border-t transition-colors duration-300 ${
          dark ? 'border-slate-700' : 'border-gray-200'
        }`}>
          <div className={`text-center transition-colors duration-300 ${
            dark ? 'text-slate-400' : 'text-gray-500'
          }`}>
            <p className="mb-2">
              Powered by NewsAPI • Updated in real-time
            </p>
            <p className={`text-sm transition-colors duration-300 ${
              dark ? 'text-slate-500' : 'text-gray-400'
            }`}>
              CYNews - Stay informed about the latest cybersecurity threats and developments
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
