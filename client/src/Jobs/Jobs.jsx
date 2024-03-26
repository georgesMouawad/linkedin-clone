import { useEffect, useState } from 'react';
import axios from 'axios';
import './jobs.css';
import Post from '../Feed/Post/Post';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
    const isCompany = JSON.parse(localStorage.getItem('currentUser')).isCompany;

    useEffect(() => {
        axios.get('/jobs/get.php')
            .then((response) => {
                const sortedJobs = response.data.data.sort((a, b) => {
                    return new Date(b.created_at) - new Date(a.created_at);
                });
                setJobs(sortedJobs);
            });
    }, []);

    const addJob = async (event) => {
        event.preventDefault();

        const data = new FormData()
        data.append('company_id', currentUserId)
        data.append('title', event.target.title.value)
        data.append('description', event.target.description.value)

        try {
            const response = await axios.post('/jobs/add.php', data);
            console.log(response.data);

            if (response.data.status === 'success') {
                const newJob = response.data.data;
                setJobs([newJob, ...jobs]);
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="jobs-main">
            {isCompany && (
                <>
                    <div className="input-main">
                        <div className="border-radius white-bg box-shadow border">
                            <div className="inputs-container flex center border border-radius-l">
                                <form className="inputs flex column" onSubmit={addJob}>
                                    <input type="text" name="title" placeholder="Job title" required />
                                    <input type="text" name="description" placeholder="Job description" required />
                                    <button type="submit">Add Job</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className="jobs-container">
                {jobs.map((job) => (
                    <div className="jobs-container">
                        <Post key={job.id} job={job} />
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Jobs;
