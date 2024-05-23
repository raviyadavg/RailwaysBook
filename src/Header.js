import React from 'react'
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className='header'>
        <div className='listing'>
          <div className='logo'>Railway</div>
          <ul>
            <li><Link to="/">Login</Link></li>
            <li><Link to="/Register">Register</Link></li>
          </ul>
        </div>
    </div>
  )
}
