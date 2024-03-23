import { useState } from 'react';
// import axios from 'axios';

import LoginForm from './forms/LoginForm';
import SignupForm from './forms/SignupForm';
import './authentication.css';

const Authentication = () => {
    const [isLogin, setIsLogin] = useState(true);

    const switchHandler = (isLogin) => {
        setIsLogin(isLogin);
    };

    const handleLogin = async (formData) => {
        // try {
        //     const response = await axios.post('loginUrl', formData);
        //     console.log(response);
        // } catch (error) {
        //     console.error(error);
        // }
        console.log(formData)
    };

    const handleSignup = async (formData) => {
        // try {
        //     const response = await axios.post('signupUrl', formData);
        //     console.log(response);
        // } catch (error) {
        //     console.error(error);
        // }
        console.log(formData)
    };

    return (
        <section className="form-component green-bg flex center">
            {isLogin ? (
                <LoginForm switchHandler={switchHandler} handleLogin={handleLogin} />
            ) : (
                <SignupForm switchHandler={switchHandler} handleSignup={handleSignup} />
            )}
        </section>
    );
};

export default Authentication;
