import React, { useEffect, useState } from 'react';
import './feed.css';

import CreateIcon from '@mui/icons-material/Create';
import InputOption from './InputOption/InputOption';
import Sidebar from '../Sidebar/Sidebar';

import ImageIcon from '@mui/icons-material/Image';
import SubscriptionIcon from '@mui/icons-material/Subscriptions';
import EventNotIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import Post from './Post/Post';

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
        <div className="feed flex space-evenly">

            <Sidebar name={name} email={email} connections={connections} />

            <div className="feed-input-container border-radius white-bg">
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
                    <InputOption Icon={ImageIcon} title="Photo" />
                    <InputOption Icon={SubscriptionIcon} title="Video" />
                    <InputOption Icon={EventNotIcon} title="Event" />
                    <InputOption Icon={CalendarViewDayIcon} title="Write Article" />
                </div>
            </div>
            {/* map through posts desturcture and pass as props */}

            {posts.map((post) => (
                <Post />
            ))}
        </div>
    );
};

export default Feed;
