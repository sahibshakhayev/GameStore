import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './LoginSignUp.css'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons'
import { registerUser } from '../redux/accountSlice'

const Register = () => {
    const { loading, userInfo, error, success } = useSelector((state) => state.account);
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    
    const submitForm = (data) => {
      data.email = data.email.toLowerCase();
      dispatch(registerUser(data));
    }

    const navigate = useNavigate();

    useEffect(() => {
        success? navigate('/login') : 0
        userInfo? navigate('/') : 0
    }, [navigate, success]);
    

    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Username"
                        name="name"
                        {...register('userName')}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        {...register('email')}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        {...register('password')}
                        minLength="6"
                        required
                    />
                </div>                
                <button type="submit" disabled={loading}>
                    {loading? <LoadingOutlined style={{ fontSize: 43, position: "fixed" }} spin/> : "Register"}
                </button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    )
}

export default Register
