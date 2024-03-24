import React, { useEffect, useState } from 'react';
import './feed.css';

import CreateIcon from '@mui/icons-material/Create';
import InputOption from './InputOption/InputOption';
import Sidebar from './Sidebar/Sidebar';

import ImageIcon from '@mui/icons-material/Image';
import EventNotIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import Post from './Post/Post';

import AddIcon from '@mui/icons-material/Add';
import FollowCard from './FollowCard/FollowCard';

const Feed = () => {
    const name = 'John Doe';
    const email = 'john.doe@example.com';
    const connections = ['Alice', 'Bob', 'Charlie'];

    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        //fetch posts
        //setPosts
    }, []);

    const sendPost = (e) => {
        e.preventDefault();
        //link and set input as message
        setPosts([...posts]);

        setInput('');
        e.target.reset();
    };

    return (
        <div className="feed flex">
            <Sidebar name={name} email={email} connections={connections} />
            <div className="feed-main">
                <div className="feed-input-container border-radius white-bg box-shadow border">
                    <div className="feed-input flex border border-radius-l">
                        <CreateIcon />
                        <form className="flex">
                            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                            <button onClick={sendPost} type="submit">
                                Send
                            </button>
                        </form>
                    </div>
                    <div className="feed-input-options flex space-evenly">
                        <InputOption Icon={ImageIcon} title="Media" />
                        <InputOption Icon={EventNotIcon} title="Event" />
                        <InputOption Icon={CalendarViewDayIcon} title="Write Article" />
                    </div>
                </div>
                <div className="posts-container">
                    <Post
                        name={'How to lose 100 bucks'}
                        description={'This post will make you learn how to lose your money on job applicaitons'}
                        message={'Please ignore the message from this post'}
                    />
                </div>
            </div>
            <div className="right-section border-radius white-bg border box-shadow">
                <h3 className='dark-text'>Add to your feed</h3>
                {/* map through several user from users and pass as props 
                to <FollowCard/>*/}

                <FollowCard user_id={1} />
                
            </div>
            {/* map through posts desturcture and pass as props */}
            {/* 
            {posts.map((post) => (
                <Post />
            ))} */}
        </div>
    );
};

export default Feed;
