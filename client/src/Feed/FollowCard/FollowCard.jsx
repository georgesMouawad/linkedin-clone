
import { useEffect, useState } from 'react';
import axios from 'axios';

import { Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import './followcard.css';

const FollowCard = ({ topUser }) => {
    const { followee_id, followee_name, followee_type } = topUser;
    const [followeeData, setFolloweeData] = useState(null);

    useEffect(() => {
        const getTopUserOccupation = async () => {
            try {
                if (followee_type === 'user') {
                    const response = await axios.get('/experiences/getcurrent.php?user_id=' + followee_id);
                    if (response.data.status === 'success') {
                        setFolloweeData(response.data.data.position);
                    }
                } else {
                    const response = await axios.get('/companies/get.php?id=' + followee_id);
                    if (response.data.status === 'success') {
                        setFolloweeData(response.data.data.description);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        getTopUserOccupation();
    }, [followee_id, followee_type]);

    const handleOnclick = () => {
        console.log('Followed', followee_name);
    };

    if (topUser && followeeData) return (
        <div className="follow">
            <div className="follow-card flex">
                <Avatar className="avatar" /> 
                <div className="follow-card-info">
                    <h4>{followee_name}</h4>
                    <p className="light-text">{followeeData}</p>
                </div>
            </div>
            <button className="follow-btn flex center border-radius-m" onClick={handleOnclick}>
                <AddIcon /> <span>Follow</span>
            </button>
        </div>
    );
};

export default FollowCard;
