import React from 'react';
import { Circle, Popup } from 'react-leaflet';
import numeral from 'numeral';
import {colors } from './helper'

export const drawCircleOnMap = (countries, caseType = "cases") => {

  return countries.map((country) => (
     <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}fillOpacity={0.4}
      color={colors[caseType].color}
      fillColor={colors[caseType].color}
      radius={
        Math.sqrt(country[caseType]) * colors[caseType].multiplier
      }
     >
       <Popup>
         <div className="info-container">
           <div
           className="info-flag"
           style={{backgroundImage: `url(${country.countryInfo.flag})`}}
           />
           <div className="info-name">{country.country}</div>
           <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
           <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
           <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
         </div>
       </Popup>
     </Circle>
  ))
}
