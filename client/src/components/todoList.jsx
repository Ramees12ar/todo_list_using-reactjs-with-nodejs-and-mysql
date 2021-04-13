import   React, { useEffect, useState } from 'react';
import './todo.css';
import Axios from 'axios';
// import {  useSelector} from "react-redux";

function TodoList() {
    const [listView,setView]=useState([])
    useEffect(() => {
        Axios.get('http://localhost:3004/api/get').then((res) => {
            setView(res.data);
        })
    }, []);
    var deleteData = (dataId) =>{
        console.log("delete");
        Axios.delete(`http://localhost:3004/api/delete/${dataId}`);
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
                    </li>
                )
                }
                )}
            </ul>
        </div>
    )
}
export default TodoList;
