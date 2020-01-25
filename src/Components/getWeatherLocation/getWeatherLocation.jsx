import React, { useState } from 'react';
import './_getWeatherLocation.scss';

export const GetWeatherLocation = (props) => {
  const [toggleStateDegrees, setToggleStateDegrees] = useState(false);
  const [toggleStatePressure, setToggleStatePressure] = useState(false);

  // Weather Variable Data
  const fahrenheit = Math.floor(((props.userWeatherMain.temp - 273.15) * 1.8) + 32);
  const celcius = Math.round((fahrenheit - 32) / 1.8);
  const pressureMb = props.userWeatherMain.pressure; 
  const pressureInches = (props.userWeatherMain.pressure * 0.0295301).toFixed(2);
  const humidity = props.userWeatherMain.humidity;
  const icon = `http://openweathermap.org/img/wn/${props.weatherIcon}@2x.png` ;


  function toggleDegrees() {
    setToggleStateDegrees(toggleStateDegrees ? false : true);
  }
  
  function togglePressure() {
    setToggleStatePressure(toggleStatePressure ? false : true);
  }

  return (
    <div>

      {props.isLoading && 
        <div className='weather-container'>
          <h1 className='text'>Current Weather Conditions</h1>
          <img className='weather-icon' src={icon} alt='weather icon'/>
          <h2 className='description text'>{props.userWeather.description}</h2>
          <h2 className='degrees text'>{!toggleStateDegrees ? fahrenheit : celcius}{!toggleStateDegrees ? '° F' : '° C'}</h2>
                
          <div className='pressure-humidity-container'>
            <span className='pressure text'>Pressure: {!toggleStatePressure ? pressureInches : pressureMb}{!toggleStatePressure ? 'in' : 'mb'}</span>
            <span className='humidity text'>Humidity: {humidity}%</span>
          </div>
          <div className='pressure-humidity-container'>
            <button onClick={togglePressure}>in / mb</button>
            <button onClick={toggleDegrees}>F / C</button>
          </div>
        </div>
      }
    </div>
  )
}