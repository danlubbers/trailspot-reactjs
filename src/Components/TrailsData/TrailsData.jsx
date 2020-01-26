import React from 'react';
import propTypes from 'prop-types';
import './_TrailsData.scss';

export const TrailsData = (props) => {

  return (
    <>
      {props.trailsData.map((e, i) => {

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
}
TrailsData.propTypes = {
  trailsData: propTypes.array,
}