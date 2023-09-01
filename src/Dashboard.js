import React from 'react';
import { useUser } from './UserContext';
import { Link } from 'react-router-dom';
import './App.css';
function Dashboard() {
  const { user } = useUser();

  return (
    <div>
    <div className="dashboard">
      <h2>Welcome to the Dashboard,{user.username}</h2>
      <p>Your details are listed below:</p>
      {user ? (
        <div>
        <div>Empid: {user.empid}</div>
        <div>Username: {user.username}</div>
        <div>Email: {user.email}</div>
        <div>Password: {user.password}</div>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
    <p><Link to="/">Logout</Link></p>
    </div>
  );
}
export default Dashboard;