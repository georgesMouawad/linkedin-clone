import React from 'react';
import HeaderOption from './HeaderOption/HeaderOption';

import './header.css';

import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';


const Header = () => {
    return (
        <header className="flex space-evenly white-bg">
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
                <HeaderOption title="Me" />
            </div>
        </header>
    );
};

export default Header;
