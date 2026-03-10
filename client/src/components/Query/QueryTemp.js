import React from 'react'
import StartFirebase from '../firebaseConfig/index';
import {ref, onValue, query, orderBy, limitToLast, get, child} from 'firebase/database';
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const db = StartFirebase();

export class QueryTemp extends React.Component{
    constructor(){
        super();
        this.state = {
            tableData: []
        }
    }
    componentDidMount(){
        const que = query(ref(db, "SgSoi"), limitToLast(1));

        onValue(que, (snapshot) => {
            var temps = [];

            snapshot.forEach(childSnapshot => {
                let key = childSnapshot.key;
                let data = childSnapshot.val();
                temps.push({"key": key, "data":data});
            });
            //AddAllItemsToTable(temps);
            this.setState({tableData: temps});
        });

    }

    render(){
        return (
            <table id="data" class="center">
            <tbody>
                {this.state.tableData.map((row,index)=>{
                    return(
                    <tr>
                        <div style={{ width: 150, height: 100 }}>
                        <CircularProgressbar
                           
                            value={row.data.Temperature.toFixed(2)}
                            text={`${row.data.Temperature.toFixed(2)} °C`}
                            circleRatio={0.5}
                            styles={{
                                // Customize the root svg element
                                root: {},
                                // Customize the path, i.e. the "completed progress"
                                path: {
                                  // Path color
                                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                  strokeLinecap: 'butt',
                                  // Customize transition animation
                                  transition: 'stroke-dashoffset 0.5s ease 0s',
                                  // Rotate the path
                                  transform: 'rotate(-90deg)',
                                  transformOrigin: 'center center',
                                  stroke: '#c7b03e',
                                },
                                // Customize the circle behind the path, i.e. the "total progress"
                                trail: {
                                  // Trail color
                                  stroke: '#d6d6d6',
                                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                  strokeLinecap: 'butt',
                                  // Rotate the trail
                                  transform: 'rotate(-90deg)',
                                  transformOrigin: 'center center',
                                },
                                // Customize the text
                                text: {
                                  // Text color
                                  fill: '#c7b03e',
                                  // Text size
                                  fontSize: '16px',
                                },
                                // Customize background - only used when the `background` prop is true
                                background: {
                                  fill: '#ddd',
                                },
                              }}
                        />
                        </div>
                    </tr>
                    )
                })}
            </tbody>
        </table>

        )
    }
}
