import React, { useState, useEffect } from 'react';
import NavBar from './NavBar.jsx';
import { ref, onValue } from 'firebase/database';
import { database } from '../../server/firebase'; // Import your Firebase database instance
import PrescriptionFile from './PrescriptionFile.jsx';
import '../../server/public/style/pendingprescriptions.scss';

const PendingPrescriptions = () => {
    const [pendingPrescriptions, setPendingPrescriptions] = useState([]);
    const [selectedPrescription, setSelectedPrescription] = useState(null);

    useEffect(() => {
        // Fetch pending prescriptions from the backend API
        fetchPendingPrescriptions();
    }, []);

    const fetchPendingPrescriptions = () => {
        const prescriptionsRef = ref(database, 'prescriptions');
        onValue(prescriptionsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const prescriptionsArray = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setPendingPrescriptions(prescriptionsArray);
            } else {
                setPendingPrescriptions([]);
            }
        });
    };

    const handleApprovePrescription = async (prescriptionId) => {
        try {
            
            const response = await fetch(`api/prescriptions/${prescriptionId}/approve`, {
                method: 'PUT',
            });
            if (response.ok) {
                
                fetchPendingPrescriptions();
            } else {
                console.error('Failed to approve prescription:', response.statusText);
            }
        } catch (error) {
            console.error('Error approving prescription:', error);
        }
    };

    const handleRejectPrescription = async (prescriptionId) => {
        try {
           
            const response = await fetch(`api/prescriptions/${prescriptionId}/reject`, {
                method: 'PUT',
            });
            if (response.ok) {
                
                fetchPendingPrescriptions();
            } else {
                console.error('Failed to reject prescription:', response.statusText);
            }
        } catch (error) {
            console.error('Error rejecting prescription:', error);
        }
    };

    const openModal = (prescription) => {
        setSelectedPrescription(prescription);
        console.log(prescription)
    };

    const closeModal = () => {
        setSelectedPrescription(null);
    };

    return (
        <div>
            <NavBar />
            <div className="content">
                <h2>Pending Prescriptions</h2>
                <ul>
                    {pendingPrescriptions.map(prescription => (
                        <li key={prescription.id}>
                            Prescription ID: {prescription.id}<br />
                            Patient: {prescription.userFirstName} {prescription.userLastName}<br />
                            Prescription Date: {prescription.prescriptionDate}<br />
                            <a className="view-file" onClick={() => openModal(prescription)}>View Prescription File</a><br />
                            <button onClick={() => handleApprovePrescription(prescription.id)}>Approve</button>
                            <button onClick={() => handleRejectPrescription(prescription.id)}>Reject</button>
                        </li>
                    ))}
                </ul>
                {selectedPrescription && (
                    <PrescriptionFile
                        prescription={selectedPrescription}
                        closeModal={closeModal}
                    />
                )}
            </div>
        </div>
    );
};

export default PendingPrescriptions;
