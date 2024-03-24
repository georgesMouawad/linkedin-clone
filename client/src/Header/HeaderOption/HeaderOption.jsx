import './headeroption.css';
import { Avatar } from '@mui/material';

const HeaderOption = ({Icon, title }) => {
    return (
        <div className="headerOption flex column center">
            {Icon ? <Icon className="headerOption-icon" /> : <Avatar className="headerOption-icon"/>}
            <h3 className="headerOption-title">{title}</h3>
        </div>
    );
};

export default HeaderOption;
