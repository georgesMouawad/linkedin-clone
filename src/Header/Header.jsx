import React from 'react';  
import HeaderOption from '../HeaderOption/HeaderOption';

import './style.css';
import '../styles/utilities.css'

import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';


const Header = () => {
    return (
        <header className='flex'>
            <div className="header-left flex ">
                <img src="/assets/logo.png" alt="logo" />
                <div className="header-search flex center">
                    <SearchIcon />
                    <input type="text" placeholder="Search" />
                    <i className="fas fa-search"></i>
                </div>
            </div>
            <div className="header-right">
                <HeaderOption icon={HomeIcon} title='Home' />
                <HeaderOption icon={SupervisorAccountIcon} title='My Network' />
            </div>
        </header>
    )
}

export default Header;