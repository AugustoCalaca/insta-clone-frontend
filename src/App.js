import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './global.css';

import Header from './components/header';
import Routes from './router';

const App = _ => {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
