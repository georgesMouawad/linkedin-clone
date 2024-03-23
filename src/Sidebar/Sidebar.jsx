import { Avatar } from '@mui/material';
import './style.css';
import '../styles/utilities.css';

const Sidebar = () => {
    
        const recentItem = (topic) => { return (
            <div className="sidebar-recentItem flex">
                <span className="sidebar-hash">#</span>
                <p>{topic}</p>
            </div>)
        };
    
    return (
        <div className="sidebar border-radius">
            <div className="sidebar-top flex column center white-bg">
                <img src="/assets/bg.jpg" alt="background" />
                <Avatar className="sidebar-avatar" />
                <h2>Georges</h2>
                <h4>Georges@mail.com</h4>
            </div>
            <div className="sidebar-stats">
                <div className="sidebar-stat flex space-between">
                    <p>Who viewed you</p>
                    <p className="sidebar-statnumber">1003</p>
                </div>
                <div className="sidebar-stat flex space-between">
                    <p>Views on posts</p>
                    <p className="sidebar-statnumber">1083</p>
                </div>
            </div>
            <div className="sidebar-bottom flex column">
                <p>Recent</p>
                {recentItem('programmign')}
                {recentItem('design')}
                {recentItem('software')}
            </div>
        </div>
    );
};

export default Sidebar;
