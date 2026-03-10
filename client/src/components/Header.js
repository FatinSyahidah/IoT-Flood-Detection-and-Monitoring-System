import React, {useEffect, useState} from 'react'
import {Link, useLocation,NavLink} from "react-router-dom";
import "./css/Header.css"
import { Button } from "react-bootstrap";
import $ from 'jquery';
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";

const Header = () => {
    const { logOut, user } = useUserAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
        await logOut();
        navigate("/");
        } catch (error) {
        console.log(error.message);
        }
    };

    useEffect(() => {
    
        animation();
        $(window).on('resize', function(){
          setTimeout(function(){ animation(); }, 500);
        });
        
      }, []);

    function animation(){
        var tabsNewAnim = $('#navbarSupportedContent');
        var activeItemNewAnim = tabsNewAnim.find('.active');
        var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
        var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
        var itemPosNewAnimTop = activeItemNewAnim.position();
        var itemPosNewAnimLeft = activeItemNewAnim.position();
        $(".hori-selector").css({
          "top":itemPosNewAnimTop.top + "px", 
          "left":itemPosNewAnimLeft.left + "px",
          "height": activeWidthNewAnimHeight + "px",
          "width": activeWidthNewAnimWidth + "px"
        });
        $("#navbarSupportedContent").on("click","li",function(e){
          $('#navbarSupportedContent ul li').removeClass("active");
          $(this).addClass('active');
          var activeWidthNewAnimHeight = $(this).innerHeight();
          var activeWidthNewAnimWidth = $(this).innerWidth();
          var itemPosNewAnimTop = $(this).position();
          var itemPosNewAnimLeft = $(this).position();
          $(".hori-selector").css({
            "top":itemPosNewAnimTop.top + "px", 
            "left":itemPosNewAnimLeft.left + "px",
            "height": activeWidthNewAnimHeight + "px",
            "width": activeWidthNewAnimWidth + "px"
          });
        });
      }

    return (
        <nav className="navbar navbar-expand-lg navbar-mainbg">
          
            <NavLink className="navbar-brand navbar-logo" to="/" exact>
              Flood Detection & Monitoring
            </NavLink>
          
            <button 
              className="navbar-toggler"
              onClick={ function(){
                setTimeout(function(){ animation(); });
              }}
              type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <i className="fas fa-bars text-white"></i>
            </button>
       
            <div 
              className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                  
                  <div className="hori-selector">
                    <div className="left"></div>
                    <div className="right"></div>
                  </div>
                  
                  <li className="nav-item active">
                    <NavLink className="nav-link" to="/dashboard" exact>
                      <i 
                      className="fas fa-tachometer-alt">
                      </i>Dashboard
                    </NavLink>
                  </li>
      
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/analytics" exact>
                      <i 
                      className="far fa-chart-bar">
                      </i>Analytics
                    </NavLink> 
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="/device" exact>
                      <i 
                      className="fas fa-solid fa-desktop">
                      </i>Devices
                    </NavLink> 
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="" exact>
                      <i 
                      className="far fa-solid fa-user">
                      </i>{user && user.email}
                    </NavLink>
                  </li>
                  </ul>
                    <Button className="nav-link2" variant="link" onClick={handleLogout}>
                      <i class="fas fa-sign-out-alt"></i>
                    </Button>
                 
              
            </div>
        </nav>
        )
}

export default Header