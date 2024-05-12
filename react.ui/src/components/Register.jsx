import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './LoginSignUp.css'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons'
import { registerUser } from '../redux/accountSlice'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const Register = () => {
    const validationSchema = Yup.object().shape({
      userName: Yup.string()
        .required('Username is required.')
        .min(3, 'Username must be at least 3 characters.')
        .max(20, 'Username must not exceed 20 characters.'),
      email: Yup.string()
        .required('Email is required.')
        .email('Email is invalid.'),
      password: Yup.string()
        .required('Password is required.')
        .min(6, 'Password must be at least 6 characters.')
        .max(20, 'Password must not exceed 20 characters.')
        .matches(new RegExp('(?=.*[a-z])[0-9a-zA-Z\\W_]'), 'Passwords must have at least one lowercase character.')
        .matches(new RegExp('(?=.*[0-9])[0-9a-zA-Z\\W_]'), 'Passwords must have at least one numeric character.')
        .matches(new RegExp('(?=.*[A-Z])[0-9a-zA-Z\\W_]'), 'Passwords must have at least one uppercase character.')
        .matches(new RegExp('(?=.*[\\W_])[0-9a-zA-Z\\W_]'), 'Passwords must have at least non alphanumeric character.'),
      confirmPassword: Yup.string()
        .required('Confirm Password is required.')
        .oneOf([Yup.ref('password'), null], 'Confirm Password does not match.')
    });

    const { loading, userInfo, error, success } = useSelector((state) => state.account);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(validationSchema) });
    
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
            <h2 style={{ textAlign: "center" }}>Register</h2>
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
                    <label className="form-group-label">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        {...register('email')}
                    />
                    <p className="invalid-feedback">{errors.email?.message}</p>
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
                <div className="form-group">
                    <label className="form-group-label">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password"
                        {...register('confirmPassword')}
                    />
                    <p className="invalid-feedback">{errors.confirmPassword?.message}</p>
                </div>
                <button type="submit" disabled={loading}>
                    {loading? <LoadingOutlined style={{ fontSize: 43, position: "fixed" }} spin/> : "Register"}
                </button>
            </form>
            <p style={{ textAlign: "center", paddingBottom: 0 }}>Already have an account?</p>
            <p style={{ textAlign: "center", paddingTop: 5 }}><Link to="/login">Login</Link></p>
        </div>
    )
}

export default Register
