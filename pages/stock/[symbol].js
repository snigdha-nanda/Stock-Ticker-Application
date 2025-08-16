import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function StockDetails() {
  const router = useRouter();
  const { symbol } = router.query;
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (symbol) {
      fetchStockData();
    }
  }, [symbol]);

  const fetchStockData = async () => {
    try {
      const response = await fetch(`https://portal.tradebrains.in/api/assignment/stock/${symbol}/prices?days=30&type=INTRADAY&limit=30`);
      const data = await response.json();
      
      if (data && Array.isArray(data)) {
        setStockData(data);
      }
    } catch (error) {
      console.error('Failed to fetch stock data:', error);
    }
    setLoading(false);
  };

  const renderGraph = () => {
    if (!stockData || !Array.isArray(stockData) || stockData.length === 0) return null;

    const prices = stockData.map(item => parseFloat(item.close));
    
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const priceRange = maxPrice - minPrice || 1;

    return (
      <div style={{ marginTop: '20px' }}>
        <h3>Price Chart (Last {prices.length} Data Points)</h3>
        <svg width="500" height="200" style={{ border: '1px solid #ccc' }}>
          {prices.map((price, index) => {
            const x = (index / (prices.length - 1)) * 480 + 10;
            const y = 190 - ((price - minPrice) / priceRange) * 180;
            
            return (
              <g key={index}>
                <circle cx={x} cy={y} r="2" fill="#007cba" />
                {index > 0 && (
                  <line
                    x1={(index - 1) / (prices.length - 1) * 480 + 10}
                    y1={190 - ((prices[index - 1] - minPrice) / priceRange) * 180}
                    x2={x}
                    y2={y}
                    stroke="#007cba"
                    strokeWidth="2"
                  />
                )}
              </g>
            );
          })}
        </svg>
        <div style={{ fontSize: '12px', marginTop: '5px' }}>
          High: ₹{maxPrice.toFixed(2)} | Low: ₹{minPrice.toFixed(2)}
        </div>
      </div>
    );
  };

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  if (!stockData || !Array.isArray(stockData) || stockData.length === 0) {
    return <div style={{ padding: '20px' }}>Stock data not found</div>;
  }

  const latestData = stockData[0];

  return (
    <>
      <Head>
        <title>{symbol} - Stock Details</title>
        <meta name="description" content={`Stock information for ${symbol}`} />
        <meta property="og:title" content={`${symbol} Stock Details`} />
        <meta property="og:description" content={`Current price and chart for ${symbol}`} />
        <meta name="keywords" content={`${symbol}, stock, price, chart`} />
      </Head>
      
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <button 
          onClick={() => router.back()}
          style={{
            padding: '8px 16px',
            marginBottom: '20px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ← Back
        </button>
        
        <h1>{symbol}</h1>
        
        <div style={{ 
          backgroundColor: '#f9f9f9', 
          padding: '15px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h2>Latest Price Information</h2>
          <p><strong>Date:</strong> {latestData.date}</p>
          <p><strong>Open:</strong> ₹{parseFloat(latestData.open).toFixed(2)}</p>
          <p><strong>High:</strong> ₹{parseFloat(latestData.high).toFixed(2)}</p>
          <p><strong>Low:</strong> ₹{parseFloat(latestData.low).toFixed(2)}</p>
          <p><strong>Close:</strong> ₹{parseFloat(latestData.close).toFixed(2)}</p>
          <p><strong>Volume:</strong> {parseInt(latestData.volume).toLocaleString()}</p>
          <p><strong>Change:</strong> ₹{latestData.change} ({latestData.percent}%)</p>
        </div>

        {renderGraph()}
      </div>
    </>
  );
}
