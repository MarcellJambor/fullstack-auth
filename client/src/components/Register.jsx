import React, { useState } from "react";
import axios from "axios";

const Register = () => {

    const register_api = process.env.REGISTER_API;

    const [registerData, SetRegisterData] = useState({email: '', password: ''});
    const [message,SetMessage] = useState("");

    const handleChange = (e) => {
        SetRegisterData({...registerData, [e.target.name]: e.target.value})
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(register_api, registerData)
            SetMessage(response.data.message || "Register Succesfull");
        } catch (error) {
            SetMessage(error.response?.data?.message || 'Login failed');
        }
    }

    return(
    <form onSubmit={handleSubmit}>
        <input 
        type="email"
        name="email"
        value={registerData.email} 
        placeholder="username"
        onChange={handleChange}
        required
        />
        <input 
        type="password"
        name="password"
        value={registerData.password} 
        placeholder="password"
        onChange={handleChange}
        required
        />
        <button type="submit">Register</button>
        <p>{message}</p>
    </form>
    )   
}

export default Register;