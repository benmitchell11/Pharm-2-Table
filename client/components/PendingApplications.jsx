import React, { useState, useEffect } from 'react';
import { database } from '../../server/firebase'; 
import { ref, get, update } from 'firebase/database';
import NavBar from './NavBar.jsx';
import '../../server/public/style/pendingapplication.scss';

const PendingApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const applicationsRef = ref(database, 'pendingApplications');
                const applicationsSnapshot = await get(applicationsRef);

                if (applicationsSnapshot.exists()) {
                    const applicationsData = [];
                    applicationsSnapshot.forEach((childSnapshot) => {
                        const application = childSnapshot.val();
                        applicationsData.push(application);
                    });
                    setApplications(applicationsData);
                } else {
                    console.log('No pending applications found');
                }
            } catch (error) {
                console.error('Error fetching pending applications:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const handleApprove = async (applicationId) => {
        try {
            const applicationRef = ref(database, `pendingApplications/${applicationId}`);
            await update(applicationRef, { status: 'approved' });
        } catch (error) {
            console.error('Error approving application:', error);
            setError(error.message);
        }
    };

    const handleReject = async (applicationId) => {
        try {
            const applicationRef = ref(database, `pendingApplications/${applicationId}`);
            await update(applicationRef, { status: 'rejected' });
        } catch (error) {
            console.error('Error rejecting application:', error);
            setError(error.message);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="content">
                <h2>Pending Applications</h2>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {!loading && applications.length === 0 && <p>No pending applications</p>}
                {!loading && applications.length > 0 && (
                    <ul>
                        {applications.map((application) => (
                            <li key={application.id}>
                                <p>Name: {application.name}</p>
                                <p>Email: {application.email}</p>
                                <p>Status: {application.status}</p>
                                {application.status === 'pending' && (
                                    <>
                                        <button onClick={() => handleApprove(application.id)}>
                                            Approve
                                        </button>
                                        <button onClick={() => handleReject(application.id)}>
                                            Reject
                                        </button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default PendingApplications;
