import StartFirebase from '../components/firebaseConfig/index';
import React from 'react';
import {ref, onValue, query, orderBy, limitToLast} from 'firebase/database';
import Plot from 'react-plotly.js';

const db = StartFirebase();

export class GraphRealTimeSoi extends React.Component{
    constructor(){
        super();
        this.state = {
            tableData: []
        }
    }

    componentDidMount(){
        
            const que = query(ref(db, "SgSoi"), limitToLast(10));

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

        var watLevel = this.state.tableData.map((row, i) => {
            //console.log(temp)
            return row.value.WaterLevel
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
                                y: watLevel ? watLevel : 0,
                                type: 'scattergl',
                                mode: 'lines+markers',
                                marker: {color: 'red'},
                                name: 'Water Level (cm)',
                                line: {shape: 'spline'}
                                
                            }
                        ]}
                        layout={{paper_bgcolor:'rgba(0,0,0,0)',
                                plot_bgcolor:'rgba(0,0,0,0)', 
                                width:670, 
                                height: 300,
                               }}

                     /> 
                     :
                     <div></div>
                }
                </div>    
        )
    }
}