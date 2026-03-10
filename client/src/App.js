import React from 'react';
import {BrowserRouter, Switch, Route, Router, Routes} from "react-router-dom";
import './App.css';
import Analytics from './pages/Analytics';
import Dashboard from './pages/Dashboard';
import AnalyticsSgSoi from './pages/AnalyticsSgSoi';
import DashboardSgSoi from './pages/DashboardSgSoi';
import ReportSgSoi from './pages/ReportSgSoi';
import ProtectedRoute from './pages/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { UserAuthContextProvider } from './context/UserAuthContext';
import { GraphRealTime } from './pages/GraphRealTime';
import Device from './pages/Device';

function App() {
  return (
    <BrowserRouter>
      <UserAuthContextProvider>
      <div className="App">
            <div className="AppGlass">
        <Routes>
         
                <Route exact path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" 
                  element={
                    <ProtectedRoute>
                    <Header />
                    <Dashboard/>
                    </ProtectedRoute>
                  }/>
              <Route path="/dashboardSgSoi" 
                  element={
                    <ProtectedRoute>
                    <Header />
                    <DashboardSgSoi/>
                    </ProtectedRoute>
                  }/>
              <Route path="/analytics" 
                  element={
                    <ProtectedRoute>
                    <Header />
                    <Analytics/>
                    </ProtectedRoute>
                  }/>
              <Route path="/analyticsSgSoi" 
                  element={
                    <ProtectedRoute>
                    <Header />
                    <AnalyticsSgSoi/>
                    </ProtectedRoute>
                  }/>
              <Route path="/device" 
                  element={
                    <ProtectedRoute>
                    <Header />
                    <Device/>
                    </ProtectedRoute>
                  }/>
              <Route path="/reportSgSoi" 
                  element={
                    <ProtectedRoute>
                    <Header />
                    <ReportSgSoi/>
                    </ProtectedRoute>
                  }/>

              <Route path="/graphRealTime" 
                  element={
                    <ProtectedRoute>
                    <Header />
                    <GraphRealTime/>
                    </ProtectedRoute>
                  }/>
            
             
        
        </Routes>
        </div>
        </div>
      </UserAuthContextProvider>
    </BrowserRouter>
  
   
  );
}

export default App;
