import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { HomePage } from './home/page';
import { Layout } from './Layout';
import { GamePage } from './game/page';
import { makeGameRoute } from './game/route';
import { LocalStorageContextProvider } from './localStorage/context';

function App() {
  return (
    <div className="App">
      <LocalStorageContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path={makeGameRoute(':token')} element={<GamePage />} />
          </Route>
        </Routes>
      </LocalStorageContextProvider>
    </div>
  );
}

export default App;
