import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { GetWeatherLocation } from '../getWeatherLocation/getWeatherLocation';
import { TrailsData } from '../TrailsData/TrailsData';

export const LocationAPI = () => {
  const [cityInput, setCityInput] = useState('');
  const [stateInput, setStateInput] = useState('');
  const [userWeatherMain, setUserWeatherMain] = useState({});
  const [userWeather, setUserWeather] = useState({});
  const [weatherIcon, setWeatherIcon] = useState({});
  const [userLocation, setUserLocation] = useState([]);
  const [trailsData, setTrailsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // API's
  const cors = `https://cors-anywhere.herokuapp.com/`;
  const apiOpenCageKey = config.API_KEY_OPENCAGE;
  const weatherAPI = config.WEATHER_API;
  const apiTrailsKey = config.API_KEY_REI;

  // Capitalize every first letter
  const cityInputCaps = cityInput.split(' ').map(word => {
    return word.slice(0, 1).toUpperCase() + word.slice(1);
  }).join(' ');
  // Capitalize state abbreviation
  const stateInputCaps = stateInput.toUpperCase();


  const getLocationData = async () => {
    
    try {

      // IP Location API:
      const res = await axios.get(`https://ipapi.co/json/`); 
      const lat = res.data.latitude;
      const long = res.data.longitude;
      setUserLocation(res.data)
      
      // Weather API
      const weather = await axios.get(`${cors}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weatherAPI}`);
      setUserWeatherMain(weather.data.main);
      setUserWeather(weather.data.weather[0]);
      setWeatherIcon(weather.data.weather[0].icon);
  
      // Trails API
      const trailsAPI = await axios.get(`${cors}https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=10&key=${apiTrailsKey}`);
      setTrailsData(trailsAPI.data.trails);

      setIsLoading(true);
      setCityInput('');
      setStateInput('');
    
    } catch(err) {
      setError(err)
      console.log(error)
    }
  }
  
  // Handling USER INPUTS
  const handleCityChange = e => {
    setCityInput(e.target.value)
  }
  
  const handleStateChange = e => {
    setStateInput(e.target.value)
  }

  //  USER INPUT FORM
  const handleSubmit = e => {
    e.preventDefault();

    const elements = [...e.target.elements].filter(e => {
      return e.matches('input')
    });

    let isValid = true;
    elements.forEach(e => {
      if (e.value) {
        e.classList.remove('error');
      } else {
        isValid = false;
        e.classList.add('error');
      }
    })

    if(!isValid) return;
  
    (async () => {
    
      try {  

        // OpenCage API for CITY/State to Lat/Long
        const userInput = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${cityInput}%20${stateInput}&key=${apiOpenCageKey}`);
        const lat = userInput.data.results[0].geometry.lat;
        const long = userInput.data.results[0].geometry.lng;
         
        const weather = await axios.get(`${cors}http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weatherAPI}`);
        setUserWeatherMain(weather.data.main);
        setUserWeather(weather.data.weather[0]);
        setWeatherIcon(weather.data.weather[0].icon);
    
        const trailsAPI = await axios.get(`${cors}https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=10&key=${apiTrailsKey}`);
        setTrailsData(trailsAPI.data.trails);
        // console.log(trailsAPI.data.trails);

        setIsLoading(true);
        // Resets UserLocation for conditional rendering in className='city-text-location' for displaying correct city and state 
        setUserLocation('');
        
      } catch(err) {
        setError(err)
        console.log(error)
      }
    }
    )();
    // Clears input fields
    e.target.reset();
    // resets TrailsData so if 0 trails are found will output the correct number of trails
    setTrailsData([]);
  }

  // Clear Results
  const clearResults = () => {
    setIsLoading(false);
    setCityInput('')
    setStateInput('')
  }

  useEffect(() => {
    // console.log(trailsData);
    // console.log(weatherIcon);
    // console.log(userLocation.city);
  }, [weatherIcon]);


  return (
    <>
      <div className='search-container'>
        <h2>Search for an area based on your current location</h2>
        <button id='apiLocator' className='apiLocator' onClick={getLocationData}>Search</button>
      </div>

      <form action='POST' className='search-container' onSubmit={handleSubmit}>
        <h2>Search for an area by city & state: </h2>
        <div className='input-container'>
          <input className='city-search' type="text" placeholder='Ex. Grand Canyon' aria-label='city input' value={cityInput.value} onBlur={handleCityChange}/>
          <input className='state-search' type="text" placeholder='Ex. AZ' aria-label='state input' value={stateInput.value} onBlur={handleStateChange}/>
        </div>
        <button type="submit" className='userSearchInput button' value='Search'>Search</button>
      </form>
      
      <div className='clear-button-container'>
        <button className='clear-button' onClick={clearResults}>CLEAR RESULTS</button>
      </div>

      {isLoading &&
        <div id='location-results-container' className='location-results-container'>
          <div id='area-container' className='area-container'>
            <h2>We have found {trailsData.length} trails around the area of:</h2>
              <div className="city-state">
                <h2 className='city-text-location'>{userLocation.city ? userLocation.city : cityInputCaps}</h2> 
                <h2 className='region-text-location'>{userLocation.region ? userLocation.region : stateInputCaps}</h2>
              </div>
          </div> 

          <GetWeatherLocation userWeather={userWeather} userWeatherMain={userWeatherMain}  weatherIcon={weatherIcon}/>

          {trailsData.length !== 0 ? 
            <TrailsData trailsData={trailsData}/> :
            <h2>No Data</h2>
          }
        </div>
      }
      
    </>
  )
};

