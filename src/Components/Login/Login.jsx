import React, { useState } from 'react';
import './Login.css';
import { login as AuthLogin } from '../../store/authslice';
import { useDispatch } from "react-redux";
import authService from '../../routes/Auth';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!formData.email.trim()) {
            errors.email = "Email is required";
            isValid = false;
        }

        if (!formData.password.trim()) {
            errors.password = "Password is required";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const res = await authService.login(formData);
                console.log('Login response:', res);
                if (res) {
                    const userData = await authService.getCurrentUser();
                    console.log(userData);
                    if (userData) {
                        dispatch(AuthLogin(userData));
                        navigate('/home');
                    }
                }
            } catch (error) {
                console.error('Login error:', error);
                setErrors({ general: "Incorrect email or password" }); // Displaying error
            }
        }
    };

    return (
        <div className='Login'>
            <div className="login-container">
                <h2 className='login_txt'>Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email"  />
                        {errors.email && <div className="error-message" style={{ color: 'red' }}>{errors.email}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password"  />
                        {errors.password && <div className="error-message" style={{ color: 'red', marginTop:'5px' }}>{errors.password}</div>}
                    </div>
                    {errors.general && <div className="error-message" style={{ color: 'red',marginTop:'5px' }}>{errors.general}</div>} 
                    <button type="submit" style={{ marginTop: '10px' }}>Login</button> 
                    
                    <p className='signup_btn'>Don't have an account? <Link to="/signup">Sign up</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Login;


