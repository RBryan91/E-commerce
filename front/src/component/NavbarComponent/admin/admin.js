import React from 'react';
import { Link } from 'react-router-dom';
import './admin.css';

export default function ButtonAdmin(){

        if(localStorage.getItem('role') !== "1"){
            return ""
        }
        if(localStorage.getItem('role') === "1"){
            return (    
                <Link to={"/admin"} className='adminBtn'>Admin</Link>
            )
        }
}