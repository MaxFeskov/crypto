import React from 'react';
import SearchForm from './components/SearchForm/SearchForm';
import CryptoList from './components/CryptoList/CryptoList';
import CryptoItemDiagram from './components/CryptoItemDiagram/CryptoItemDiagram';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import GlobalErrors from './components/GlobalErrors/GlobalErrors';

function App() {
  return (
    <>
      <div className="container mx-auto flex flex-col items-center bg-gray-100 p-4">
        <div className="container">
          <ErrorBoundary>
            <SearchForm />
            <CryptoList />
            <CryptoItemDiagram />
          </ErrorBoundary>
        </div>
      </div>
      <GlobalErrors />
    </>
  );
}

export default App;
