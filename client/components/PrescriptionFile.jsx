import React from 'react';
import '../../server/public/style/prescriptionfile.scss';

const PrescriptionFile = ({ prescription, closeModal }) => {
    console.log('Prescription Modal - Prescription:', prescription);
    
    
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <img src={prescription.imageURL} alt="Prescription" />
            </div>
        </div>
    );
};

export default PrescriptionFile;
