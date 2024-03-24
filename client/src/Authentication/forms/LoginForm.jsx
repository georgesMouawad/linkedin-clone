import { React, useState } from 'react';
import '../authentication.css'

const LoginForm = ({ switchHandler, handleLogin, validation }) => {
    const [formdata, setFormData] = useState({
        login: '',
        password: '',
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(formdata);
    };

    const handleChange = (e) => {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="container box-shadow-l off-white-bg border flex center column">
            <div className="logo">
                <img src="/assets/logo.png" alt="logo" />
            </div>
            <form className="flex column" onSubmit={handleSubmit}>
                <div>
                    <label>Username or email:</label>
                    <input type="text" name="login" placeholder="email" required onChange={handleChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" placeholder="password" required onChange={handleChange} />
                </div>
                {validation && (
                    <div className="flex center validation-display">
                        <p>{validation}</p>
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
