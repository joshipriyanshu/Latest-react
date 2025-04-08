import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { useEffect } from 'react';

  const Users = () => {

    const[userName, setUserName] = useState([])

    useEffect( ( ) => {
      const fetchuser = async() => {
      try {
        const findUsers = await  axios.get(`http://localhost:5000/user`)
        const usernameList = findUsers.data
  
        console.log(usernameList)
        setUserName(usernameList)
        
      } catch (error) {
        console.log('error is',error)
      }
      
    } 
    fetchuser();
    }, [])

      
  

const navigate = useNavigate();

const userList = JSON.parse(localStorage.getItem("users")) || [];

return (
  <>
      <button className='user-button'
   onClick={() => {
    navigate('/')
  }}> back to login page  </button>
    

    <div className='user-container'>
      <h1 style={{color: "red"}} > User list  </h1>

  
    {userName.map((user, index) => (
      <div key={index} style={{border: "1px solid black" }}>
        <h3>{user}</h3>
      </div>  
    ))}
  </div>

  

  </>
  
);
};


export default Users