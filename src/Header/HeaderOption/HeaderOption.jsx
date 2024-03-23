import './headeroption.css';
import { Avatar } from '@mui/material';

const HeaderOption = ({ avatar, Icon, title }) => {
    return (
        <div className="headerOption flex column center">
            {Icon && <Icon className="headerOption-icon" />}
            {avatar && <Avatar className="headerOption-icon" src={avatar} />}
            <h3 className="headerOption-title">{title}</h3>
        </div>
    );
};

export default HeaderOption;
