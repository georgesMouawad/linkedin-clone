import { Avatar } from '@mui/material';
import './sidebar.css';

const Sidebar = ({ name, email, connections }) => {
    // const recentItem = (topic) => {
    //     return (
    //         <div className="sidebar-recentItem flex">
    //             <span className="sidebar-hash">#</span>
    //             <p>{topic}</p>
    //         </div>
    //     );
    // };

    return (
        <div className="sidebar flex column border-radius border box-shadow">
            <div className="sidebar-top flex column center white-bg">
                <img src="/assets/bg.jpg" alt="background" />
                <Avatar className="sidebar-avatar" />
                <h2>Welcome, {name}</h2>
                <h4>{email}</h4>
            </div>
            <div className="sidebar-stats white-bg">
                <div className="sidebar-stat flex space-between">
                    <p>Connections</p>
                    <p className="sidebar-statnumber">{connections.length}</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
