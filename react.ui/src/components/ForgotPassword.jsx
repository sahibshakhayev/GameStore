import React from 'react'
import { Link } from 'react-router-dom'
import './LoginSignUp.css'

const ForgotPassword = () => {
    return (
        <div className="container">
            <h2 style={{ textAlign: "center" }}>Forgot Password</h2>
            <p style={{ padding: 2, textAlign: "start", marginBottom: 10 }}>Enter your email address to reset your password:</p>
            <form>
                <div className="form-group">
                    <input type="email" placeholder="Email" />
                </div>
                <button>Reset Password</button>
            </form>
            <p style={{ textAlign: "center", marginTop: 15 }} className="text-center"><Link to="/login">Back to Login</Link></p>
        </div>
    )
}

export default ForgotPassword
