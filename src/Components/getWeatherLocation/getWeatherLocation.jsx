import React, { useState } from 'react';
import propTypes from 'prop-types';

export const GetWeatherLocation = ({userWeather, userWeatherMain, weatherIcon}) => {
  const [toggleStateDegrees, setToggleStateDegrees] = useState(false);
  const [toggleStatePressure, setToggleStatePressure] = useState(false);

  // Weather Variable Data
  const fahrenheit = Math.floor(((userWeatherMain.temp - 273.15) * 1.8) + 32);
  const celcius = Math.round((fahrenheit - 32) / 1.8);
  const pressureMb = userWeatherMain.pressure; 
  const pressureInches = (userWeatherMain.pressure * 0.0295301).toFixed(2);
  const humidity = userWeatherMain.humidity;
  const icon = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png` ;


  function toggleDegrees() {
    setToggleStateDegrees(toggleStateDegrees ? false : true);
  }
  
  function togglePressure() {
    setToggleStatePressure(toggleStatePressure ? false : true);
  }

  return (
    <div>

     
        <div className='weather-container'>
          <h1 className='text'>Current Weather Conditions</h1>
          <img className='weather-icon' src={icon} alt='weather icon'/>
          <h2 className='description text'>{userWeather.description}</h2>
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
      
    </div>
  )
}

GetWeatherLocation.propTypes = {
  userWeather: propTypes.object,
  userWeatherMain: propTypes.object,
  userWeatherIcon: propTypes.string
}