import { useEffect, useState } from 'react';
import axios from 'axios';

import UserCard from './UserCard/UserCard';

import './network.css';

const Network = ({ user_id }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get('/users/get.php');
                if (response.data.status === 'success') {
                    console.log(response.data);
                    setUsers(response.data.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getUsers();
    }, []);

    console.log(users);

    return (
        <div className="main flex wrap">
            {users.map((user) => (user.id !== user_id ? <UserCard key={user.id} user={user} /> : null))}
        </div>
    );
};

export default Network;
