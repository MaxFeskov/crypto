import React from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import CryptoList from './components/CryptoList/CryptoList';
import GlobalErrors from './components/GlobalErrors/GlobalErrors';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <p>Что-то пошло не так:</p>
      <pre>{error.message}</pre>
      <button type="button" onClick={resetErrorBoundary}>
        Попытаться снова
      </button>
    </div>
  );
}

function App() {
  return (
    <>
      <div className="container mx-auto flex flex-col items-center bg-gray-100 p-4">
        <div className="container">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <CryptoList />
          </ErrorBoundary>
        </div>
      </div>
      <GlobalErrors />
    </>
  );
}

export default App;
