import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Signupdata';
import Login from './Logindata';
import Dashboard from './Dashboard';
import './App.css';
import { UserProvider } from './UserContext';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <UserProvider>
          <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;