import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { observer, inject } from "mobx-react";
@inject("rootStore")
@observer
class TestMap extends Component {
  render() {
    const {
      rootStore: { productStore },
    } = this.props;
    const lat = productStore.data[0]?.producer[0]?.locationLat || 51.505;
    const long = productStore.data[0]?.producer[0]?.locationLlong || -0.09;
    const position = [lat, long];
    return (
      <div>
        <Map
          style={{ height: "calc(100vh - 150px)", borderRadius: "4px" }}
          center={position}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {productStore.data?.map((dt) =>
            dt.producer.map((pr) => (
              <Marker key={pr.key} position={[pr.locationLat, pr.locationLong]}>
                <Popup>{dt.name}</Popup>
              </Marker>
            ))
          )}
        </Map>
      </div>
    );
  }
}

export default TestMap;
