import React, { useRef, useState } from 'react';
import {NavLink} from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import osm from '../components/Maps/osm-providers';
import "../components/css/Device.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import devices from "../components/Maps/devices.json";
import { Datamap } from '../components/Maps/Datamap';
import { Datamap2 } from '../components/Maps/Datamap2';

const markerIcon = new L.Icon({
  iconUrl: require("../components/logo/map.png"),
  iconSize: [35,45],
  iconAnchor: [17, 46],
  popupAnchor: [0,-46],
});

const Device = () => {
  const [center, setCenter] = useState({ lat: 3.8126, lng: 103.3256 });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();


  return (
    <div className='Device'>
      <p class="card-titleD">Devices</p>
      <div class="content-device">
        <p class="card-titleDevice-1">Location of the Devices</p>
          <div class="card-device">
              <div class="card-device-1">
                <MapContainer

                  center = {center}
                  zoom = {ZOOM_LEVEL}
                  ref={mapRef}

                >
                  <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />

                   <Marker 
                        position={[3.8083 ,103.3419 ]} 
                        icon={markerIcon}
                    >
                        <Popup>
                          <b>DV_01_SungaiKuantan
                              <br/>
                            <Datamap/>
                            <NavLink className="nav-link" to="/dashboard" exact>
                                Open Details
                            </NavLink>
                          </b>
                        </Popup>
                    </Marker>
                    <Marker 
                        position={[3.7338 , 103.3178 ]} 
                        icon={markerIcon}
                       
                    >
                        <Popup>
                          <b>DV_02_SungaiSoi
                              <br/>
                              <Datamap2/>
                              <NavLink className="nav-link" to="/dashboardSgSoi" exact>
                                  Open Details
                              </NavLink>
                          </b>
                        </Popup>
                    </Marker>
                </MapContainer>
              </div>
          </div>
          <br/>
      </div>
    </div>
  )
}

export default Device