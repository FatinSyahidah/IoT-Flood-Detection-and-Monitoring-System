import React, {useState} from 'react';
import "../components/css/Dashboard.css";
import moment from "moment";
import { update } from 'firebase/database';

const DateTime = () => {

  let date = new Date().toDateString();
  const [currentDate, setCurrentDate] = useState(date);

  let time = new Date().toLocaleTimeString();
  const [currentTime, setCurrentTime] = useState(time);

  const updateTime = () => {
    let time = new Date().toLocaleTimeString();
    setCurrentTime(time);
  }

  const updateDate = () => {
    let date = new Date().toLocaleDateString();
    setCurrentDate(date);
  }

  setInterval(updateTime, 1000);
  

    return (
      <div className="DateTime">
        <h5>{currentDate}</h5>
        <h5>{currentTime}</h5>
      </div>
    );
  }

export default DateTime;