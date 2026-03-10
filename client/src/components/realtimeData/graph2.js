import StartFirebase from '../firebaseConfig/index';
import React from 'react';
import {ref, onValue, query, orderBy, limitToLast} from 'firebase/database';
import Plot from 'react-plotly.js';
import axios from 'axios';


const db = StartFirebase();

export class Graph2 extends React.Component{
    constructor(){
        super();
        this.state = {
            tableData: []
        }
    }

    componentDidMount(){
        
            const que = query(ref(db, "Try"), limitToLast(5));

            onValue(que, (snapshot) => {
                var temps = [];
    
                snapshot.forEach(childSnapshot => {
                    let key = childSnapshot.key;
                    let value = childSnapshot.val();
                    temps.push({"key": key, "value":value});
                });
                //AddAllItemsToTable(temps);
                console.log(temps)
                this.setState({
                    tableData: temps
                });

            });
    
    }

    render(){
        //get variables : temp, hum, water level
        var temp = this.state.tableData.map((row, i) => {
            //console.log(temp)
            return row.value.Temperature
        })

        var time = this.state.tableData.map((row, i) => {
            //console.log(temp)
            return row.value.Timestamps
        })

     

        return(
                <div>
                
                {
                    this.state.tableData
                    ?
                    <Plot 
                        data={[
                            {
                                x: time ? time : 0,
                                y: temp ? temp : 0,
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
                     :
                     <div></div>
                }
                </div>    
        )
    }
}