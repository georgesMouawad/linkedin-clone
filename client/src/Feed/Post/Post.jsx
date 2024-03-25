import { Avatar } from '@mui/material';
import './post.css';

const Post = ({ post, userData }) => {
    const { poster_name, email, date, description } = post;

    return (
        <div className="post border-radius box-shadow border white-bg">
            <div className="post-header flex">
                <Avatar />
                <div className="post-info">
                    <h2>{poster_name}</h2>
                    <p>{date}</p>
                </div>
            </div>
            <div className="post-body">
                <p>{description}</p>
            </div>
            <div className="post-buttons flex dark-text">
                {/* {userData.email === email && <> <EditIcon />
                <ClearIcon /> </>} */}
            </div>
        </div>
    );
};

export default Post;
