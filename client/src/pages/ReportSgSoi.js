import React, {useEffect} from 'react'
import "../components/css/Report.css";
import {Link, useLocation,NavLink} from "react-router-dom";
import { RealtimeData } from '../components/realtimeData'
import { RealtimeData2 } from '../components/realtimeData/index2';

const ReportSgSoi = () => {
  return (
    <div className="Report">
      <h4>Sungai Soi Report</h4>
      <div class="dropdown">
            <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Select Place
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <NavLink className="nav-link" to="/report" exact>
                    Sungai Kuantan
                </NavLink>
                <NavLink className="nav-link" to="/reportSgSoi" exact>
                    Sungai Soi
                </NavLink>
            </div>
        </div>
        <RealtimeData2/>
      </div>
  )
}

export default ReportSgSoi