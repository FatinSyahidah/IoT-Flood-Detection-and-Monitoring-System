import StartFirebase from '../firebaseConfig/index';
import React from 'react';
import {ref, onValue, query, orderBy, limitToLast, limitToFirst} from 'firebase/database';
import '../css/Alarm.css'

const db = StartFirebase();

export class Alarm extends React.Component{
    constructor(){
        super();
        this.state = {
            tableData: []
        }
    }

    componentDidMount(){
        const que = query(ref(db, "SgKuantan"), limitToLast(5));

        onValue(que, (snapshot) => {
            var rec = [];

            snapshot.forEach(childSnapshot => {
                let key = childSnapshot.key;
                let data = childSnapshot.val();
                rec.push({"key": key, "data":data});
            });
            //AddAllItemsToTable(temps);
            this.setState({tableData: rec});
        });

    }

    render(){
        
        return(
            
            <table class="table table-borderless">
                <tr>
                    <th>Date/Time</th>
                    <th>Status</th>
                </tr>

                <tbody>
                    {this.state.tableData.map((row,index)=>{
                        return(
                        <tr>
                            <td>{row.data.Timestamps}</td>
                            <td>{row.data.Status}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>

        )
    }
}