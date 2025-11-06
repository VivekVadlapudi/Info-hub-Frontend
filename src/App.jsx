// client/src/App.jsx
import { useState } from 'react';
import WeatherModule from './components/WeatherModule';
import CurrencyConverter from './components/CurrencyConverter';
import QuoteGenerator from './components/QuoteGenerator';
import { Cloud, DollarSign, Lightbulb } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('Weather');

  const tabs = [
    { name: 'Weather', icon: Cloud },
    { name: 'Currency', icon: DollarSign },
    { name: 'Quote', icon: Lightbulb }
  ];

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">🌐 InfoHub</h1>
          <p className="header-subtitle">Your Daily Information Dashboard</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Tab Navigation */}
        <div className="tab-navigation">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`tab-button ${activeTab === tab.name ? 'active' : ''}`}
              >
                <Icon className="tab-icon" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Module Content */}
        <div className="module-container">
          {activeTab === 'Weather' && <WeatherModule />}
          {activeTab === 'Currency' && <CurrencyConverter />}
          {activeTab === 'Quote' && <QuoteGenerator />}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>Built with ❤️ for ByteXL Challenge</p>
        </div>
      </footer>
    </div>
  );
}

export default App;