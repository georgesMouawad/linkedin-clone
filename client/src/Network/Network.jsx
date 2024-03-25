import { useEffect, useState } from 'react';
import axios from 'axios';

import UserCard from './UserCard/UserCard';

import './network.css';

const Network = ({ user_id }) => {
    const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const getUsers = await axios.get('/users/get.php');
                const getCompanies = await axios.get('/companies/get.php');
                
                setUsers(getUsers.data.data);
                setCompanies(getCompanies.data.data);

            } catch (error) {
                console.error(error);
            }
        };

        getUsers();
    }, []);


    

    return (
        <div className="main flex wrap">
            {users.map((user) => (user.id !== user_id ? <UserCard key={user.id} user={user} /> : null))}
            {companies.map((company) => <UserCard key={company.id} user={company} />)}
        </div>
    );
};

export default Network;
