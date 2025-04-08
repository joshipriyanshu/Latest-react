import React, { useState, useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/Context";
import axios from "axios";


 // Import the CSS file

const LoginPage = () => {

  const navigate = useNavigate(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [error, setError] =  useState("")
  const { login , updateUser} = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
  
  
    try {
      const response = await axios.post("http://localhost:5000/login", { email, password });
  
      // ✅ Check if token exists
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        login(response.data.token);
        console.log("Login Response:", response.data.email);
        updateUser(response.data)


        alert("Login successful!");
        navigate("/dashboard");  // ✅ Redirect after login 
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Check your credentials.");
      console.error(err);
    }
  };
      

  


  
  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="login-button">Login</button>
      </form>


      <div className="signup-container" >
        <p>Don't have an account?</p>
        <p>Sign up now</p>
        <button onClick={() => navigate("/signup")} className="signup-button">Sign Up</button>
        <button onClick={() => navigate("/users")} className="signup-button">Users</button>

      </div>


    </div>  





  );
};

export default LoginPage;
