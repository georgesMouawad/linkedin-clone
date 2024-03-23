import { Avatar } from '@mui/material';
import './style.css';
import '../styles/utilities.css';

const Sidebar = () => {
    return (
        <div className="sidebar border-radius">
            <div className="sidebar-top flex column center border">
                <img src="" alt="" />
                <Avatar className="sidebar-avatar" />
                <h2>Georges</h2>
                <h4>Georges@mail.com</h4>
            </div>
            <div className="sidebar-stats">
                <div className="sidebar-stat">
                    <p>Who viewed you</p>
                    <p className="sidebar-statnumber">1003</p>
                </div>
                <div className="sidebar-stat">
                    <p>Views on posts</p>
                    <p className="sidebar-statnumber">1083</p>
                </div>
            </div>
            <div className="sidebar-button">
                <p>Recent</p>

            </div>
        </div>
    );
};

export default Sidebar;
