
import './App.css';
import React from 'react';
import Town from './components/Town.tsx';
import FightPreview from './features/FightPreview/FightPreview.tsx';
import { GameProvider } from './utils/GameContext.tsx';

function App() {

  return (
    <div className="App">
      <GameProvider>
        <Town />
        <FightPreview />
      </GameProvider>
    </div>
  );
}

export default App;
