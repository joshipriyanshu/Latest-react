import React from "react";
import LoginPage from "./Components/LoginPage";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import SignUp from "./Components/SignUp";
import Users from "./Components/Users";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/users" element={<Users/>} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
