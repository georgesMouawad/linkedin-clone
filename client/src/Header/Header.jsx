import React from 'react';
import { useNavigate } from 'react-router-dom';

import HeaderOption from './HeaderOption/HeaderOption';
import './header.css';

import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';


const Header = () => {
    const navigate = useNavigate();
    
    return (
        <header className='white-bg flex center'>
            <div className="navbar flex space-between">
            <div className="header-left flex center">
                <img src="/assets/logo.png" alt="logo" />
                <div className="header-search flex center dark-text">
                    <SearchIcon />
                    <input type="text" placeholder="Search" />
                    <i className="fas fa-search"></i>
                </div>
            </div>
            <div className="header-right flex">
                <HeaderOption Icon={HomeIcon} title="Home" />
                <HeaderOption Icon={SupervisorAccountIcon} title="Network" />
                <HeaderOption Icon={BusinessCenterIcon} title="Jobs" />
                <HeaderOption title="Me" onClick={() => navigate('/profile')}/>
            </div>
            </div>
        </header>
    );
};

export default Header;
