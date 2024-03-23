import { React, useState } from 'react';

const SignupForm = ({ switchHandler, handleSignup, validation }) => {
    const [formData, setFormData] = useState({
        username: '',
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
        <div className="container box-shadow-l off-white-bg border flex center column">
            <div className="logo">
                <img src="/assets/logo.png" alt="logo" />
            </div>
            <form className="flex center column" onSubmit={handleSubmit}>
                <div>
                    <label for="username">Username:</label>
                    <input type="text" name="username" placeholder="username" required onChange={handleChange} />
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="text" name="email" placeholder="user@journey.com" required onChange={handleChange} />
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input type="password" name="password" placeholder="password" required onChange={handleChange} />
                </div>
                {validation && (
                    <div className="flex center validation-display">
                        <p>{validation}</p>
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
