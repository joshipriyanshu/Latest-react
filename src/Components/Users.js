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
  <div>
    {userName.map((user, index) => (
      <div key={index}>
        <h1>{user}</h1>
      </div>
    ))}
  </div>

  <button className='signUp-container'
   onClick={() => {
    navigate('/')
  }}> back to login page  </button>

  </>
  
);
};


export default Users