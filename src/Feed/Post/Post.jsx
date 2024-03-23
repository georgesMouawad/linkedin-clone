import { Avatar } from '@mui/material';
import './post.css'
import InputOption from '../InputOption/InputOption';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';

const Post = ({name, description, message, photoUrl}) => {
    return <div className="post border-radius">
        <div className="post-header flex">
            <Avatar/>
            <div className="post-info">
                <h2>{name}</h2>
                <p>{description}</p>
            </div>
        </div>
        <div className="post-body">
            <p>{message}</p>
        </div>
        <div className="post-buttons flex space-evenly">
            <InputOption Icon={ThumbUpIcon} title='Like'/>
            <InputOption Icon={ChatIcon} title='Comment'/>
            <InputOption Icon={SendIcon} title='Apply'/>
        </div>
    </div>

}

export default Post;