import React from 'react';
import './App.scss';
// import { UserLocation } from './Components/UserLocation/UserLocation.jsx';
// import { UserInput } from './Components/UserInput/UserInput';
import { LocationTest } from './Components/LocationTest/LocationTest';


import trailSpot from './assets/images/trailspot.png';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={trailSpot} alt='logo'/>
      </header>

      <div>

    <LocationTest />
      {/* <UserLocation />
        
      <UserInput/> */}
        

      </div>
      
    </div>
  );
}

export default App;
