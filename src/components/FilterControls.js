import React from 'react';

/**
 * Filter controls component
 * Provides dropdowns for country and language selection
 */
const FilterControls = ({ country, language, onCountryChange, onLanguageChange, dark = false }) => {
  const countries = [
    { code: 'us', name: 'United States', flag: '🇺🇸' },
    { code: 'gb', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'ca', name: 'Canada', flag: '🇨🇦' },
    { code: 'au', name: 'Australia', flag: '🇦🇺' },
    { code: 'de', name: 'Germany', flag: '🇩🇪' },
    { code: 'fr', name: 'France', flag: '🇫🇷' },
    { code: 'es', name: 'Spain', flag: '🇪🇸' },
    { code: 'it', name: 'Italy', flag: '🇮🇹' },
    { code: 'in', name: 'India', flag: '🇮🇳' },
    { code: 'jp', name: 'Japan', flag: '🇯🇵' },
    { code: 'br', name: 'Brazil', flag: '🇧🇷' },
    { code: 'mx', name: 'Mexico', flag: '🇲🇽' }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' }
  ];

  return (
    <div className={`rounded-lg shadow-md p-6 mb-8 transition-colors duration-300 ${dark ? 'bg-slate-800' : 'bg-white'}`}>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Country Selector */}
        <div className="flex-1">
          <label htmlFor="country-select" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${dark ? 'text-slate-200' : 'text-gray-700'}`}>
            Country
          </label>
          <select
            id="country-select"
            value={country}
            onChange={(e) => onCountryChange(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-cyber-blue transition-colors duration-300 ${
              dark 
                ? 'bg-slate-700 border-slate-600 text-slate-100' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            {countries.map((countryOption) => (
              <option key={countryOption.code} value={countryOption.code}>
                {countryOption.flag} {countryOption.name}
              </option>
            ))}
          </select>
        </div>

        {/* Language Selector */}
        <div className="flex-1">
          <label htmlFor="language-select" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${dark ? 'text-slate-200' : 'text-gray-700'}`}>
            Language
          </label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-cyber-blue transition-colors duration-300 ${
              dark 
                ? 'bg-slate-700 border-slate-600 text-slate-100' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            {languages.map((languageOption) => (
              <option key={languageOption.code} value={languageOption.code}>
                {languageOption.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
