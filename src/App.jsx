import React from 'react';
import CryptoList from './components/CryptoList/CryptoList';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import GlobalErrors from './components/GlobalErrors/GlobalErrors';

function App() {
  return (
    <>
      <div className="container mx-auto flex flex-col items-center bg-gray-100 p-4">
        <div className="container">
          <ErrorBoundary>
            <CryptoList />
          </ErrorBoundary>
        </div>
      </div>
      <GlobalErrors />
    </>
  );
}

export default App;
