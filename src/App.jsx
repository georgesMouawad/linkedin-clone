import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Header/Header';
import Feed from './Feed/Feed';
import Authentication from './Authentication/Authentication';

import './App.css';
import './styles/utilities.css';
import './styles/colors.css';

const App = () => {
    return (
        <div className="app flex column light-gray-bg ">
            <Header />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Feed />} />
                        <Route path="/auth" element={<Authentication />} />
                    </Routes>
                </BrowserRouter>
        </div>
    );
};

export default App;
