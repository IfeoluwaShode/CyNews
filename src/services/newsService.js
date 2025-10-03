import axios from 'axios';

// NewsAPI configuration
const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY || 'your-api-key-here';
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

/**
 * News service for fetching cybersecurity news from NewsAPI
 */
class NewsService {
  constructor() {
    this.apiKey = NEWS_API_KEY;
    this.baseURL = NEWS_API_BASE_URL;
  }

  /**
   * Fetch cybersecurity news based on country and language
   * @param {string} country - Country code (e.g., 'us', 'gb', 'in')
   * @param {string} language - Language code (e.g., 'en', 'es', 'fr')
   * @param {number} page - Page number (default: 1)
   * @returns {Promise<Object>} Object with articles array and totalResults
   */
  async fetchCybersecurityNews(
    country = 'us',
    language = 'en',
    page = 1,
    query = '',
    fromDate = '',
    toDate = '',
    sources = []
  ) {
    try {
      // First try to get headlines from specific country
      let response;
      
      if (this.apiKey && this.apiKey !== 'your-api-key-here' && this.apiKey !== 'your_newsapi_key_here') {
        // Try top-headlines endpoint first (supports country and pagination)
        try {
          response = await axios.get(`${this.baseURL}/top-headlines`, {
            params: {
              country: country,
              category: 'technology',
              pageSize: 20,
              page: page,
              language: language,
              q: query && query.trim().length > 0 ? query : undefined,
              sources: sources.length > 0 ? sources.join(',') : undefined,
              from: fromDate || undefined,
              to: toDate || undefined,
              apiKey: this.apiKey
            }
          });
          
          // Filter for cybersecurity-related articles
          const articles = response.data.articles || [];
          const cyberArticles = articles.filter(article => 
            this.isCybersecurityRelated(article.title, article.description)
          );
          
          if (cyberArticles.length > 0) {
            // Strict language filter
            const langFiltered = language
              ? cyberArticles.filter(a => (a.language ? a.language === language : true))
              : cyberArticles;

            return {
              articles: langFiltered,
              totalResults: response.data.totalResults || langFiltered.length,
              currentPage: page
            };
          }
        } catch (headlinesError) {
          console.log('Headlines endpoint failed, trying everything endpoint...');
        }
        
        // Fallback to everything endpoint with search query
        // If no query provided, search for cybersecurity mentioning the country name
        const searchQuery = query && query.trim().length > 0
          ? query
          : `("cybersecurity" OR "cyber security" OR "data breach" OR malware OR phishing OR ransomware OR "cyber attack" OR "security breach") AND ${country}`;
        
        response = await axios.get(`${this.baseURL}/everything`, {
          params: {
            q: searchQuery,
            sortBy: 'publishedAt',
            pageSize: 20,
            page: page,
            language: language || undefined,
            sources: sources.length > 0 ? sources.join(',') : undefined,
            from: fromDate || undefined,
            to: toDate || undefined,
            apiKey: this.apiKey
          }
        });
      } else {
        // No valid API key, return mock data
        console.log('No valid API key found, using mock data');
        return this.getMockNews(country, language, page);
      }

      return {
        articles: response.data.articles || [],
        totalResults: response.data.totalResults || 0,
        currentPage: page
      };
    } catch (error) {
      console.error('Error fetching news:', error);
      
      // Fallback to mock data if API fails
      return this.getMockNews(country, language, page);
    }
  }

  /**
   * Check if an article is cybersecurity-related
   * @param {string} title - Article title
   * @param {string} description - Article description
   * @returns {boolean} True if cybersecurity-related
   */
  isCybersecurityRelated(title, description) {
    const cyberKeywords = [
      'cybersecurity', 'cyber security', 'data breach', 'malware', 'phishing', 
      'ransomware', 'cyber attack', 'security breach', 'hack', 'hacker', 
      'vulnerability', 'exploit', 'firewall', 'encryption', 'privacy',
      'cyber threat', 'information security', 'network security'
    ];
    
    const text = `${title} ${description}`.toLowerCase();
    return cyberKeywords.some(keyword => text.includes(keyword.toLowerCase()));
  }

