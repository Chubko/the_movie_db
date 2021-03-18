import React from 'react';

import { BaseLayout } from './layouts';
import { Home } from './pages';
import logo from './logo.svg';
import './App.css';



function App() {

  return (
    <BaseLayout>
      <Home/>
    </BaseLayout>
  );
}

export default App;
