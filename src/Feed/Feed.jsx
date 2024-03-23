import './style.css'

import CreateIcon from '@mui/icons-material/Create';
import InputOption from './InputOption/InputOption';

import ImageIcon from '@mui/icons-material/Image';
import SubscriptionIcon from '@mui/icons-material/Subscriptions';
import EventNotIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';

const Feed = () => {
    return (
        <div className="feed">
            <div className="feed-input-container border-radius white-bg">
                <div className="feed-input flex border border-radius-l">
                    <CreateIcon/>
                    <form className='flex'>
                        <input type="text" />
                        <button type='submit'>Send</button>
                    </form>
                </div>
                <div className="feed-input-options flex space-evenly">
                    <InputOption Icon={ImageIcon} title='Photo' />
                    <InputOption Icon={SubscriptionIcon} title='Video' />
                    <InputOption Icon={EventNotIcon} title='Event' />
                    <InputOption Icon={CalendarViewDayIcon} title='Write Article' />

                </div>
            </div>
        </div>
    )
}

export default Feed;