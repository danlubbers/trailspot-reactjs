import React from 'react';
import './App.scss';
import { UserLocation } from './Components/UserLocation/UserLocation.jsx';

import trailSpot from './assets/images/trailspot.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={trailSpot} alt='logo'/>
      </header>

      <div>
        <UserLocation />
      </div>
      
    </div>
  );
}

export default App;
