import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './LoginSignUp.css'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/accountSlice'
import { LoadingOutlined } from '@ant-design/icons'


const Login = () => {
    const { loading, userInfo, error } = useSelector((state) => state.account);
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
  
    const submitForm = (data) => {
      dispatch(loginUser(data));
    }

    const navigate = useNavigate();

    useEffect(() => {
        userInfo? navigate('/') : 0
    }, [userInfo, navigate]);

    return (
        <div className="container">
            <h2>Login</h2>
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
                        type="password"
                        placeholder="Password"
                        name="password"
                        {...register('password')}
                        minLength="6"
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading? <LoadingOutlined style={{ fontSize: 43, position: "fixed" }} spin/> : "Login"}
                </button>
            </form>
            <p>
                <Link to="/forgot-password">Forgot Password?</Link>
            </p>
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    )
}

export default Login
