import { useState , useEffect } from 'react';
// import axios from 'axios';

import LoginForm from './forms/LoginForm';
import SignupForm from './forms/SignupForm';
import './authentication.css';

const Authentication = () => {
    const [isLogin, setIsLogin] = useState(true);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     if (Object.keys(formData).length === 0) return;


    //     if (!formData.email.includes('@') || !formData.email.includes('.')) {
    //         setError('Invalid email address');
    //     } else if (formData.password.length < 8) {
    //         setError('Password must be at least 8 characters long');
    //     } else {
    //         setError(null);
    //     } 
    // }, [formData])

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
        <section className="form-component white-bg flex center">
            {isLogin ? (
                <LoginForm switchHandler={switchHandler} handleLogin={handleLogin}  />
            ) : (
                <SignupForm switchHandler={switchHandler} handleSignup={handleSignup} />
            )}
        </section>
    );
};

export default Authentication;
