import React, { useState, useEffect } from 'react'
import {NavLink} from "react-router-dom";
import Plot from 'react-plotly.js';
import '../components/css/Analytics.css'
import { Alarm2 } from '../components/Alarm/Alarm2';
import { RealtimeData2 } from '../components/realtimeData/index2';
import Chart from "react-apexcharts";

const AnalyticsSgSoi = () => {

  const [data, setData] = useState([{}])
  
  useEffect(() => {
    fetch("/forecastSgSoi").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div className='Analytics'>
     <p class="card-titleG">Analytics</p>
      <div class="dropdown">
            <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Select Place
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <NavLink className="nav-link" to="/analytics" exact>
                    Sungai Kuantan
                </NavLink>
                <NavLink className="nav-link" to="/analyticsSgSoi" exact>
                    Sungai Soi
                </NavLink>
            </div>
        </div>
       <div class="content2">
       <p class="card-titleG-1">Water Level Prediction at Sungai Soi</p>
          <div class="card-analytics">
              <div class="card-analytics-1">
              <Chart
              
              options={
                {
                    chart: {
                    
                      height: 350,
                      type: 'area'
                    },
                    dataLabels: {
                      enabled: false
                    },
                    stroke: {
                      curve: 'smooth'
                    },
                    xaxis: {
                      
                      categories: data.forecastDate,
                      labels: {
                        show: true,
                        rotate: -30,
                        rotateAlways: false,
                      },
                      title: {
                        text: 'Date',
                        offsetX: 0,
                        offsetY: 0,
                        style: {
                            color: undefined,
                            fontSize: '12px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 600,
                            cssClass: 'apexcharts-xaxis-title',
                        },
                    },
                    },
                    yaxis: {
                        max: 15,
                        min : 0,
                        
                        title: {
                          text: 'Water Level (cm)',
                          offsetX: 0,
                          offsetY: 0,
                          style: {
                              color: undefined,
                              fontSize: '12px',
                              fontFamily: 'Helvetica, Arial, sans-serif',
                              fontWeight: 600,
                              cssClass: 'apexcharts-xaxis-title',
                          },
                      },
                      },
                    tooltip: {
                      x: {
                        format: 'dd/MM/yy HH:mm'
                      },
                    },
                    colors: ['#9914e1'],
                    markers: {
                      size: 0,
                      colors: undefined,
                      strokeColors: '#fff',
                      strokeWidth: 2,
                      strokeOpacity: 0.9,
                      strokeDashArray: 0,
                      fillOpacity: 1,
                      discrete: [],
                      shape: "circle",
                      radius: 2,
                      offsetX: 0,
                      offsetY: 0,
                      onClick: undefined,
                      onDblClick: undefined,
                      showNullDataPoints: true,
                      hover: {
                        size: undefined,
                        sizeOffset: 3
                      }
                  }
                  }
              }
              series={
                [{
                    name: 'Water Level (cm)',
                    data: data.forecastLevel
                  }
                ]
              }
              type="area"
              height={400} 
              width={670}
             
            />
              
              </div>
              <div class="card-analytics-2">
                <p class="card-title-1">Water Level Alerts</p>
                <p class="card-title-2">Records of high water level at Sungai Soi</p>
                  <Alarm2/>
              </div>
          </div>
        </div>
        <div class="content2">
        <p class="card-titleG-1">Real-time Data Stream at Sungai Soi</p>
          <div class="card-analytics">
              <div class="card-analytics-3">
                  <RealtimeData2/>
              
              </div>
          </div>
        </div>
        <br/><br/>
    </div>
  )
}

export default AnalyticsSgSoi