import React, { useState , useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/Context";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user,handleLogout } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

 // ✅ Redirect **only if user is not logged in**
 useEffect(() => {
   if (  user === null) {
     navigate("/");
   } else {
     setLoading(false); 
   }
}, [user, navigate]); 

if (loading) return <h3>Loading...</h3>;;// ✅ Prevents flashing

  return (
    <div className="dashboard-container">
      <h2>Welcome to Dashboard</h2>
      <h3>Your session is currently active</h3>
      <button 
        onClick={() => {
          handleLogout();  // ✅ Clears user state & token
          navigate("/");  // ✅ Redirect to login after logout
        }} 
        className="logout-button"
      >
        Logout
      </button>
      
    </div>
  );
};

export default Dashboard;
