import React from 'react';
import './App.scss';
import trailSpot from './assets/images/trailspot.png';
import { LocationAPI } from './Components/LocationAPI/LocationAPI';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={trailSpot} alt='logo'/>
      </header>

      <div>
        <LocationAPI />
      </div>
      
    </div>
  );
}

export default App;
