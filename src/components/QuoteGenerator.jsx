// client/src/components/QuoteGenerator.jsx
import { useState, useEffect } from 'react';
import { Lightbulb, RefreshCw, Loader2, AlertCircle } from 'lucide-react';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchQuote = async () => {
    setIsLoading(true);
    setError('');

    try {
      
      const response = await fetch('https://info-hub-frontend-wdti.vercel.app/api/quote');


      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }

      const data = await response.json();
      setQuote(data);
    } catch (err) {
      setError(err.message);
      setQuote(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleRefresh = () => {
    fetchQuote();
  };

  return (
    <div className="module-card">
      <div className="module-header">
        <Lightbulb className="module-icon" />
        <h2 className="module-title">Motivational Quote</h2>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="loading-container">
          <Loader2 className="loading-spinner" />
          <p className="loading-text">Loading quote...</p>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="error-container">
          <AlertCircle className="error-icon" />
          <div>
            <p className="error-title">Error</p>
            <p className="error-message">{error}</p>
          </div>
        </div>
      )}

      {/* Quote Display */}
      {quote && !isLoading && !error && (
        <div>
          <div className="quote-display">
            <div className="quote-mark-open">"</div>
            <p className="quote-text">{quote.text}</p>
            <div className="quote-mark-close">"</div>
          </div>

          {/* Author */}
          <div className="quote-author-container">
            <p className="quote-author">
              —— <span className="quote-author-name">{quote.author}</span>
            </p>
          </div>

          {/* Refresh Button */}
          <button onClick={handleRefresh} className="refresh-button">
            <RefreshCw className="refresh-icon" />
            Get New Quote
          </button>
        </div>
      )}
    </div>
  );
};

export default QuoteGenerator;