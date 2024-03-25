import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import LoginForm from './forms/LoginForm';
import SignupForm from './forms/SignupForm';
import './authentication.css';

const Authentication = ({onLogin}) => {
    const [isLogin, setIsLogin] = useState(true);
    const [apiError, setApiError] = useState([]);
    const navigate = useNavigate();

    const switchHandler = (isLogin) => {
        setApiError([]);
        setIsLogin(isLogin);
    };

    const handleLogin = async (formData) => {
        const data = new FormData();
        data.append('email', formData.email);
        data.append('password', formData.password);

        try {
            const response = await axios.post('/users/signin.php', data);
            if (response.data.status === 'success') {
                localStorage.setItem('currentUser', JSON.stringify(response.data.data));
                onLogin()
                navigate('/')
                return;
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.log(error.message);
            setApiError([error.message]);
        }
    };

    const handleSignup = async (formData) => {

        console.log('form data', formData)

        const data = new FormData();
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('name', formData.name);
        data.append('isCompany', formData.isCompany);
        
        try {
            const response = await axios.post('/users/signup.php', data)
            if (response.data.status === 'success') {
                localStorage.setItem('currentUser', JSON.stringify(response.data.data));
                onLogin()
                navigate('/')
                return;
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.log(error.message)
            setApiError([error.message])
        }
    };

    return (
        <section className="form-component white-bg flex center">
            {isLogin ? (
                <LoginForm switchHandler={switchHandler} handleLogin={handleLogin} apiError={apiError} />
            ) : (
                <SignupForm switchHandler={switchHandler} handleSignup={handleSignup} apiError={apiError} />
            )}
        </section>
    );
};

export default Authentication;
