import React from 'react';
import { Link } from 'react-router-dom';
import './LoginSignUp.css'; 

const ForgotPassword = () => {
    return (
        <div className="container">
            <h2>Forgot Password</h2>
            <p>Enter your email address to reset your password.</p>
            <form>
                <div className="form-group">
                    <input type="email" placeholder="Email" />
                </div>
                <button>Reset Password</button>
            </form>
            <p className="text-center">
                <Link to="/">Back to Login</Link>
            </p>
        </div>
    );
};

export default ForgotPassword;
