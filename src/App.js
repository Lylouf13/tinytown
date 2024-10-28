
import './App.css';
import Town from './Components/Town';
import FightPreview from './Components/FightPreview/FightPreview';
import { GameProvider } from './Utils/GameContext';

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
