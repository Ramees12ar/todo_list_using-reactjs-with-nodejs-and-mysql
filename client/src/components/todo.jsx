import React, { useState } from 'react';
import './todo.css';
import Axios from 'axios';
function Todo() {
    let [data,setData]= useState();
    var submitData = () =>{
        console.log("hi");
        console.log(data);
        Axios.post('http://localhost:3004/api',
        {itemName: data}).then(() => {
            alert('added');
        });
        window.location.reload();
    };
    return(
        <div>
            <h1 style={{textAlign:"center"}}>Todo List</h1><br/>
            <div style={{marginLeft:"40%"}}>
                <input className="form-control" value={data} id="data" type="text" placeholder="enter the data" 
                    onChange={(e)=>{setData(e.target.value)}} style={{width:"40%"}}/>
                <button className="btn btn-success" style={{marginLeft:"18%",marginTop:"3px"}}
                    onClick={()=>{submitData()}}>Add
                </button>
            </div><br/>
        </div>
    );
}
export default Todo;
