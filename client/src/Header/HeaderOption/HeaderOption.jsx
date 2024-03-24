import { useNavigate } from 'react-router-dom';

import './headeroption.css';
import { Avatar } from '@mui/material';

const HeaderOption = ({ Icon, title }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (title === 'Me') {
            navigate('/profile');
        } else if (title === 'Home') {
            navigate('/');
        } else {
            navigate('/network');
        }
    };
    
    return (
        <div className="headerOption flex column center" onClick={handleClick}>
            {Icon ? <Icon className="headerOption-icon" /> : <Avatar className="headerOption-icon" />}
            <h3 className="headerOption-title">{title}</h3>
        </div>
    );
};

export default HeaderOption;
