import { Avatar } from '@mui/material';
import './sidebar.css';

const Sidebar = ({ userData, followers, isCompany }) => {
    const { first_name, last_name , email, name } = userData;
    const followersCount = followers.total_following;

    return (
        <div className="sidebar flex column border-radius border box-shadow">
            <div className="sidebar-top flex column center white-bg">
                <img src="/assets/bg.jpg" alt="background" />
                <Avatar className="sidebar-avatar" />
                <h2>Welcome, {isCompany ? name : first_name + ' ' + last_name}</h2>
                <h4>{email}</h4>
            </div>
            <div className="sidebar-stats white-bg">
                <div className="sidebar-stat flex space-between">
                    <p>Connections</p>
                    <p className="sidebar-statnumber">{followersCount}</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
