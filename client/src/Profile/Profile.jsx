import { useEffect, useState } from 'react';
import axios from 'axios';

import './profile.css';

import { Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import AddForm from './AddForm/AddForm';
import { useSearchParams } from 'react-router-dom';

const Profile = () => {
    const [profileData, setProfileData] = useState([]);
    const [educationHistory, setEducationHistory] = useState([]);
    const [experienceHistory, setExperienceHistory] = useState([]);
    const [skills, setSkills] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [occupation, setOccupation] = useState('');
    const [isFollowing, setIsFollowing] = useState(false);

    const [searchParams] = useSearchParams();
    const user_id = searchParams.get('id');
    const isCompany = searchParams.get('isCompany');

    const loggedUser = JSON.parse(localStorage.getItem('currentUser'));
    const isOwnProfile = loggedUser?.id === user_id;

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

        const getCompanyProfile = async () => {
            try {
                const profileDataResponse = await axios.get('/companies/get.php?id=' + user_id);
                const followersResponse = await axios.get('/followers/get.php?user_id=' + user_id);
                setProfileData(profileDataResponse.data.data);
                setFollowers(followersResponse.data.data);
            } catch (error) {
                console.log(error.message);
            }
        };

        const getFollowStatus = async () => {
            try {
                const response = await axios.get(
                    '/followers/check.php?follower_id=' +
                        loggedUser.id +
                        '&followee_id=' +
                        parseInt(user_id) +
                        '&followee_type=' +
                        (isCompany ? 'company' : 'user')
                );

                setIsFollowing(response.data.data);
            } catch (error) {
                console.log(error.message);
            }
        };

        isCompany ? getCompanyProfile() : getProfile();
        getFollowStatus();
    }, [user_id, isCompany, loggedUser.id]);

    const handleDeleteClick = async (id, sectionName) => {
        const data = new FormData();
        data.append('id', id);
        data.append('user_id', user_id);

        try {
            const response = await axios.post(`/${sectionName}s/delete.php?`, data);
            if (sectionName === 'education') {
                setEducationHistory(educationHistory.filter((education) => education.id !== id));
            } else if (sectionName === 'experience') {
                setExperienceHistory(experienceHistory.filter((experience) => experience.id !== id));
            } else if (sectionName === 'skill') {
                setSkills(skills.filter((skill) => skill.id !== id));
            }
            console.log(response);
        } catch (error) {
            console.log(error.message);
        }
    };

    const Experience = ({ experience }) => {
        const { id, position, company, start_date, end_date } = experience;
        return (
            <div className="flex space-between">
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
                {isOwnProfile && (
                    <ClearIcon className="edit dark-text" onClick={() => handleDeleteClick(id, 'experience')} />
                )}
            </div>
        );
    };

    const Education = ({ education }) => {
        const { id, school, degree, field_of_study, start_date, end_date } = education;
        return (
            <div className="flex space-between">
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
                {isOwnProfile && (
                    <ClearIcon className="edit dark-text" onClick={() => handleDeleteClick(id, 'education')} />
                )}
            </div>
        );
    };

    const Skill = ({ skill }) => {
        const { id } = skill;
        return (
            <div className="flex space-between">
                <div className="skills flex column">
                    <h4 className="dark-text">{skill.skill}</h4>
                </div>
                {isOwnProfile && (
                    <ClearIcon className="edit dark-text" onClick={() => handleDeleteClick(id, 'skill')} />
                )}
            </div>
        );
    };

    const HeaderTop = ({ headername }) => {
        const [showForm, setShowForm] = useState(false);

        const handleAddClick = () => {
            setShowForm(true);
        };

        const handleFormSubmit = (formData) => {
            const data = new FormData();

            switch (headername) {
                case 'About':
                    data.append('user_id', user_id);
                    data.append('first_name', formData.first_name);
                    data.append('last_name', formData.last_name);
                    data.append('bio', formData.bio);
                    break;
                case 'Experience':
                    data.append('user_id', user_id);
                    data.append('position', formData.position);
                    data.append('company', formData.company);
                    data.append('start_date', formData.start_date);
                    data.append('end_date', formData.end_date);
                    break;
                case 'Education':
                    data.append('user_id', user_id);
                    data.append('school', formData.school);
                    data.append('degree', formData.degree);
                    data.append('field_of_study', formData.field_of_study);
                    data.append('start_date', formData.start_date);
                    data.append('end_date', formData.end_date);
                    break;
                case 'Skills':
                    data.append('user_id', user_id);
                    data.append('skill', formData.skill);
                    break;
                default:
                    break;
            }

            setShowForm(false);
        };

        const handleFormCancel = () => {
            setShowForm(false);
        };

        return (
            <div className="top flex space-between">
                <h3>{headername}</h3>
                {isOwnProfile && <AddIcon className="edit dark-text" onClick={handleAddClick} />}
                {/* Pass down showForm, onSubmit, and onCancel as props to AddForm */}
                {showForm && (
                    <AddForm
                        formType={headername === 'About' ? 'Edit Profile' : `Add ${headername}`}
                        onSubmit={(formData) => handleFormSubmit(formData)}
                        onCancel={handleFormCancel}
                    />
                )}
            </div>
        );
    };

    const handleFollow = async () => {
        const data = new FormData();
        data.append('follower_id', loggedUser.id);
        data.append('followee_id', user_id);
        data.append('followee_type', isCompany ? 'company' : 'user');

        try {
            const response = await axios.post('/followers/toggle.php', data);
            setIsFollowing(response.data.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    if (profileData)
        return (
            <div className="profile flex column light-gray-bg">
                <div className="profile-header border-radius border white-bg">
                    <img src="/assets/bg.jpg" alt="" />
                    <Avatar className="profile-avatar" />
                    <div className="profile-info">
                        <h2>{isCompany ? profileData.name : profileData.first_name + ' ' + profileData.last_name}</h2>
                        <h4>{occupation.position}</h4>
                        <h5>
                            Connections: <span>{followers.total_following}</span>
                        </h5>
                        {!isOwnProfile && (
                            <>
                                <button
                                    className={`profile-button ${isFollowing ? 'clicked' : ''}`}
                                    onClick={handleFollow}
                                >
                                    {isFollowing ? 'Following' : 'Follow'}
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <div className="profile-section border-radius border white-bg">
                    <HeaderTop headername={'About'} />
                    <p>{isCompany ? profileData.description : profileData.bio}</p>
                </div>
                {!isCompany && (
                    <>
                        <div className="profile-section border-radius border white-bg">
                            <HeaderTop headername={'Experience'} />
                            {experienceHistory.length > 0 &&
                                experienceHistory.map((experience) => (
                                    <Experience key={experience.id} experience={experience} />
                                ))}
                        </div>
                        <div className="profile-section border-radius border white-bg">
                            <HeaderTop headername={'Education'} />
                            {educationHistory?.length > 0 &&
                                educationHistory.map((education) => (
                                    <Education key={education.id} education={education} />
                                ))}
                        </div>
                        <div className="profile-section border-radius border white-bg">
                            <HeaderTop headername={'Skills'} />
                            {skills.length > 0 && skills.map((skill) => <Skill key={skill.id} skill={skill} />)}
                        </div>
                    </>
                )}
            </div>
        );
};

export default Profile;
