import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Avatar } from '@mui/material';
import './usercard.css';

const UserCard = ({ user }) => {

    const { id, name, bio, description } = user;
    const [userOccupation, setUserOccupation] = useState('');

    const navigate = useNavigate();
    

    useEffect(() => {
        const getCurrentOccupation = async (id) => {
            if(!bio) {
                setUserOccupation(description);
                return;
            }
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
    }, [id, bio, description]);

    const handleOnclick = () => {
        let url = `/profile?id=${id}`;
        if (!bio) {
            url += `&isCompany=true`;
        }
        navigate(url);
    };

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
            <button className="connect-btn" onClick={handleOnclick}>Connect</button>
        </div>
    );
};

export default UserCard;
