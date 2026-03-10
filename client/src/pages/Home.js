import React from 'react'
import {Link, useLocation,NavLink} from "react-router-dom";
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Button } from 'react-bootstrap';
import Dashboard from './Dashboard';
import "../components/css/Home.css";

//import { DropDown } from './components/DropDown'; 

const Home = () => {
  return (
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Select Place
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <NavLink className="nav-link" to="/dashboard" exact>
            <i 
            className="fas fa-tachometer-alt">
            </i>Sungai Isap
        </NavLink>
        <NavLink className="nav-link" to="/dashboardSgSoi" exact>
            <i 
            className="fas fa-tachometer-alt">
            </i>Sungai Soi
        </NavLink>
      </div>

      <Dashboard/>
    </div>

    
  )
}

export default Home