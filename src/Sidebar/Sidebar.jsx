import { Avatar } from '@mui/material';
import './sidebar.css';
import '../styles/utilities.css';

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
        <div className="sidebar border-radius">
            <div className="sidebar-top flex column center white-bg">
                <img src="/assets/bg.jpg" alt="background" />
                <Avatar className="sidebar-avatar" />
                <h2>Welcom, {name}</h2>
                <h4>{email}</h4>
            </div>
            <div className="sidebar-stats">
                <div className="sidebar-stat flex space-between">
                    <p>Connections</p>
                    <p className="sidebar-statnumber">{connections.length}</p>
                </div>
            </div>
            {/* <div className="sidebar-bottom flex column">
                <p>Recent</p>
            </div> */}
        </div>
    );
};

export default Sidebar;
