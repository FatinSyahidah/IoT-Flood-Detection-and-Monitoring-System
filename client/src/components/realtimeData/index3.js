import React, { Component } from 'react'  
import BootstrapTable from 'react-bootstrap-table-next';  
import axios from 'axios';  
import {ref, onValue, query, orderBy, limitToLast, get, child} from 'firebase/database';
import StartFirebase from '../firebaseConfig/index';


const db = StartFirebase();


export class RealtimeData3 extends React.Component{
  constructor(){
      super();
          this.state = {
              tableData: []
          }
  }
  componentDidMount(){
     
      const que = query(ref(db, "SgKuantan"), limitToLast(10));
  
      onValue(que, (snapshot)=>{
          let records = [];
          snapshot.forEach(childSnapshot=>{
              let keyName = childSnapshot.key;
              let data = childSnapshot.val();
              records.push({"key":keyName, "data": data});
          });
          this.setState({tableData: records});

      });
  }

  downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob(
        [["  Timestamp : "]   ,document.getElementById('times').value,
         ["  Temperature : "] ,document.getElementById('fs').value,
         ["  Humidity  : "] ,document.getElementById('hs').value,
         ["  Water Level : "] ,document.getElementById('ts').value,
         ["           "]
        ], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "SgKuantanReport.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  render(){
      return(
        <div className="condition">
            <button 
                        onClick={this.downloadTxtFile}
                        variant="outlined" 
                        >Download
                    </button>
       
        {this.state.tableData.map((rowd,index)=>{
            return(
                <div>
               
                <input id="times" value={rowd.data.Timestamp}  />
                <input id="fs" value={rowd.data.Temperature} type="hidden"/>
                <input id="hs" value={rowd.data.Humidity} type="hidden"/>
                <input id="ts" value={rowd.data.WaterLevel} type="hidden"/>

                </div>
        
        )})}
        </div>
      )
  }
}

