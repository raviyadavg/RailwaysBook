import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';

export default function Login() {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        'UserName': '',
        'Password': ''
    })

    const handleData = (e) => {
        const {name, value} = e.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleLogin = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/users/login', loginData );
            console.log('response', response?.data.UserID);

            const {token} = response.data;
            const userID = response?.data?.UserID;
            console.log(userID,"usserID")
            console.log(token ,'token');
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userID);
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            alert(error?.response?.data?.error, 'test');
        }

       
    }

  return (
    <>
        <form className='form' onSubmit={handleLogin} >
            <h2>Login</h2>
            <div className='col'>
                <label>Username</label>
                <input type='text' name='UserName' onChange={handleData} />
            </div>
            <div className='col'>
                <label>Password</label>
                <input type='password' name='Password' onChange={handleData}  />
            </div>
            <div className='col'>
            <ReCAPTCHA sitekey="6Le-p-MpAAAAABedFVw2tDSyThaCk81CAecNtC43" />
            </div>
            <div className='col btn'>
                <button type='submit' >Login</button>
                <Link  to="/Register">Click here to register!</Link>
            </div>
        </form>
    </>
  )
}
