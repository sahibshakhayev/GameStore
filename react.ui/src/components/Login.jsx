import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginSignUp.css'; 


const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log(formData); 
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        minLength="6"
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                <Link to="/forgot-password">Forgot Password?</Link>
            </p>
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
};

export default Login;
