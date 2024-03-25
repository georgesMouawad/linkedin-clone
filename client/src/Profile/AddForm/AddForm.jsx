import { useState } from 'react';

import './addform.css';

const AddForm = ({ formType, onSubmit, onCancel }) => {
    const [formData, setformData] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleCancel = () => {
        onCancel();
    };

    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="profile-edit-popup">
            <div className="popup-container">
                <div className="popup-content">
                    <h3>{formType}</h3>
                    <form className="flex column center" onSubmit={handleSubmit}>
                        {formType === 'Edit Profile' && (
                            <>
                                <input type="text" placeholder="First Name" name="first_name" required onChange={handleChange} />
                                <input type="text" placeholder="Last Name" name="last_name" required onChange={handleChange} />
                                <textarea placeholder="Your bio..." name="bio" onChange={handleChange}></textarea>
                            </>
                        )}
                        {formType === 'Add Experience' && (
                            <>
                                <input type="text" placeholder="Position" name="position" onChange={handleChange} />
                                <input type="text" placeholder="Company" name="company" onChange={handleChange} />
                                <input type="text" placeholder="Start Date" name="start_date" onChange={handleChange} />
                                <input type="text" placeholder="End Date" name="end_date" onChange={handleChange} />
                            </>
                        )}
                        {formType === 'Add Education' && (
                            <>
                                <input type="text" placeholder="School" name="school" onChange={handleChange} />
                                <input type="text" placeholder="Degree" name="degree" onChange={handleChange} />
                                <input
                                    type="text"
                                    placeholder="Field of Study"
                                    name="field_of_study"
                                    onChange={handleChange}
                                />
                                <input type="text" placeholder="Start Date" name="start_date" onChange={handleChange} />
                                <input type="text" placeholder="End Date" name="end_date" onChange={handleChange} />
                            </>
                        )}
                        {formType === 'Add Skills' && (
                            <>
                                <input type="text" placeholder="Skill" name="skill" onChange={handleChange} />
                            </>
                        )}
                        <button type="submit" className="profile-button">
                            Add
                        </button>
                        <button type="button" className="profile-button cancel-button" onClick={handleCancel}>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddForm;
