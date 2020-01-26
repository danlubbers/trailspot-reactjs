import React, { useState, useEffect } from 'react';
import './_UserLocation.scss';
import axios from 'axios';
import config from '../../config';
import { GetWeatherLocation } from '../getWeatherLocation/getWeatherLocation';
import { TrailsData } from '../TrailsData/TrailsData';

export const UserLocation = () => {
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
      // console.log(trailsAPI.data.trails);
      
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
  }, [weatherIcon]);
  

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

      <GetWeatherLocation isLoading={isLoading} userWeather={userWeather} userWeatherMain={userWeatherMain}  weatherIcon={weatherIcon}/>

      <TrailsData trailsData={trailsData}/>

    </>
  )
};

