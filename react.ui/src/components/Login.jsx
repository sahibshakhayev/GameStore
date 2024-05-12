import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './LoginSignUp.css'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/accountSlice'
import { LoadingOutlined } from '@ant-design/icons'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const Login = () => {
    const validationSchema = Yup.object().shape({
      userName: Yup.string()
        .required('Username is required.')
        .min(3, 'Username must be at least 3 characters.')
        .max(20, 'Username must not exceed 20 characters.'),
      password: Yup.string()
        .required('Password is required.')
        .min(6, 'Password must be at least 6 characters.')
        .max(20, 'Password must not exceed 20 characters.')
        .matches(new RegExp('(?=.*[a-z])[0-9a-zA-Z\\W_]'), 'Passwords must have at least one lowercase character.')
        .matches(new RegExp('(?=.*[0-9])[0-9a-zA-Z\\W_]'), 'Passwords must have at least one numeric character.')
        .matches(new RegExp('(?=.*[A-Z])[0-9a-zA-Z\\W_]'), 'Passwords must have at least one uppercase character.')
        .matches(new RegExp('(?=.*[\\W_])[0-9a-zA-Z\\W_]'), 'Passwords must have at least non alphanumeric character.')
    });

    const { loading, userInfo, error } = useSelector((state) => state.account);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(validationSchema) });
  
    const submitForm = (data) => {
      dispatch(loginUser(data));
    }

    const navigate = useNavigate();

    useEffect(() => {
        userInfo? navigate('/') : 0
    }, [userInfo, navigate]);

    return (
        <div className="container">
            <h2 style={{ textAlign: "center" }}>Login</h2>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className="form-group">
                    <label className="form-group-label">Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        name="name"
                        {...register('userName')}
                    />
                    <p className="invalid-feedback">{errors.userName?.message}</p>
                </div>
                <div className="form-group">
                    <label className="form-group-label">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        {...register('password')}
                    />
                    <p className="invalid-feedback">{errors.password?.message}</p>
                </div>
                <button type="submit" disabled={loading}>
                    {loading? <LoadingOutlined style={{ fontSize: 43, position: "fixed" }} spin/> : "Login"}
                </button>
            </form>
            <p style={{ textAlign: "center", paddingBottom: 0 }}><Link to="/forgot-password">Forgot Password</Link>?</p>
            <p style={{ textAlign: "center", paddingBottom: 0, paddingTop: 10 }}>Don't have an account?</p>
            <p style={{ textAlign: "center", paddingTop: 10 }}><Link to="/register">Register</Link></p>
        </div>
    )
}

export default Login
