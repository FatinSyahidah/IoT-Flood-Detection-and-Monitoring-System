import React, { useEffect, useState } from 'react'
import {Link, useLocation,NavLink} from "react-router-dom";
import "../components/css/Dashboard.css";
import { FloodRecord } from '../components/data';
import DateTime from './DateTime';
import { Query } from '../components/Query/Query';
import { QueryHum } from '../components/Query/QueryHum';
import { QueryWater } from '../components/Query/QueryWater';
import humLogo from '../components/logo/hum.png';
import tempLogo from '../components/logo/temp.png';
import watLogo from '../components/logo/wat.png';
import timeLogo from '../components/logo/time.png';
import { GraphRealTime } from './GraphRealTime';

const Dashboard = () => {

    /*useEffect(() => {
        const iframeData = document.getElementById("iframeId")
        const lat = 3.8083;
        const long = 103.3419;
        iframeData.src=`https://maps.google.com/maps?q=${lat},${long}&hl=es;&output=embed`
    })*/
    
    
    return (
        <div className='Dashboard'>
        <h4>Sungai Kuantan Dashboard</h4>
        <div class="dropdown">
            <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Select Place
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <NavLink className="nav-link" to="/dashboard" exact>
                    Sungai Kuantan
                </NavLink>
                <NavLink className="nav-link" to="/dashboardSgSoi" exact>
                    Sungai Soi
                </NavLink>
            </div>
        </div>
        <br/>
        <div class="content2">
            <div class="card-grid3">
                <div class="card-dash">
                    <p class="card-title"><img src={timeLogo} alt="Time" className='photo'/>Date & Time</p>
                        <DateTime />
                
                </div>
                
                <div class="card-dash">
                    <p class="card-title"><img src={tempLogo} alt="Temp" className='photo'/>Temperature</p>
                        <Query />
                </div>

                <div class="card-dash">
                    <p class="card-title"><img src={humLogo} alt="Hum" className='photo'/>Humidity</p>
                    <h3><QueryHum/></h3>
                    <br/><br/>
                </div>

            </div>
        </div>
        <div class="content2">
            <div class="card-grid3">
                <div class="card-dash-2">
                    <p class="card-title">Real-Time Water Level at Sungai Kuantan</p>
                    <GraphRealTime/>
                   
                </div>
                <div class="card-dash-3">
                    <p class="card-title"><img src={watLogo} alt="Wat" className='photo'/>Water Level</p>
                    <br/>
                    <h3><QueryWater/></h3>
                    <br/><br/>
                </div>
            </div>
 
        </div>
        <br/> <br/>
    </div>
       
    );
}

export default Dashboard