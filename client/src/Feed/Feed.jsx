import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './feed.css';

import CreateIcon from '@mui/icons-material/Create';
import InputOption from './InputOption/InputOption';
import Sidebar from './Sidebar/Sidebar';

import ImageIcon from '@mui/icons-material/Image';
import EventNotIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import Post from './Post/Post';

import FollowCard from './FollowCard/FollowCard';

const Feed = ({ user_id }) => {
    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [topUsers, setTopUsers] = useState([]);

    useEffect(() => {
        const getAllPosts = async (user_id) => {
            try {
                const getAllPostsResponse = await axios.get('/posts/get.php');
                const getUserDataResponse = await axios.get('/users/get.php?id=' + user_id);
                const getFollowersResponse = await axios.get('/followers/get.php?user_id=' + user_id);
                const getTopUsersResponse = await axios.get('/followers/gettop.php');

                const sortedPosts = getAllPostsResponse.data.data.sort((a, b) => {
                    return new Date(b.created_at) - new Date(a.created_at);
                });

                setPosts(sortedPosts);
                setUserData(getUserDataResponse.data.data);
                setFollowers(getFollowersResponse.data.data);
                setTopUsers(getTopUsersResponse.data.data);
            } catch (error) {
                console.log(error.message);
            }
        };

        getAllPosts(user_id);
    }, [user_id]);

    const addPost = async (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('email', userData.email);
        data.append('message', input);

        try {
            const response = await axios.post('/posts/add.php', data);

            if (response.data.status === 'success') {
                setPosts(response.data.data);
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    if (userData && followers) {
        return (
            <div className="feed flex">
                <Sidebar userData={userData} followers={followers} />
                <div className="feed-main">
                    <div className="feed-input-container border-radius white-bg box-shadow border">
                        <div className="feed-input flex border border-radius-l">
                            <CreateIcon />
                            <form className="flex">
                                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                                <button onClick={addPost} type="submit">
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
                        {posts.length > 0 &&
                            posts.map((post) => {
                                return (
                                    <Post
                                        key={post.id}
                                        posterName={userData?.first_name + ' ' + userData?.last_name}
                                        message={post?.description}
                                        date={post?.created_at}
                                    />
                                );
                            })}
                    </div>
                </div>
                <div className="right-section border-radius white-bg border box-shadow">
                    <h3 className="dark-text">Add to your feed</h3>
                    {topUsers?.map((user) => {
                        return <FollowCard key={user.id} user={user} />;
                    })}
                </div>
            </div>
        );
    }
};
export default Feed;
