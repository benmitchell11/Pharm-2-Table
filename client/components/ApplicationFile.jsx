import React from 'react';
import '../../server/public/style/applicationfile.scss';

const ApplicationFile = ({ application, closeModal }) => {
    console.log('Application Modal - Application:', application);
    
    
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <img src={application.imageUrl} alt="Application" />
            </div>
        </div>
    );
};

export default ApplicationFile;