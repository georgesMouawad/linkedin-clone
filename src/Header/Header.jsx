import React from 'react';
import HeaderOption from '../HeaderOption/HeaderOption';

import './style.css';
import '../styles/utilities.css';

import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ChatIcon from '@mui/icons-material/Chat';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Header = () => {
    return (
        <header className="flex space-evenly">
            <div className="header-left flex ">
                <img src="/assets/logo.png" alt="logo" />
                <div className="header-search flex center">
                    <SearchIcon />
                    <input type="text" placeholder="Search" />
                    <i className="fas fa-search"></i>
                </div>
            </div>
            <div className="header-right flex">
                <HeaderOption Icon={HomeIcon} title="Home" />
                <HeaderOption Icon={SupervisorAccountIcon} title="My Network" />
                <HeaderOption Icon={BusinessCenterIcon} title="Jobs" />
                <HeaderOption Icon={ChatIcon} title="Messaging" />
                <HeaderOption Icon={NotificationsIcon} title="Notification" />
                <HeaderOption avatar='/assets/avatar.jpg' title="Me" />
            </div>
        </header>
    );
};

export default Header;
