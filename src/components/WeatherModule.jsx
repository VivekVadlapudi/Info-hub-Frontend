// client/src/components/WeatherModule.jsx
import { useState, useEffect } from 'react';
import { Cloud, Droplets, Search, Loader2, AlertCircle } from 'lucide-react';

const WeatherModule = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [city, setCity] = useState('London');
  const [inputCity, setInputCity] = useState('');

  const fetchWeather = async (cityName) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `/api/weather?city=${encodeURIComponent(cityName)}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found. Please try another city.');
        }
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setWeatherData(data);
      setCity(cityName);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      fetchWeather(inputCity.trim());
      setInputCity('');
    }
  };

  return (
    <div className="module-card">
      <div className="module-header">
        <Cloud className="module-icon" />
        <h2 className="module-title">Weather Information</h2>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} style={{ marginBottom: '1.5rem' }}>
        <div className="form-flex">
          <input
            type="text"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            placeholder="Enter city name..."
            className="form-input"
          />
          <button type="submit" className="btn btn-primary">
            <Search className="btn-icon" />
            Search
          </button>
        </div>
      </form>

      {/* Loading State */}
      {isLoading && (
        <div className="loading-container">
          <Loader2 className="loading-spinner" />
          <p className="loading-text">Loading weather data...</p>
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

      {/* Weather Data */}
      {weatherData && !isLoading && !error && (
        <div>
          <div className="weather-display">
            <h3 className="weather-city">{weatherData.city}</h3>
            <div className="weather-temp">{weatherData.temperature}°C</div>
            <p className="weather-condition">{weatherData.condition}</p>
            <p className="weather-description">{weatherData.description}</p>
          </div>

          <div className="weather-humidity">
            <Droplets className="humidity-icon" />
            <span>Humidity: {weatherData.humidity}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherModule;