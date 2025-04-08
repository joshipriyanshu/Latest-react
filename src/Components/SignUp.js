import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ Correct use of useNavigate

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/register", { email, password });
      alert("Registration successful!");
      
      // ✅ Redirect to home after successful signup
      navigate("/");  

      // ✅ Clear input fields
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Registration failed. Try again.");
      console.error(err);
    }
  };

  return (
    <div className="signup-container">
      <h2>Register yourself</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignUp} className="login-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          required
        />
        <button type="submit" className="signup-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
