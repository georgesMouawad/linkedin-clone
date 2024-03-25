import { useEffect, useState } from 'react';
import axios from 'axios';

import { Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import './followcard.css';

const FollowCard = ({ topUser, user_id }) => {
    const { followee_id, followee_name, followee_type } = topUser;
    const [followeeData, setFolloweeData] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

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
        const getFollowStatus = async () => {
            try {
                const response = await axios.get(
                    '/followers/check.php?follower_id=' +
                        user_id +
                        '&followee_id=' +
                        followee_id +
                        '&followee_type=' +
                        followee_type
                );
                setIsFollowing(response.data.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getFollowStatus();
        getTopUserOccupation();
    }, [followee_id, followee_type, user_id]);

    const handleFollow = async () => {
        const data = new FormData();
        data.append('follower_id', user_id);
        data.append('followee_id', followee_id);
        data.append('followee_type', followee_type);

        try {
            const response = await axios.post('/followers/toggle.php', data);
            setIsFollowing(response.data.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    if (topUser && followeeData)
        return (
            <div className="follow">
                <div className="follow-card flex">
                    <Avatar className="avatar" />
                    <div className="follow-card-info">
                        <h4>{followee_name}</h4>
                        <p className="light-text">{followeeData}</p>
                    </div>
                </div>
                <button
                    className={`follow-btn flex center border-radius-m ${isFollowing ? 'clicked' : ''}`}
                    onClick={handleFollow}
                >
                    {isFollowing ? (
                        <span>Following</span>
                    ) : (
                        <>
                            <AddIcon /> <span>Follow</span>
                        </>
                    )}
                </button>
            </div>
        );
};

export default FollowCard;
