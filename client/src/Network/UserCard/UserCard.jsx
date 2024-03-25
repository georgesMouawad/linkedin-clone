import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Avatar } from '@mui/material';
import './usercard.css';

const UserCard = ({ user }) => {

    const { id, name } = user;
    const [userOccupation, setUserOccupation] = useState('');
    

    useEffect(() => {
        const getCurrentOccupation = async (id) => {
            try {
                const response = await axios.get('/experiences/getcurrent.php?user_id=' + id);
                if (response.data.status === 'success') {
                    setUserOccupation(response.data.data.position);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getCurrentOccupation(id);
    }, [id]);

    console.log(user)
    return (
        <div className="user-card white-bg border border-radius flex column">
            <div className="bg-img border-radius">
                <img src="/assets/bg.jpg" alt="background" />
            </div>
            <div className="profile-details flex column space-around">
                <Avatar className="profile-avatar" />
                <div className="profile-text flex column center">
                    <h3>{name}</h3>
                    <p>{userOccupation}</p>
                </div>
            </div>
            <button className="connect-btn">Connect</button>
        </div>
    );
};

export default UserCard;
