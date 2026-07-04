# CYNews - Cybersecurity News Aggregator

A responsive React application that fetches and displays the latest cybersecurity news from around the world.

## Features

- 🌍 **Multi-country support** - News from 12+ countries
- 🌐 **Multi-language support** - 12+ languages available
- 📱 **Fully responsive** - Works on desktop, tablet, and mobile
- ⚡ **Real-time updates** - Live news fetching without page reload
- 🎨 **Modern UI** - Clean, professional design with TailwindCSS
- 🔄 **Loading states** - Smooth loading indicators
- 🛡️ **Error handling** - Graceful fallbacks for API failures

## Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cynews
   ```


# CYNews

CYNews is a modern web application that delivers real-time cybersecurity news from around the world. It aggregates articles from trusted sources, allowing users to filter, search, and stay updated on the latest threats, trends, and developments in the cybersecurity landscape.

## Features

- **Live Cybersecurity News**: Get up-to-date news articles focused on cybersecurity, data breaches, malware, phishing, and more.
- **Advanced Filtering**: Filter news by country, language, date range, and popular sources.
- **Keyword Search & Chips**: Search for news using keywords or quickly select from popular topics (malware, phishing, iPhone, Google, etc.) using clickable chips.
- **Source Selection**: Choose from trusted news sources like TechCrunch, Wired, The Hacker News, and more.
- **Pagination**: Easily browse through multiple pages of news results.
- **Dark/Light Mode**: Switch between dark and light themes for comfortable reading.
- **Toast Notifications**: Get instant feedback when no news is found for your filters or if an error occurs.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.

## Tech Stack

- **Frontend**: React.js
- **Styling**: Tailwind CSS, PostCSS
- **API**: [NewsAPI](https://newsapi.org/) (requires API key)
- **Build Tools**: npm, Node.js

## Getting Started

1. **Clone the repository**
  ```bash
  git clone https://github.com/yourusername/CyNews.git
  cd CyNews
  ```
2. **Install dependencies**
  ```bash
  npm install
  ```
3. **Configure NewsAPI Key**
  - Get your API key from [NewsAPI](https://newsapi.org/).
  - Create a `.env` file in the root directory:
    ```
    REACT_APP_NEWS_API_KEY=your_api_key_here
    ```
4. **Start the app**
  ```bash
  npm start
  ```

## Folder Structure

```
CyNews/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   ├── components/
│   │   ├── FilterControls.js
│   │   ├── FilterDropdown.js
│   │   ├── LoadingSpinner.js
│   │   ├── NewsArticle.js
│   │   ├── NewsList.js
│   │   ├── Pagination.js
│   │   ├── SearchFilters.js
│   │   └── Toast.js
│   └── services/
│       └── newsService.js
├── .env
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── ...
```

## Important Notes

- **API Limits**: NewsAPI free tier has request and feature limitations. If you see only demo articles, check your API key and usage limits.
- **Environment Variables**: Never commit your API key to public repositories.
- **Customization**: You can add more keyword chips or sources in the code for broader coverage.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

Stay informed. Stay secure. CYNews.
  { code: 'new_lang_code', name: 'New Language' }
];
```

### Styling

The app uses TailwindCSS for styling. Customize the theme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'cyber-blue': '#1e40af',
      'cyber-dark': '#0f172a',
      'cyber-gray': '#64748b',
    }
  },
}
```

## Future Enhancements

- [ ] Add news categories (Malware, Phishing, etc.)
- [ ] Implement search functionality
- [ ] Add bookmarking/saving articles
- [ ] Dark mode toggle
- [ ] Push notifications for breaking news
- [ ] Article sharing functionality
- [ ] Advanced filtering options

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

## Pictures
<img width="2418" height="1302" alt="Cybernews-project" src="https://github.com/user-attachments/assets/d591b3fc-2cf9-42a7-860f-e46a323e7ed3" />

