import React from 'react';
import './App.css';
import TableInfo from './components/TableInfo';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <TableInfo />
    </Provider>
  );
}

export default App;
