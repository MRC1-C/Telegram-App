import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
const position = [51.505, -0.09];

export default class TestMap extends Component {
  render() {
    return (
      <div>
        <Map
          style={{ height: "500px", borderRadius: "4px" }}
          center={position}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}