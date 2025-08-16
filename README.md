# Stock Ticker Application

A Next.js-based stock ticker application for Indian stock market data using TradeBrains API.

## Features

- **Stock Search**: Search for Indian stocks by name or symbol (e.g., RELIANCE, TCS)
- **Stock Details**: View comprehensive stock information including OHLC data, volume, and price changes
- **Price Charts**: Interactive SVG-based price visualization showing historical data
- **Market Movers**: Real-time NIFTY top gainers and losers on homepage
- **SEO Optimized**: Proper meta tags for search engine optimization
- **Responsive Design**: Works on desktop and mobile devices
- **Static Export**: Netlify deployment ready

## Technology Stack

- **Framework**: Next.js 13.5.6
- **Language**: JavaScript (React)
- **Styling**: Inline CSS (beginner-friendly approach)
- **Charts**: Custom SVG implementation
- **Deployment**: Static export for Netlify

## API Integration

Uses TradeBrains API endpoints:

1. **Search API**: `/api/assignment/search?keyword={term}&length=10`
   - Returns stock search results with symbol and company name

2. **Stock Prices API**: `/api/assignment/stock/{symbol}/prices?days=30&type=INTRADAY&limit=30`
   - Provides OHLC data, volume, and price changes

3. **Market Movers API**: `/api/assignment/index/NIFTY/movers/`
   - Returns NIFTY top gainers, losers, and volume movers

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone or download the project:
```bash
cd Stock-Ticker-Application
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Testing the Application

1. **Search Functionality**:
   - Enter stock names like "RELIANCE", "TCS", "INFY" in the search box
   - Click on any result to navigate to stock details

2. **Stock Details**:
   - View OHLC prices, volume, and percentage changes
   - Check the price chart visualization
   - Use back button to return to search

3. **Market Movers**:
   - Scroll down on homepage to see NIFTY gainers and losers
   - Click on any stock to view its details

## Deployment

### Netlify Deployment

1. **Build the project**:
```bash
npm run build && npm run export
```

2. **Deploy to Netlify**:
   - Upload the `out` folder to Netlify
   - Or connect your Git repository to Netlify for automatic deployments

3. **Netlify Configuration**:
   - Build command: `npm run build && npm run export`
   - Publish directory: `out`
   - The `netlify.toml` file is already configured

### Manual Deployment Steps

1. Run build command:
```bash
npm run build
npm run export
```

2. The `out` folder contains all static files
3. Upload the `out` folder contents to any static hosting service

## Project Structure

```
├── pages/
│   ├── index.js          # Homepage with search and market movers
│   ├── stock/[symbol].js # Dynamic stock details page
│   └── _app.js           # Global app configuration
├── package.json          # Dependencies and scripts
├── next.config.js        # Next.js configuration for static export
├── netlify.toml          # Netlify deployment configuration
└── README.md             # This file
```

## Key Features Implementation

- **Search**: Real-time API integration with TradeBrains search endpoint
- **Navigation**: Dynamic routing using Next.js router
- **Charts**: Custom SVG-based price visualization
- **SEO**: Meta tags configured for each stock page
- **Responsive**: CSS styling that works on all devices
- **Error Handling**: Basic error handling for API failures

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Notes

- Application uses live TradeBrains API data
- No API key required for the provided endpoints
- Designed with beginner-friendly code structure
- All styling is inline for simplicity
- Static export ensures fast loading and easy deployment
