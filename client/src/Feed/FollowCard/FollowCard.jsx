import './followcard.css';

import { Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const FollowCard = ({ user_id }) => {
    

    const getUserData = (user_id) => {
        //fetch user data from user_id API call
        return {
            name: 'John Wayne',
            imageUrl: null,
            occupation: getCurrentOccupation()
        }
    }

    const getCurrentOccupation = () => {
        //fetch user data from user_id API call
        return 'Software Engineer';
    }

    const handleOnclick = () => {
        console.log('Followed', name);
    }

    const { name, imageUrl, occupation } = getUserData(user_id);


    return (<div className="follow">
    <div className="follow-card flex center">
        {!imageUrl ? <Avatar className='avatar'/> : <img src={imageUrl} alt="profile" className='avatar' />}
        <div className="follow-card-info">
            <h4>{name}</h4>
            <p className='light-text'>{occupation}</p>
        </div>
    </div>
    <button className='follow-btn flex center border-radius-m' onClick={handleOnclick}><AddIcon/> <span>Follow</span></button>
</div>)
}

export default FollowCard;