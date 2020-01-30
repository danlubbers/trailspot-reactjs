<p align="center">
  <img src="https://github.com/danlubbers/trailSpot/blob/master/public/assets/images/trailspot.png" alt="trailSpot">
</p>

Live Site: [trailSpot](https://trailspot.danlubbers.com) 

## Description
A web app that gets the users location and gives a selection of trails around the area or the user can search by city/state to find trails for future trips. Current weather conditions are shown for the searched location as well.

## Setup

1. Clone this repo: `https://github.com/danlubbers/trailspot-reactjs`
2. CD into `trailspot`
3. `npm install` dependencies 

You will need to get 'three' API keys from the following sites:
  1. https://www.hikingproject.com/data
  2. https://opencagedata.com/api
  3. https://openweathermap.org/api

Once you have those api keys, create a `config.js` file and set it up like this

```
module.exports = {
  API_KEY_REI : 'Your KEY',
  API_KEY_OPENCAGE : 'Your KEY', 
  API_KEY_WEATHER : 'Your KEY'
}

```

4. After you have created the `config.js` file and added the code above and put in your api keys, you can now run the app.
5. `npm start`

## Author

* **Dan Lubbers**   [danlubbers.com](https://danlubbers.com)