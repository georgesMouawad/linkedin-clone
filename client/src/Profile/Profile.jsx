import { Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import './profile.css';

const Profile = ({ first_name, last_name, bio, occupation, location, connections, experiences, educations, skills }) => {
    const Experience = ({ position, company, startDate, endDate, logoUrl }) => {
        return (
            <div className="info-section flex">
                <img src="/assets/company.png" alt="" />
                <div className="text">
                    <h4 className="dark-text">{position}</h4>
                    <h5 className="light-text">{company}</h5>
                    <h5 className="light-text">
                        {startDate} - {endDate}
                    </h5>
                </div>
            </div>
        );
    };

    const Education = ({ school, degree, field, startDate, endDate }) => {
        return (
            <div className="info-section flex">
                <img src="/assets/school.png" alt="" />
                <div className="text">
                    <h4 className="dark-text">{degree}</h4>
                    <h5 className="light-text">{school}</h5>
                    <h5 className="light-text">{field}</h5>
                    <h5 className="light-text">
                        {startDate} - {endDate}
                    </h5>
                </div>
            </div>
        );
    };

    const Skill = ({ skill }) => {
        return (
            <div className="skills flex column">
                    <h4 className="dark-text">{skill}</h4>
            </div>
        );
    };

    return (
        <div className="profile flex column light-gray-bg">
            <div className="profile-header border-radius border white-bg">
                <img src="/assets/bg.jpg" alt="" />
                <Avatar className="profile-avatar" />
                <div className="profile-info">
                    <h2>
                        {first_name} {last_name}
                    </h2>
                    <h4>{occupation}</h4>
                    <h5>{location}</h5>
                    <h5>Connections <span>{connections.length}</span></h5>
                    <button className="profile-button white-text">Connect</button>
                </div>
            </div>
            <div className="profile-section border-radius border white-bg">
                <h3>About</h3>
                <p>{bio}</p>
            </div>
            <div className="profile-section border-radius border white-bg">
                <h3>Experience</h3>
                {experiences.map((experience) => (
                    <Experience
                        position={experience.position}
                        company={experience.company}
                        startDate={experience.startDate}
                        endDate={experience.endDate}
                        logoUrl={experience.logoUrl}
                    />
                ))}
            </div>
            <div className="profile-section border-radius border white-bg">
                <h3>Education</h3>
                {educations.map((education) => (
                    <Education
                        school={education.school}
                        degree={education.degree}
                        field={education.field}
                        startDate={education.startDate}
                        endDate={education.endDate}
                    />
                ))}
            </div>
            <div className="profile-section border-radius border white-bg">
                <h3>Skills</h3>
                {skills.map((skill) => (
                    <Skill skill={skill} />
                ))}
            </div>
        </div>
    );
};

export default Profile;
