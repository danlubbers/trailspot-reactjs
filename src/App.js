import React from 'react';
import './App.scss';
import { UserLocation } from './Components/UserLocation/UserLocation.jsx';
import { UserInput } from './Components/UserInput/UserInput';

import trailSpot from './assets/images/trailspot.png';

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={trailSpot} alt='logo'/>
      </header>

      <div>
        
          <UserLocation />

        {!props.isLoading &&
          <UserInput props={props.isLoading}/>
        }

      </div>
      
    </div>
  );
}

export default App;
