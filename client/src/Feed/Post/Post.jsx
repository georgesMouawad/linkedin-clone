import { Avatar } from '@mui/material';
import './post.css'
import InputOption from '../InputOption/InputOption';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';

const Post = ({posterName, message}) => {
    return <div classposterName="post border-radius box-shadow border">
        <div classposterName="post-header flex">
            <Avatar/>
            <div classposterName="post-info">
                <h2>{posterName}</h2>
            </div>
        </div>
        <div classposterName="post-body">
            <p>{message}</p>
        </div>
        <div classposterName="post-buttons flex space-evenly">
            <InputOption Icon={ThumbUpIcon} title='Like'/>
            <InputOption Icon={ChatIcon} title='Comment'/>
            <InputOption Icon={SendIcon} title='Apply'/>
        </div>
    </div>

}

export default Post;