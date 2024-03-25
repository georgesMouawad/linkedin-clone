import React from 'react';

import './addform.css';

const AddForm = ({ formType, onSubmit, onCancel }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    const handleCancel = () => {
        onCancel();
    }

    return (
        <div className="profile-edit-popup">
            <div className="popup-container">
                <div className="popup-content">
                    <h3>{formType}</h3>
                    <form className="flex column center" onSubmit={handleSubmit}>
                        {formType === 'Edit Profile' && (
                            <>
                                <input type="text" placeholder="First Name" />
                                <input type="text" placeholder="Last Name" />
                                <textarea placeholder="Your bio..."></textarea>
                            </>
                        )}
                        {formType === 'Add Experience' && (
                            <>
                                <input type="text" placeholder="Position" name="position" />
                                <input type="text" placeholder="Company" name="company" />
                                <input type="text" placeholder="Start Date" name="start_date" />
                                <input type="text" placeholder="End Date" name="end_date" />
                            </>
                        )}
                        {formType === 'Add Education' && (
                            <>
                                <input type="text" placeholder="School" name="school" />
                                <input type="text" placeholder="Degree" name="degree" />
                                <input type="text" placeholder="Field of Study" name="field_of_study" />
                                <input type="text" placeholder="Start Date" name="start_date" />
                                <input type="text" placeholder="End Date" name="end_date" />
                            </>
                        )}
                        {formType === 'Add Skills' && (
                            <>
                                <input type="text" placeholder="Skill" name="skill" />
                            </>
                        )}
                        <button type="submit" className="profile-button">
                            Add
                        </button>
                        <button type="button" className="profile-button cancel-button" onClick={handleCancel}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddForm;
