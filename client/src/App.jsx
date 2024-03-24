import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Header/Header';
import Feed from './Feed/Feed';
import Authentication from './Authentication/Authentication';
import Profile from './Profile/Profile';

import './App.css';
import './styles/utilities.css';
import './styles/colors.css';

const App = () => {
    return (
        <div className="app flex column light-gray-bg ">
            <BrowserRouter>
                <Routes>
                    <Route path="/auth" element={<Authentication />} />
                    <Route path="/*" element={<Header />} />
                    <Route path="/" element={<Feed />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