  /**
   * Get mock news data as fallback
   * @param {string} country - Country code for localized mock data
   * @param {string} language - Language code for localized mock data
   * @param {number} page - Page number for pagination
   * @returns {Object} Object with articles array and pagination info
   */
  getMockNews(country = 'us', language = 'en', page = 1) {
    const countryNames = {
      'us': 'United States',
      'gb': 'United Kingdom', 
      'ca': 'Canada',
      'au': 'Australia',
      'de': 'Germany',
      'fr': 'France',
      'es': 'Spain',
      'it': 'Italy',
      'in': 'India',
      'jp': 'Japan',
      'br': 'Brazil',
      'mx': 'Mexico'
    };

    const sources = {
      'us': ['Cyber Security News', 'Security Weekly', 'Tech Security', 'InfoSec Today'],
      'gb': ['UK Cyber News', 'Security Guardian', 'Tech Security UK', 'Cyber Watch'],
      'de': ['Sicherheits News', 'Cyber Security DE', 'Tech Sicherheit', 'Security Report'],
      'fr': ['Sécurité Cyber', 'News Sécurité', 'Tech Sécurité', 'Cyber France'],
      'es': ['Noticias Ciberseguridad', 'Seguridad Digital', 'Tech Seguridad', 'Cyber España'],
      'in': ['Cyber India News', 'Security India', 'Tech Security IN', 'Cyber Watch India']
    };

    const countrySources = sources[country] || sources['us'];
    const countryName = countryNames[country] || 'Global';

    // Generate more mock articles for pagination
    const allMockArticles = [];
    const articleTemplates = [
      {
        title: `Major Cybersecurity Breach Affects ${countryName} Organizations`,
        description: `A sophisticated cyber attack has compromised several major corporations in ${countryName}, highlighting the need for enhanced security measures.`,
        urlToImage: "https://via.placeholder.com/300x200?text=Cybersecurity"
      },
      {
        title: `New Ransomware Campaign Targets ${countryName} Healthcare Sector`,
        description: `Security researchers have identified a new strain of ransomware specifically designed to target healthcare infrastructure in ${countryName}.`,
        urlToImage: "https://via.placeholder.com/300x200?text=Ransomware"
      },
      {
        title: `Zero-Day Vulnerability Discovered in Popular Software Used in ${countryName}`,
        description: `A critical zero-day vulnerability has been found in widely-used software, prompting immediate security updates across ${countryName}.`,
        urlToImage: "https://via.placeholder.com/300x200?text=Vulnerability"
      },
      {
        title: `${countryName} Government Strengthens Cybersecurity Regulations`,
        description: `New cybersecurity regulations have been announced by ${countryName} authorities to protect critical infrastructure and personal data.`,
        urlToImage: "https://via.placeholder.com/300x200?text=Regulations"
      },
      {
        title: `AI-Powered Security Solutions Deployed in ${countryName}`,
        description: `Leading technology companies in ${countryName} are implementing advanced AI-powered security solutions to combat emerging cyber threats.`,
        urlToImage: "https://via.placeholder.com/300x200?text=AI+Security"
      },
      {
        title: `${countryName} Financial Sector Faces Increased Cyber Threats`,
        description: `Banks and financial institutions in ${countryName} are experiencing a surge in sophisticated cyber attacks targeting customer data and financial systems.`,
        urlToImage: "https://via.placeholder.com/300x200?text=Finance+Security"
      },
      {
        title: `Cloud Security Breach Affects ${countryName} Tech Companies`,
        description: `A major cloud security incident has impacted several technology companies in ${countryName}, raising concerns about cloud infrastructure security.`,
        urlToImage: "https://via.placeholder.com/300x200?text=Cloud+Security"
      },
      {
        title: `${countryName} Universities Strengthen Cybersecurity Education`,
        description: `Educational institutions in ${countryName} are expanding cybersecurity programs to address the growing demand for skilled security professionals.`,
        urlToImage: "https://via.placeholder.com/300x200?text=Education"
      }
    ];

    // Generate 100 mock articles for pagination
    for (let i = 0; i < 100; i++) {
      const template = articleTemplates[i % articleTemplates.length];
      const sourceIndex = i % countrySources.length;
      const timeOffset = i * 3600000; // 1 hour between each article
      
      allMockArticles.push({
        title: `${template.title} (Page ${Math.ceil((i + 1) / 20)})`,
        description: template.description,
        source: { name: countrySources[sourceIndex] },
        publishedAt: new Date(Date.now() - timeOffset).toISOString(),
        url: `https://example.com/news${i + 1}-${country}`,
        urlToImage: template.urlToImage
      });
    }

    // Paginate the results
    const articlesPerPage = 20;
    const startIndex = (page - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const paginatedArticles = allMockArticles.slice(startIndex, endIndex);

    return {
      articles: paginatedArticles,
      totalResults: allMockArticles.length,
      currentPage: page
    };
  }
}

export default new NewsService();
