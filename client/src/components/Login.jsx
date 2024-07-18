import React, { useState } from "react";
import axios from "axios";

const Login = () => {

    const login_api = process.env.LOGIN_API;

    const [loginData, SetLoginData] = useState({email: '', password: ''});
    const [message,SetMessage] = useState("");

    const handleChange = (e) => {
        SetLoginData({...loginData, [e.target.name]: e.target.value})
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(login_api, loginData)
            SetMessage(response.data.message || "Login Succesfull");
        } catch (error) {
            SetMessage(error.response?.data?.message || 'Login failed');
        }
    }

    return(
    <form onSubmit={handleSubmit}>
        <input 
        type="email"
        name="email"
        value={loginData.email} 
        placeholder="username"
        onChange={handleChange}
        required
        />
        <input 
        type="password"
        name="password"
        value={loginData.password} 
        placeholder="password"
        onChange={handleChange}
        required
        />
        <button type="submit">Register</button>
        <p>{message}</p>
    </form>
    )   
}

export default Login;