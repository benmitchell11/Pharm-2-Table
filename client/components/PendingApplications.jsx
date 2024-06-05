import React, { useState, useEffect } from 'react';
import { database } from '../../server/firebase'; 
import { ref, get, update } from 'firebase/database';
import NavBar from './NavBar.jsx';
import ApplicationFile from './ApplicationFile.jsx'; // Import your ApplicationFile component
import Select from 'react-select';
import '../../server/public/style/pendingapplication.scss';

const PendingApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedApplication, setSelectedApplication] = useState(null);

    const statusOptions = [
        { value: 'Pending', label: 'Pending' },
        { value: 'Approved', label: 'Approved' },
        { value: 'Rejected', label: 'Rejected' },
    ];

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const applicationsRef = ref(database, 'applications');
                const applicationsSnapshot = await get(applicationsRef);

                if (applicationsSnapshot.exists()) {
                    const applicationsData = [];
                    applicationsSnapshot.forEach((childSnapshot) => {
                        const application = { id: childSnapshot.key, ...childSnapshot.val() };
                        applicationsData.push(application);
                    });
                    setApplications(applicationsData);
                } else {
                    console.log('No applications found');
                }
            } catch (error) {
                console.error('Error fetching applications:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        const fetchUserData = async () => {
            try {
                
                const userRef = ref(database, 'users/' + application.userID);
                const userDataSnapshot = await get(userRef);

                if (userDataSnapshot.exists()) {
                    setUserData(userDataSnapshot.val());
                } else {
                    console.log('User data not found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const handleChangeStatus = async (applicationId, newStatus) => {
        try {
            const applicationRef = ref(database, `applications/${applicationId}`);
            await update(applicationRef, { status: newStatus });
            setApplications(applications.map(app => app.id === applicationId ? { ...app, status: newStatus } : app));
        } catch (error) {
            console.error('Error changing application status:', error);
            setError(error.message);
        }
    };

    const openModal = (application) => {
        setSelectedApplication(application);
    };

    const closeModal = () => {
        setSelectedApplication(null);
    };

    const pendingApplications = applications.filter(app => app.status === 'Pending');
    const approvedApplications = applications.filter(app => app.status === 'Approved');
    const rejectedApplications = applications.filter(app => app.status === 'Rejected');

    return (
        <div>
            <NavBar />
            <div className="content">
                <h2>Pending Applications</h2>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {!loading && pendingApplications.length === 0 && <p>No pending applications</p>}
                {!loading && pendingApplications.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <td>Application ID</td>
                            <td>Email</td>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>File</td>
                            <td>Status</td>
                        </tr>
                    </thead>
                    <tbody>
                    {pendingApplications.map((application) => (
                        <tr key={application.id}>
                            <td>{application.id}</td>
                            <td>{application.email}</td>
                            <td>{application.firstName}</td>
                            <td>{application.lastName}</td>
                            <td><a className="view-file" onClick={() => openModal(application)}>View Application File</a></td>
                            <td>
                                <Select
                                    value={{ value: application.status, label: application.status }}
                                    options={statusOptions}
                                    onChange={(selectedOption) => handleChangeStatus(application.id, selectedOption.value)}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                )}
                <h2>Approved Applications</h2>
                {!loading && approvedApplications.length === 0 && <p>No approved applications</p>}
                {!loading && approvedApplications.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <td>Application ID</td>
                                <td>Email</td>
                                <td>First Name</td>
                                <td>Last Name</td>
                                <td>File</td>
                                <td>Status</td>  
                            </tr>
                        </thead>
                        <tbody>
                            {approvedApplications.map((application) => (
                                <tr key={application.id}>
                                    <td>{application.id}</td>
                                    <td>{application.email}</td>
                                    <td>{application.firstName}</td>
                                    <td>{application.lastName}</td>
                                    <td><a className="view-file" onClick={() => openModal(application)}>View Application File</a></td>
                                    <td>
                                        <Select
                                            value={{ value: application.status, label: application.status }}
                                            isDisabled="true"
                                            options={statusOptions}
                                            onChange={(selectedOption) => handleChangeStatus(application.id, selectedOption.value)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}          
                <h2>Rejected Applications</h2>
                {!loading && rejectedApplications.length === 0 && <p>No rejected applications</p>}
                {!loading && rejectedApplications.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <td>Application ID</td>
                                <td>Email</td>
                                <td>First Name</td>
                                <td>Last Name</td>
                                <td>File</td>
                                <td>Status</td>  
                            </tr>
                        </thead>
                        <tbody>
                            {rejectedApplications.map((application) => (
                                <tr key={application.id}>
                                    <td>{application.id}</td>
                                    <td>{application.email}</td>
                                    <td>{application.firstName}</td>
                                    <td>{application.lastName}</td>
                                    <td><a className="view-file" onClick={() => openModal(application)}>View Application File</a></td>
                                    <td>
                                        <Select
                                            value={{ value: application.status, label: application.status }}
                                            isDisabled="true"
                                            options={statusOptions}
                                            onChange={(selectedOption) => handleChangeStatus(application.id, selectedOption.value)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            {selectedApplication && (
                <ApplicationFile application={selectedApplication} closeModal={closeModal} />
            )}
        </div>
    );
};

export default PendingApplications;
