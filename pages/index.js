import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movers, setMovers] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchMovers();
  }, []);

  const fetchMovers = async () => {
    try {
      const response = await fetch('https://portal.tradebrains.in/api/assignment/index/NIFTY/movers/');
      const data = await response.json();
      setMovers(data);
    } catch (error) {
      console.error('Failed to fetch movers:', error);
    }
  };

  const searchStocks = async () => {
    if (!searchTerm) return;
    
    setLoading(true);
    try {
      const response = await fetch(`https://portal.tradebrains.in/api/assignment/search?keyword=${searchTerm}&length=10`);
      const data = await response.json();
      
      if (data && Array.isArray(data)) {
        setResults(data);
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
    setLoading(false);
  };

  const selectStock = (symbol) => {
    router.push(`/stock/${symbol}`);
  };

  return (
    <>
      <Head>
        <title>Stock Ticker - Search Stocks</title>
        <meta name="description" content="Search and view stock information" />
      </Head>
      
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <h1>Stock Search</h1>
        
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter stock name (e.g., RELIANCE, TCS)"
            style={{
              width: '70%',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <button
            onClick={searchStocks}
            disabled={loading}
            style={{
              width: '25%',
              padding: '10px',
              marginLeft: '5%',
              fontSize: '16px',
              backgroundColor: '#007cba',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {results.length > 0 && (
          <div>
            <h3>Search Results:</h3>
            {results.map((stock, index) => (
              <div
                key={index}
                onClick={() => selectStock(stock.symbol)}
                style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  marginBottom: '10px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <strong>{stock.symbol}</strong> - {stock.company}
              </div>
            ))}
          </div>
        )}

        {movers && (
          <div style={{ marginTop: '30px' }}>
            <h2>NIFTY Market Movers</h2>
            
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <h3 style={{ color: 'green' }}>Top Gainers</h3>
                {movers.gainers.slice(0, 3).map((stock, index) => (
                  <div
                    key={index}
                    onClick={() => selectStock(stock.symbol)}
                    style={{
                      padding: '8px',
                      border: '1px solid #ddd',
                      marginBottom: '5px',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      backgroundColor: '#f0f8f0'
                    }}
                  >
                    <strong>{stock.symbol}</strong> - ₹{stock.close}
                    <span style={{ color: 'green', float: 'right' }}>+{stock.percent.toFixed(2)}%</span>
                  </div>
                ))}
              </div>

              <div style={{ flex: 1, minWidth: '250px' }}>
                <h3 style={{ color: 'red' }}>Top Losers</h3>
                {movers.losers.slice(0, 3).map((stock, index) => (
                  <div
                    key={index}
                    onClick={() => selectStock(stock.symbol)}
                    style={{
                      padding: '8px',
                      border: '1px solid #ddd',
                      marginBottom: '5px',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      backgroundColor: '#f8f0f0'
                    }}
                  >
                    <strong>{stock.symbol}</strong> - ₹{stock.close}
                    <span style={{ color: 'red', float: 'right' }}>{stock.percent.toFixed(2)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
