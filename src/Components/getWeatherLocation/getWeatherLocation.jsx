import React from 'react';
import './_getWeatherLocation.scss';
// import config from '../../config';
// import axios from 'axios';

export const GetWeatherLocation = async (lat, long) => {
  console.log("Weather Test: ", lat, long)
  try {
    // const weatherAPI = config.WEATHER_API;
    // const cors = `https://cors-anywhere.herokuapp.com/`;

    // const weather = await axios.get(`${cors}http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weatherAPI}`);
    // console.log(weather);

  } catch(err) {
      console.log(err);
  }

  return (
    <div>
     <h2>Weather Test</h2>
    </div>
  )
}