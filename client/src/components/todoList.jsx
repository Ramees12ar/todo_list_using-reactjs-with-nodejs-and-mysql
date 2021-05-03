import   React, { useEffect, useState } from 'react';
import './todo.css';
import Axios from 'axios';
// import {  useSelector} from "react-redux";

function TodoList() {
    const [listView,setView]=useState([])
    useEffect(() => {
        Axios.get('http://localhost:3004/api').then((res) => {
            setView(res.data);
        })
    }, []);
    var deleteData = (dataId) =>{
        console.log("delete");
        Axios.delete(`http://localhost:3004/api/${dataId}`);
        window.location.reload();
    };
    var updateData = (dataId,dataName) =>{
        console.log("delete");
        var newData = prompt("Please enter the input:", dataName);
        Axios.put(`http://localhost:3004/api/${dataId}`,
            {dataName: newData});
        window.location.reload();
    };

    return(
        <div style={{width:"40%",margin:"auto"}}>
            <ul className="list-group">
            {listView.map((todo)=>{
                return(
                    <li className="list-group-item">
                        <li style={{display:"none"}}>{todo.id}</li>
                        <label className="h4">{todo.name}</label> 
                        <button className="btn btn-danger" style={{float:"right"}}
                        onClick={() => {deleteData(todo.id)}}>Delete
                        </button>
                        <button className="btn btn-success" style={{float:"right",marginRight:"8px"}}
                        onClick={() => {updateData(todo.id,todo.name)}}>Update
                        </button>
                        
                    </li>
                )
                }
                )}
            </ul>
        </div>
    )
}
export default TodoList;
