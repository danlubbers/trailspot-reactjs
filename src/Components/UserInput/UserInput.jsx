import React, { useState, useEffect } from 'react';
import './_UserInput.scss';
import axios from 'axios';
import config from '../../config';
import { GetWeatherLocation } from '../getWeatherLocation/getWeatherLocation';
import { TrailsData } from '../TrailsData/TrailsData';

export const UserInput = () => {
  const [cityInput, setCityInput] = useState('');
  const [stateInput, setStateInput] = useState('');
  const [userWeatherMain, setUserWeatherMain] = useState({});
  const [userWeather, setUserWeather] = useState({});
  const [weatherIcon, setWeatherIcon] = useState({});
  const [trailsData, setTrailsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getUserInput = async () => {
    
    try {
      const apiOpenCageKey = config.API_KEY_OPENCAGE;
      const cors = `https://cors-anywhere.herokuapp.com/`;

      
      const userInput = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${cityInput}%20${stateInput}&key=${apiOpenCageKey}`);
  
      const lat = userInput.data.results[0].geometry.lat;
      const long = userInput.data.results[0].geometry.lng;
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
    // console.log(cityInput)
    // console.log(stateInput)
  }, [weatherIcon]);

  const handleCityChange = (e) => {
    setCityInput(e.target.value)
  }
  
  const handleStateChange = (e) => {
    setStateInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('FORM: ', e.target.elements)
    const elements = [...e.target.elements].filter(e => {
      return e.matches('input')
    });

    let isValid = true;
    elements.forEach(e => {
      if (e.value) {
        console.log('ERROR: ', e.className)
        console.log(/error/gi.test(e.className));
        console.log(typeof e.className);
        // Figure out logic to get rid of error class, below does not work
          e.className.replace('error', ' ');
      } else {
        isValid = false;
        e.className += " error";
      }
    })

    if(!isValid) return;

    console.log(elements);
    

    getUserInput();
  }

  return (
    <>
      <form action='POST' className='search-container' onSubmit={handleSubmit}>
        <h2>Search for an area by city & state: </h2>
        <input className='city-search' type="text" placeholder='Ex. Grand Canyon' value={cityInput.value} onChange={handleCityChange}/>
        <input className='state-search' type="text" placeholder='Ex. AZ' value={stateInput.value} onChange={handleStateChange}/>
        <button type="submit" className='userSearchInput button' value='Search'>Search</button>
      </form>
      
      {isLoading &&
        <div id='location-results-container' className='location-results-container'>
          <div id='area-container' className='area-container'>
            <h2>We have found trails around the area of:</h2>
              <div className="city-state">
                <h2 className='city-text-location'>{cityInput}</h2> 
                <h2 className='region-text-location'>{stateInput}</h2>
              </div>
          </div> 
        </div>
      }

      <GetWeatherLocation isLoading={isLoading} userWeatherMain={userWeatherMain} userWeather={userWeather} weatherIcon={weatherIcon}/>

      <TrailsData trailsData={trailsData}/>
      
    </>
  )
};

