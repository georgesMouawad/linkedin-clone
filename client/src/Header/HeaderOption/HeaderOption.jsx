import { useNavigate } from 'react-router-dom';

import './headeroption.css';
import { Avatar } from '@mui/material';

const HeaderOption = ({ Icon, title }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (title === 'Me') {
            const isCompany = JSON.parse(localStorage.getItem('currentUser')).isCompany;
            const id = JSON.parse(localStorage.getItem('currentUser')).id;

            !isCompany ? navigate(`/profile?id=${id}`) : navigate(`/profile?id=${id}&isCompany=true`);
        } else if (title === 'Home') {
            navigate('/');
        } else if (title === 'Jobs') {
            navigate('/jobs');
        } else if (title === 'Network') {
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
