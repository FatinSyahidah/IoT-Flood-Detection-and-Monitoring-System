import React from 'react'
import StartFirebase from '../firebaseConfig/index';
import {ref, onValue, query, orderBy, limitToLast, get, child} from 'firebase/database';

const db = StartFirebase();

export class QueryWater extends React.Component{
    constructor(){
        super();
        this.state = {
            tableData: []
        }
    }
    componentDidMount(){
        const que = query(ref(db, "SgKuantan"), limitToLast(1));

        onValue(que,(snapshot) => {
            var waterLevel = [];

            snapshot.forEach(childSnapshot => {
                let key = childSnapshot.key;
                let data = childSnapshot.val();
                waterLevel.push({"key": key, "data":data});
            });
            //AddAllItemsToTable(temps);
            this.setState({tableData: waterLevel});
        });

    }

    render(){
        return (
            <table id="data" class="center">
            <tbody>
                {this.state.tableData.map((row,index)=>{
                    return(
                    <tr>
                        {row.data.WaterLevel} cm
                        <br/><br/>
                        <h5>{row.data.Status}</h5>
                    </tr>
                    )
                })}
            </tbody>
        </table>

        )
    }
}
