import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Header from './Header/Header';
import Feed from './Feed/Feed';
import Authentication from './Authentication/Authentication';
import Profile from './Profile/Profile';
import Network from './Network/Network';
import Jobs from './Jobs/Jobs';

import './App.css';
import './styles/utilities.css';
import './styles/colors.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [currentUser, setCurrentUser] = useState(null);

    axios.defaults.baseURL = 'http://localhost/linkedin-clone/api';

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            setIsAuthenticated(true);
            // setCurrentUser(user);
        }
    }, []);

    return (
        <div className="app flex column light-gray-bg ">
            <BrowserRouter>
                {isAuthenticated ? <Header onSignOut={() => setIsAuthenticated(false)} /> : null}
                <Routes>
                    <Route path="/auth" element={<Authentication onLogin={() => setIsAuthenticated(true)} />} />
                    <Route
                        path="/"
                        element={
                            isAuthenticated ? <Feed /> : <Authentication onLogin={() => setIsAuthenticated(true)} />
                        }
                    />
                    <Route path="/profile" element={<Profile />} />
                    <Route
                        path="/network"
                        element={
                            isAuthenticated ? <Network /> : <Authentication onLogin={() => setIsAuthenticated(true)} />
                        }
                    />
                    <Route
                        path="/jobs"
                        element={
                            isAuthenticated ? <Jobs /> : <Authentication onLogin={() => setIsAuthenticated(true)} />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
