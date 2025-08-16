export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
        
        * {
          box-sizing: border-box;
        }
        
        button:hover {
          opacity: 0.8;
        }
        
        input:focus {
          outline: 2px solid #007cba;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
