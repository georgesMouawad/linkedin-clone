import React from 'react';  
import SearchIcon from '@mui/icons-material/Search';
import './style.css';
import '/client/src/styles/utilities.css'

const Header = () => {
    return (
        <header>
            <h1>React App</h1>


            <div className="header-left">
                <img src="/client/assets/logo.png" alt="logo" />
                <div className="header-search">
                    <SearchIcon />
                    <input type="text" placeholder="Search" />
                    <i className="fas fa-search"></i>
                </div>
            </div>
        </header>
    )
}

export default Header;