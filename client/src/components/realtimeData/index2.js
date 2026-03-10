import React, { Component } from 'react'  
import BootstrapTable from 'react-bootstrap-table-next';  
import axios from 'axios';  
import {ref, onValue, query, orderBy, limitToLast, get, child} from 'firebase/database';
import StartFirebase from '../firebaseConfig/index';

const db = StartFirebase();

export class RealtimeData2 extends React.Component{
  constructor(){
      super();
      this.state = {
          tableData: []
      }
  }
  componentDidMount(){
      const que = query(ref(db, "SgSoi"), limitToLast(10));

      onValue(que, (snapshot) => {
          var records = [];

          snapshot.forEach(childSnapshot => {
              let key = childSnapshot.key;
              let data = childSnapshot.val();
              records.push({"key": key, "data":data});
          });
          //AddAllItemsToTable(temps);
          this.setState({tableData: records});
      });

  }

  render(){
      return (
        <table class="table table-borderless">
            <tr>
              <th>Timestamps</th>
              <th>Temperature (°C)</th>
              <th>Humidity (%)</th>
              <th>Water Level (cm)</th>
              <th>Status</th>
            </tr>
          <tbody>
              {this.state.tableData.map((row,index)=>{
                  return(
                  <tr>
                      <td>{row.data.Timestamps}</td>
                      <td>{row.data.Temperature}</td>
                      <td>{row.data.Humidity}</td>
                      <td>{row.data.WaterLevel}</td>
                      <td>{row.data.Status}</td>
                  </tr>
                  )
              })}
          </tbody>
      </table>

      )
  }
}
