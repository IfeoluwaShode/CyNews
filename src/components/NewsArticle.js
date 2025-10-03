import React from 'react';

/**
 * Individual news article component
 * Displays article title, description, source, date, and link
 */
const NewsArticle = ({ article, dark = false }) => {
  // Share button handler
  const handleShare = (e) => {
    e.stopPropagation();
    if (article.url && !article.url.includes('example.com')) {
      if (navigator.share) {
        navigator.share({
          title: article.title,
          text: article.description || article.title,
          url: article.url
        });
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(article.url);
        alert('Article link copied to clipboard!');
      }
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleArticleClick = () => {
    if (article.url && !article.url.includes('example.com')) {
      window.open(article.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <article 
      className={`rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer ${
        dark ? 'bg-slate-800' : 'bg-white'
      }`}
      onClick={handleArticleClick}
      tabIndex={0}
      role="article"
      aria-label={article.title}
    >
      {/* Article Image */}
      {article.urlToImage && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
      
      {/* Article Content */}
      <div className="p-6">
        {/* Source and Date */}
        <div className={`flex justify-between items-center mb-3 text-sm transition-colors duration-300 ${
          dark ? 'text-slate-400' : 'text-cyber-gray'
        }`}>
          <span className="font-medium">{article.source?.name || 'Unknown Source'}</span>
          <span>{formatDate(article.publishedAt)}</span>
          {/* Share Button */}
          {article.url && !article.url.includes('example.com') && (
            <button
              type="button"
              onClick={handleShare}
              className={`ml-2 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-colors duration-200 border ${dark ? 'bg-slate-700 text-slate-200 border-slate-600 hover:bg-slate-600' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}`}
              title="Share this article"
              aria-label={`Share ${article.title}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v.01M12 4v.01M20 12v.01M12 20v.01M8.59 16.59L12 20l3.41-3.41M16.59 8.59L20 12l-3.41 3.41M8.59 7.41L12 4l3.41 3.41" />
              </svg>
              Share
            </button>
          )}
        </div>
        
        {/* Article Title */}
        <h3 className={`text-xl font-bold mb-3 line-clamp-2 hover:text-cyber-blue transition-colors duration-200 ${
          dark ? 'text-slate-100' : 'text-cyber-dark'
        }`} tabIndex={0} aria-label={`Title: ${article.title}`}>
          {article.title}
        </h3>
        
        {/* Article Description */}
        <p className={`mb-4 line-clamp-3 transition-colors duration-300 ${
          dark ? 'text-slate-300' : 'text-gray-600'
        }`} tabIndex={0} aria-label={`Description: ${article.description || 'No description available.'}`}>
          {article.description || 'No description available.'}
        </p>
        
        {/* Read More Link */}
        {article.url && !article.url.includes('example.com') ? (
          <div 
            className="inline-flex items-center text-cyber-blue hover:text-blue-700 font-medium transition-colors duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
              aria-label={`Read full article: ${article.title}`}
            >
              Read Full Article
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        ) : (
          <div className={`inline-flex items-center font-medium transition-colors duration-300 ${
            dark ? 'text-slate-400' : 'text-gray-400'
          }`} aria-label="Demo Article (No External Link)">
            <svg
              className="mr-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Demo Article (No External Link)
          </div>
        )}
      </div>
    </article>
  );
};

export default NewsArticle;
