import { React, useState, useEffect } from 'react';
import '../authentication.css';

const LoginForm = ({ switchHandler, handleLogin }) => {
    const [validationError, setValidationError] = useState(null);
    const [formdata, setFormData] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!submitted) return;
        if (!formdata.email || !formdata.password === 0) {
            setValidationError('All fields are required');
        } else if (!formdata.email.includes('@') || !formdata.email.includes('.')) {
            setValidationError('Invalid email address');
        } else if (formdata.password.length < 8) {
            setValidationError('Password must be at least 8 characters long');
        } else {
            setValidationError(null);
        }
    }, [formdata, submitted]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        handleLogin(formdata);
    };

    const handleChange = (e) => {
        setSubmitted(false);
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="container box-shadow off-white-bg border flex center column">
            <div className="logo">
                <img src="/assets/logo.png" alt="logo" />
            </div>
            <form className="flex column" onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="text" name="email" placeholder="email" onChange={handleChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" placeholder="password" onChange={handleChange} />
                </div>
                {validationError && (
                    <div className="flex center validation-display">
                        <p>{validationError}</p>
                    </div>
                )}
                <button className="login-btn primary-bg white-text box-shadow" type="submit">
                    Login
                </button>
            </form>
            <p>
                No Account?{' '}
                <span className="register-link primary-text" onClick={() => switchHandler(false)}>
                    Register Now
                </span>
            </p>
        </div>
    );
};

export default LoginForm;
