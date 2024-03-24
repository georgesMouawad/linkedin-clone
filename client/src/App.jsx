import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Header/Header';
import Feed from './Feed/Feed';
import Authentication from './Authentication/Authentication';
import Profile from './Profile/Profile';

import './App.css';
import './styles/utilities.css';
import './styles/colors.css';

const App = () => {
    const mockData = {
        id: '1',
        first_name: 'John',
        last_name: 'Doe',
        bio: 'Software Engineer with 5 years of experience in building web applications.',
        occupation: 'Software Engineer',
        location: 'New York, NY',
        connections: ['Alice', 'Bob', 'Charlie'],
        experiences: [
            {
                position: 'Senior Software Engineer',
                company: 'Tech Co',
                startDate: '2018',
                endDate: 'Present',
                logoUrl: '/assets/company1.png',
            },
            {
                position: 'Software Engineer',
                company: 'Startup Inc',
                startDate: '2015',
                endDate: '2018',
                logoUrl: '/assets/company2.png',
            },
        ],
        educations: [
            {
                school: 'University of ABC',
                degree: 'Bachelor of Science in Computer Science',
                field: 'Computer Science',
                startDate: '2011',
                endDate: '2015',
            },
        ],
        skills: ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS'],
    };

    return (
        <div className="app flex column light-gray-bg ">
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Feed currentUserId={mockData.id} />} />
                    <Route path="/auth" element={<Authentication />} />
                    <Route
                        path="/profile"
                        element={
                            <Profile
                                first_name={mockData.first_name}
                                last_name={mockData.last_name}
                                bio={mockData.bio}
                                occupation={mockData.occupation}
                                location={mockData.location}
                                connections={mockData.connections}
                                experiences={mockData.experiences}
                                educations={mockData.educations}
                                skills={mockData.skills}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
