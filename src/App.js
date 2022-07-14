import React from 'react';
import './App.css';
import SearchHeader from './components/SearchHeader';
import TableInfo from './components/TableInfo';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <div>
        <SearchHeader />
        <TableInfo />
      </div>
    </Provider>
  );
}

export default App;
