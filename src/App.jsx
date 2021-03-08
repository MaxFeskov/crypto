import React from 'react';
import SearchForm from './components/SearchForm/SearchForm';
import CryptoList from './components/CryptoList/CryptoList';
import CryptoItemDiagram from './components/CryptoItemDiagram/CryptoItemDiagram';
import Hr from './components/Hr/Hr';

function App() {
  return (
    <div className="container mx-auto flex flex-col items-center bg-gray-100 p-4">
      <div className="container">
        <SearchForm />
        <Hr />
        <CryptoList />
        <Hr />
        <CryptoItemDiagram />
      </div>
    </div>
  );
}

export default App;
