import React, { useState } from 'react';
import './Signup.css';
import authService from '../../routes/Auth';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [formdata, SetFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        SetFormData({
            ...formdata,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formdata.email.trim()) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(formdata.email.trim())) {
            errors.email = 'Invalid email format';
        }

        // Password strength validation
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (!formdata.password.trim()) {
            errors.password = 'Password is required';
        } else if (!passwordRegex.test(formdata.password.trim())) {
            errors.password =
                'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number';
        }

        if (!formdata.confirm_password.trim()) {
            errors.confirm_password = 'Confirm password is required';
        } else if (formdata.password !== formdata.confirm_password) {
            errors.confirm_password = 'Passwords do not match';
        }

        if (!formdata.username.trim()) {
            errors.username = 'Username is required';
        } else if (formdata.username.trim().length < 3) {
            errors.username = 'Username must be at least 3 characters long';
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        try {
            const res = await authService.Signup(formdata);
            console.log(res);
            // Clear form fields after successful submission
            SetFormData({
                username: '',
                email: '',
                password: '',
                confirm_password: '',
            });
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };

    return (
    <div className="sign">
        <div className="signup-container">
            <h2>Sign Up</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={formdata.username} onChange={handleChange} placeholder="Enter your username" />
                    {errors.username && <p className="error">{errors.username}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formdata.email} onChange={handleChange} placeholder="Enter your email" />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={formdata.password} onChange={handleChange} placeholder="Enter your password" />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirm_password" value={formdata.confirm_password} onChange={handleChange} placeholder="Confirm your password" />
                    {errors.confirm_password && <p className="error">{errors.confirm_password}</p>}
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
        </div>
    );
}

export default Signup;

