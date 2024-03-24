import { React, useState } from 'react';

const SignupForm = ({ switchHandler, handleSignup, validationError }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSignup(formData);
    };
    return (
        <div className="container box-shadow off-white-bg border flex center column">
            <div className="logo">
                <img src="/assets/logo.png" alt="logo" />
            </div>
            <form className="flex center column" onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="text" name="email" placeholder="user@email.com" required onChange={handleChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" placeholder="password" required onChange={handleChange} />
                </div>
                {validationError && (
                    <div className="flex center validation-display">
                        <p>{validationError}</p>
                    </div>
                )}
                <button className="register-btn primary-bg white-text box-shadow" type="submit">
                    Register
                </button>
            </form>
            <p>
                Have an Account?{' '}
                <span className="login-link primary-text" onClick={() => switchHandler(true)}>
                    Sign In
                </span>
            </p>
        </div>
    );
};

export default SignupForm;
