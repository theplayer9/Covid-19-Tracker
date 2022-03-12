import React from "react";
import { Map as LeaflerMap, TileLayer } from "react-leaflet";
import "./Map.css"
function Map({countries, center,zoom}) {
  return (
    <div className="map">
      <LeaflerMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </LeaflerMap>
    </div>
  );
}

export default Map;
