import StartFirebase from '../firebaseConfig/index';
import React from 'react';
import {ref, onValue, query, orderBy, limitToLast} from 'firebase/database';
import Plot from 'react-plotly.js';
import axios from 'axios';


const db = StartFirebase();

export class Graph extends React.Component{
    constructor(){
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount(){

        var url = 'https://iotmod3-default-rtdb.asia-southeast1.firebasedatabase.app/.json'
        var headers = {
            headers: {
                'Content-Type' : 'application/json',
                'apikey' : 'AIzaSyAdtbB768d4ziF8ThscS3colfZNMuZ1DLQ'
            }
        }
            axios.get(url,headers)
            .then((x) => {
                console.log(x)
                this.setState({
                    data: x.data.Try['']
                })
            })
            .catch(() => {
                alert('Failed to get data')
            })

    
    }

    render(){
        return(
                
                        <Plot 
                          data={[
                              {
                                  x: [0,1,2,3,4,5,6,7],
                                  y: [20,30,34,19,34,19,20,25],
                                  type: 'scattergl',
                                  mode: 'lines',
                                  marker: {color: 'blue'},
                                  
                              },
                          ]}
                          layout={{paper_bgcolor:'rgba(0,0,0,0)',
                                    plot_bgcolor:'rgba(0,0,0,0)', 
                                    width:460, 
                                    height: 500}}

                      /> 
                      
        )
    }
}