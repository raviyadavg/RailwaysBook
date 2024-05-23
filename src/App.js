import React from 'react';
import './App.css';
import Login from './Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Register from './Register';
import Dashboard from './Dashboard';
import Header from './Header';
import Booking from './Booking';

function App() {
  return (
    <>
 <Router>
    <Header></Header>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </Router>
    
    </>
  );
}

export default App;
