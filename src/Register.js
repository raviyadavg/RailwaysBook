import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Joi, { errors } from 'joi-browser';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        UserName: '',
        Password: '',
        cpassword: '',
        Email: '',
        PhoneNumber: '',
        DateOfBirth: '',
        Gender: '',
        Address: ''
    });

    const schema = {
        UserName: Joi.string().required(),
        Password: Joi.string().min(6).required(),
        cpassword: Joi.string().valid(Joi.ref('Password')).required().label('Confirm Password').options({
            language: {
                any: {
                    allowOnly: '!!Passwords do not match',
                }
            }
        }),
        Email: Joi.string().email().required(),
        PhoneNumber: Joi.string().min(10).required(),
        DateOfBirth: Joi.date().raw().required(),
        Gender: Joi.string().required(),
        Address: Joi.string().required()
    };


    const validateForm = () => {
        const validationResult = Joi.validate(formData, schema, { abortEarly: false });
        if (!validationResult.error) {
            return null;
        }
        const errorobj = {};
        for (let errorDetail of validationResult.error.details) {
            const fieldname = errorDetail.path[0];
            const errorMsg = errorDetail.message;
            errorobj[fieldname] = errorMsg;
        }
        return errorobj;

    }


    const handleData = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();

        if (!errors) {

            try {
                const { cpassword, ...dataToSend } = formData;

                console.log(cpassword, 'confirm pass');

                const response = await axios.post('http://localhost:3001/users', dataToSend);
                console.log('form submited sucessfully', response.data);
                navigate("/");
            } catch (error) {
                console.log('Error', error);
            }

            console.log('Form submitted successfully:', formData);
        } else {
            console.log('Form has validation errors:', errors);
        }
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div className='col'>
                <label>name</label>
                <input type='text' name='UserName' onChange={handleData} />
            </div>
            <div className='col'>
                <label>Password</label>
                <input type='password' name='Password' onChange={handleData} />
            </div>
            <div className='col'>
                <label>Confirm Password</label>
                <input type='password' name='cpassword' onChange={handleData} />
            </div>
            <div className='col'>
                <label>Email</label>
                <input type='text' name='Email' onChange={handleData} />
                {errors && errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className='col'>
                <label>Phone number</label>
                <input type='number' name='PhoneNumber' onChange={handleData} />
            </div>
            <div className='col'>
                <label>D.O.B</label>
                <input type='date' name='DateOfBirth' onChange={handleData} />
            </div>
            <div className='col'>
                <label>Address</label>
                <input type='text' name='Address' onChange={handleData} />
            </div>
            <div className='col'>
                <label>Gender</label>
                <div className='radioGroup' >
                    <div className="radio">
                        <input id="gender" name="Gender" type="radio" value="M" onChange={handleData} />
                        <label htmlFor="gender">Male</label>
                    </div>
                    <div className="radio">
                        <input id="gender2" name="Gender" type="radio" value="F" onChange={handleData} />
                        <label htmlFor="gender2">Female</label>
                    </div>
                </div>
            </div>
            <div className='col'>
                <ReCAPTCHA sitekey="6Le-p-MpAAAAABedFVw2tDSyThaCk81CAecNtC43" />
            </div>
            <div className='col btn'>
                <button type='submit'>Register</button>
                <Link to="/">Click here to login!</Link>
            </div>
        </form>
    );
}

export default Register;
