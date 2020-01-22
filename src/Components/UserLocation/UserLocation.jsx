import React, { useState, useEffect } from 'react';
import './_UserLocation.scss';
import axios from 'axios';
import config from '../../config';

export const UserLocation = () => {

  const [toggleStateDegrees, setToggleStateDegrees] = useState(false);
  const [toggleStatePressure, setToggleStatePressure] = useState(false);
  const [userWeatherMain, setUserWeatherMain] = useState({});
  const [userWeather, setUserWeather] = useState({});
  const [weatherIcon, setWeatherIcon] = useState({});
  const [userLocation, setUserLocation] = useState([]);
  const [trailsData, setTrailsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getData = async () => {
    
    try {
      const cors = `https://cors-anywhere.herokuapp.com/`;

      // IP Location:
      const res = await axios.get(`https://ipapi.co/json/`); 
      setUserLocation(res.data)
      
      const lat = res.data.latitude;
      const long = res.data.longitude;
      console.log(lat, long);

      // Weather
      const weatherAPI = config.WEATHER_API;
      
      // Static Testing
      // const weather = await axios.get(`${cors}http://api.openweathermap.org/data/2.5/weather?lat=40.0150&lon=-105.2705&&appid=${weatherAPI}`);

      const weather = await axios.get(`${cors}http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weatherAPI}`);
      setUserWeatherMain(weather.data.main);
      setUserWeather(weather.data.weather[0]);
      setWeatherIcon(weather.data.weather[0].icon);
  
      
      // TRAILS
      const apiTrailsKey = config.API_KEY_REI;

      const trailsAPI = await axios.get(`${cors}https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=10&key=${apiTrailsKey}`);
      setTrailsData(trailsAPI.data.trails);
      console.log(trailsAPI.data.trails);
      
      // STATIC TESTING for Boulder, CO
      // const trailsAPI = await axios.get(`${cors}https://www.hikingproject.com/data/get-trails?lat=40.0150&lon=-105.2705&maxDistance=10&key=${apiTrailsKey}`);
      // setTrailsData(trailsAPI.data.trails);

      setIsLoading(true);
    
    } catch(err) {
      setError(err)
      console.log(error)
    }
  }
  
  useEffect(() => {

    // console.log(trailsData);
    console.log(weatherIcon);
    // console.log(userLocation.city);
  });
  
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
    <>
      <div className='search-container'>
        <h2>Search for an area based on your current location</h2>
        <button id='apiLocator' className='apiLocator' onClick={getData}>Search</button>
      </div>
      
      {isLoading &&
        <div id='location-results-container' className='location-results-container'>
          <div id='area-container' className='area-container'>
            <h2>We have found trails around the area of:</h2>
              <div className="city-state">
                <h2 className='city-text-location'>{userLocation.city}</h2> 
                <h2 className='region-text-location'>{userLocation.region}</h2>
              </div>
          </div> 
        </div>
      }

      {isLoading && 
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
      }

      {trailsData.map((e, i) => {

        return (
          <div key={++i} className='trail-results-container'>

            <div className='trail-name-location-container'>
              <h2 className='text name'>{e.name}</h2>
              <h3 className='text location'>{e.location}</h3>
              <h4 className='text summary'>{e.summary}</h4>

              <div className='trail-details-container'>
                <h4><strong>Trail Length:</strong> {e.length}mi</h4>
                <h4><strong>Max Elevation:</strong> {e.high}ft</h4>
                <h4><strong>Min Elevation:</strong> {e.low}ft</h4>
                <h4><strong>Trail Conditions:</strong> {e.conditionStatus}</h4>
                <h4><strong>Conditions Details:</strong> {e.conditionDetails}</h4>
                <h4><strong>Last Date Conditions were updated:</strong> {e.conditionDate}</h4>
              </div>

              <div>
                <img className='trail-image' src={e.imgSmallMed} alt={e.name}/>
              </div>
              <div className='horizontal-line'></div>
              </div>

          </div>
        )
      })}
    </>
  )
};

