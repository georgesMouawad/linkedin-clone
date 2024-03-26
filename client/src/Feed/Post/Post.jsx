import { Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import axios from 'axios';

import './post.css';

const Post = ({ post = {}, job = {} }) => {
    const { poster_name, date, description} = post;
    const {id , title, job_description, company_name, created_at} = job;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));


    const handleJobApply = () => {
        try {
            const data = new FormData();
            data.append('user_id', currentUser.id);
            data.append('job_id', id);

            axios.post('/applications/add.php', data).then((response) => {
                console.log(response.data);
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="post border-radius box-shadow border white-bg">
            <div className="post-header flex">
                <Avatar />
                <div className="post-info">
                    <h2>{poster_name || company_name}</h2>
                    <p>{date || created_at}</p>
                </div>
            </div>
            <div className="post-body">
                {title && <p>{title}</p>}
                <p>{description || job_description}</p>
            </div>
            <div className="post-buttons flex dark-text">
                {job && !currentUser.isCompany && <SendIcon className='send-icon' onClick = {handleJobApply} />}
            </div>
        </div>
    );
};

export default Post;
