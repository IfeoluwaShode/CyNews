import React from 'react';
import NewsArticle from './NewsArticle';
import LoadingSpinner from './LoadingSpinner';

/**
 * News list component
 * Displays a grid of news articles with loading and error states
 */
const NewsList = ({ articles, loading, error, dark = false }) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg font-medium mb-2">
          Failed to load news
        </div>
        <p className={`transition-colors duration-300 ${dark ? 'text-slate-300' : 'text-gray-600'}`}>
          Please check your internet connection and try again.
        </p>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className={`text-lg font-medium mb-2 transition-colors duration-300 ${dark ? 'text-slate-400' : 'text-gray-500'}`}>
          No articles found
        </div>
          <p className={`transition-colors duration-300 ${dark ? 'text-slate-500' : 'text-gray-400'}`}>
            Try adjusting your search for live news.
          </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <NewsArticle key={index} article={article} dark={dark} />
      ))}
    </div>
  );
};

export default NewsList;
