import logo from './logo512.png';
import { useState } from 'react';
import './App.css';

import Button from './Components/Button';

function App() {

  const [humans, setHumans] = useState(0);
  const [spearmen, setSpearmen] = useState(0);
  const [bowers, setBowers] = useState(0);

  const trainUnit = (threshold, unit) => {
    if (humans >= threshold){
      setHumans(humans-threshold)

      switch(unit){
        case "spearmen":
          setSpearmen(spearmen+threshold)
          break;
        case "bowers":
          setBowers(bowers+threshold)
          break;
      }
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          For here is a town <br/>
          For it is thy burden, <br/>
          Thou shall guide them
        </p>
        <p>{humans} left to guide</p>
        <Button label={"New Week"} function={()=>setHumans(humans+15)}/>
        <p>{spearmen} wearing a spear</p>
        <Button label={"Train 5 Spearmen"} function={()=>trainUnit(5, "spearmen")}/>
        <p>{bowers} wearing a bow</p>
        <Button label={"Train 5 Bowers"} function={()=>trainUnit(5, "bowers")}/>

      </header>
    </div>
  );
}

export default App;
