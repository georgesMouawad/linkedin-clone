import { useEffect, useState } from 'react';
import axios from 'axios';

import './profile.css';

import { Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const Profile = ({ user_id }) => {
    const [profileData, setProfileData] = useState(null);
    const [educationHistory, setEducationHistory] = useState(null);
    const [experienceHistory, setExperienceHistory] = useState(null);
    const [skills, setSkills] = useState(null);
    const [followers, setFollowers] = useState(null);
    const [occupation, setOccupation] = useState(null);

    // const [showEditPopup, setShowEditPopup] = useState(false);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const profileDataResponse = await axios.get('/users/get.php?id=' + user_id);
                const educationHistoryResponse = await axios.get('/educations/get.php?user_id=' + user_id);
                const experienceHistoryResponse = await axios.get('/experiences/get.php?user_id=' + user_id);
                const skillsResponse = await axios.get('/skills/get.php?user_id=' + user_id);
                const followersResponse = await axios.get('/followers/get.php?user_id=' + user_id);
                const occupationResponse = await axios.get('/experiences/getcurrent.php?user_id=' + user_id);

                setProfileData(profileDataResponse.data.data);
                setEducationHistory(educationHistoryResponse.data.data);
                setExperienceHistory(experienceHistoryResponse.data.data);
                setSkills(skillsResponse.data.data);
                setFollowers(followersResponse.data.data);
                setOccupation(occupationResponse.data.data);
            } catch (error) {
                console.log(error.message);
            }
        };

        getProfile();
    }, [user_id]);

    const Experience = ({ experience }) => {
        const { position, company, start_date, end_date } = experience;
        return (
            <div className="info-section flex">
                <img src="/assets/company.png" alt="" />
                <div className="text">
                    <h4 className="dark-text">{position}</h4>
                    <h5 className="light-text">{company}</h5>
                    <h5 className="light-text">
                        {start_date} - {end_date ? end_date : 'Present'}
                    </h5>
                </div>
            </div>
        );
    };

    const Education = ({ education }) => {
        const { school, degree, field_of_study, start_date, end_date } = education;
        return (
            <div className="info-section flex">
                <img src="/assets/school.png" alt="" />
                <div className="text">
                    <h4 className="dark-text">{degree}</h4>
                    <h5 className="light-text">{school}</h5>
                    <h5 className="light-text">{field_of_study}</h5>
                    <h5 className="light-text">
                        {start_date} - {end_date ? end_date : 'Present'}
                    </h5>
                </div>
            </div>
        );
    };

    const Skill = ({ skill }) => {
        return (
            <div className="skills flex column">
                <h4 className="dark-text">{skill.skill}</h4>
            </div>
        );
    };

    const HeaderTop = ({ headername }) => {
        return (
            <div className="top flex space-between">
                <h3>{headername}</h3>
                {isOwnProfile && <EditIcon className="edit dark-text"/>}
            </div>
        );
    };

    // const toggleEditPopup = () => {
    //     return 
    // }

    const loggedUser = JSON.parse(localStorage.getItem('currentUser'));
    const isOwnProfile = loggedUser?.id === user_id;

    return (
        <div className="profile flex column light-gray-bg">
            <div className="profile-header border-radius border white-bg">
                <img src="/assets/bg.jpg" alt="" />
                <Avatar className="profile-avatar" />
                <div className="profile-info">
                    <h2>
                        {profileData?.first_name} {profileData?.last_name}
                    </h2>
                    <h4>{occupation?.position}</h4>
                    <h5>
                        Connections <span>{followers?.total_following}</span>
                    </h5>
                    {!isOwnProfile && <button className="profile-button white-text">Connect</button>}
                </div>
            </div>
            <div className="profile-section border-radius border white-bg">
                <HeaderTop headername={'About'} />
                <p>{profileData?.bio}</p>
            </div>
            <div className="profile-section border-radius border white-bg">
                <HeaderTop headername={'Experience'} />
                {experienceHistory?.map((experience) => (
                    <Experience key={experience.id} experience={experience} />
                ))}
            </div>
            <div className="profile-section border-radius border white-bg">
                <HeaderTop headername={'Education'} />
                {educationHistory?.map((education) => (
                    <Education key={education.id} education={education} />
                ))}
            </div>
            <div className="profile-section border-radius border white-bg">
                <HeaderTop headername={'Skills'} />
                {skills?.map((skill) => (
                    <Skill key={skill.id} skill={skill} />
                ))}
            </div>
        </div>
    );
};

export default Profile;
