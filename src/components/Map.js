import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import '../css/map.css'
import { drawCircleOnMap } from '../utils/mapUtil'

function Map({center, zoom, countries, caseType}) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {drawCircleOnMap(countries, caseType)}
      </LeafletMap>
    </div>
  )
}

export default Map
