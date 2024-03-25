import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './feed.css';

import CreateIcon from '@mui/icons-material/Create';
import InputOption from './InputOption/InputOption';
import ImageIcon from '@mui/icons-material/Image';
import EventNotIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';

import Post from './Post/Post';
import Sidebar from './Sidebar/Sidebar';
import FollowCard from './FollowCard/FollowCard';

const Feed = () => {
    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [topUsers, setTopUsers] = useState([]);

    const user_id = JSON.parse(localStorage.getItem('currentUser')).id;
    const isCompany = JSON.parse(localStorage.getItem('currentUser')).isCompany;

    useEffect(() => {
        const getFeedData = async (user_id) => {
            let getUrl = '';

            try {
                isCompany ? (getUrl = '/companies/get.php?id=') : (getUrl = '/users/get.php?id=');
                const getUserDataResponse = await axios.get(getUrl + user_id);
                const getFollowersResponse = await axios.get('/followers/get.php?user_id=' + user_id);
                const getTopUsersResponse = await axios.get(
                    '/followers/gettop.php?user_id=' + user_id + (isCompany ? '&isCompany=company' : '')
                );

                setUserData(getUserDataResponse.data.data);
                setFollowers(getFollowersResponse.data.data);
                setTopUsers(getTopUsersResponse.data.data);
            } catch (error) {
                console.log(error.message);
            }
        };

        getFeedData(user_id);
    }, [user_id, isCompany]);

    useEffect(() => {
        const getAllPosts = async () => {
            try {
                const response = await axios.get('/posts/get.php');
                const sortedPosts = response.data.data.sort((a, b) => {
                    return new Date(b.created_at) - new Date(a.created_at);
                });
                setPosts(sortedPosts);
            } catch (error) {
                console.log(error.message);
            }
        };

        getAllPosts();
    }, []);

    const addPost = async (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('email', userData.email);
        data.append('description', input);

        try {
            const response = await axios.post('/posts/add.php', data);
            console.log(response.data);

            if (response.data.status === 'success') {
                const newPost = response.data.data;
                setPosts([newPost, ...posts]);
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.log(error.message);
        }

        setInput('');
    };

    if (userData)
        return (
            <div className="feed flex">
                <Sidebar userData={userData} followers={followers} isCompany={isCompany} />
                <div className="feed-main">
                    <div className="feed-input-container border-radius white-bg box-shadow border">
                        <div className="feed-input flex border border-radius-l">
                            <CreateIcon />
                            <form className="flex">
                                <input type="text" value={input} onChange={(event) => setInput(event.target.value)} />
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
                                return <Post key={post.id} post={post} userData={userData} />;
                            })}
                    </div>
                </div>
                <div className="right-section border-radius white-bg border box-shadow">
                    <h3 className="dark-text">Add to your feed</h3>
                    {topUsers.map((topUser) => {
                        return <FollowCard key={topUser.followee_id} topUser={topUser} user_id={user_id}  />;
                    })}
                </div>
            </div>
        );
};
export default Feed;
