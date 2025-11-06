// client/src/components/CurrencyConverter.jsx
import { useState } from 'react';
import { DollarSign, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('100');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConvert = async (e) => {
    e.preventDefault();
    
    const numAmount = parseFloat(amount);
    
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount greater than 0');
      setResult(null);
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`/api/currency?amount=${numAmount}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to convert currency');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="module-card">
      <div className="module-header">
        <DollarSign className="module-icon" />
        <h2 className="module-title">Currency Converter</h2>
      </div>

      {/* Converter Form */}
      <form onSubmit={handleConvert}>
        <div className="form-group">
          <label className="form-label">Amount (INR)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount in INR"
            step="0.01"
            min="0"
            className="form-input"
            style={{ fontSize: '1.125rem' }}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary btn-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="btn-icon" style={{ animation: 'spin 1s linear infinite' }} />
              Converting...
            </>
          ) : (
            <>
              Convert
              <ArrowRight className="btn-icon" />
            </>
          )}
        </button>
      </form>

      {/* Error State */}
      {error && (
        <div className="error-container" style={{ marginTop: '1.5rem' }}>
          <AlertCircle className="error-icon" />
          <div>
            <p className="error-title">Error</p>
            <p className="error-message">{error}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {result && !error && (
        <div className="currency-results">
          <div className="currency-display">
            <p className="currency-label">Conversion Results</p>

            {/* INR Display */}
            <div className="currency-from">
              <p className="currency-from-label">From</p>
              <p className="currency-from-amount">
                ₹ {parseFloat(result.inr).toLocaleString('en-IN')}
              </p>
              <p className="currency-from-text">Indian Rupee</p>
            </div>

            <div className="currency-arrow">
              <ArrowRight className="arrow-icon" />
            </div>

            {/* USD Result */}
            <div className="currency-result-card usd">
              <div className="currency-result-content">
                <div>
                  <p className="currency-result-label">US Dollar</p>
                  <p className="currency-result-amount usd">$ {result.usd}</p>
                </div>
                <div>
                  <p className="currency-result-rate-label">Rate</p>
                  <p className="currency-result-rate">{result.rates.INR_to_USD}</p>
                </div>
              </div>
            </div>

            {/* EUR Result */}
            <div className="currency-result-card eur">
              <div className="currency-result-content">
                <div>
                  <p className="currency-result-label">Euro</p>
                  <p className="currency-result-amount eur">€ {result.eur}</p>
                </div>
                <div>
                  <p className="currency-result-rate-label">Rate</p>
                  <p className="currency-result-rate">{result.rates.INR_to_EUR}</p>
                </div>
              </div>
            </div>
          </div>

          <p className="currency-note">Exchange rates are updated in real-time</p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;