import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { database } from '../../server/firebase';
import "../../server/public/style/adminmenu.scss";

const AdminMenu = ({ userData, onClose }) => {
    const [pendingApplications, setPendingApplications] = useState(0);
    const [pendingSupplierApplications, setPendingSupplierApplications] = useState(0);
    const navigate = useNavigate();

    const handleManageUsers = () => {
        navigate('/manage-users'); 
    };

    const handlePendingApplications = () => {
        navigate('/pending-applications'); 
    };

    const handleAddSupplier = () => {
        navigate('/add-supplier'); 
    };

    const handleSupplierRequests = () => {
        navigate('/supplier-requests');
    };

    useEffect(() => {
        const fetchPendingApplications = async () => {
            try {
                const applicationsRef = ref(database, 'applications');
                const snapshot = await get(applicationsRef);
                if (snapshot.exists()) {
                    const applications = snapshot.val();
                    const pendingCount = Object.values(applications).filter(app => app.status === 'Pending').length;
                    setPendingApplications(pendingCount);
                }
            } catch (error) {
                console.error('Error fetching pending applications:', error);
            }
        };

        const fetchPendingSupplierApplications = async () => {
            try {
                const supplierApplicationsRef = ref(database, 'supplierApplications');
                const snapshot = await get(supplierApplicationsRef);
                if (snapshot.exists()) {
                    const supplierApplications = snapshot.val();
                    const pendingCount = Object.values(supplierApplications).filter(app => app.status === 'Pending').length;
                    setPendingSupplierApplications(pendingCount);
                }
            } catch (error) {
                console.error('Error fetching pending supplier applications:', error);
            }
        };

        fetchPendingApplications();
        fetchPendingSupplierApplications();
    }, []);

    return (
        <div className="admin-content">
            <button className="admin-button" onClick={handlePendingApplications}>
                View Pending Applications {pendingApplications > 0 && <div className="notification-bubble-2">{pendingApplications}</div>}
            </button>
            <button className="admin-button" onClick={handleManageUsers}>Manage Users</button>
            <button className="admin-button" onClick={handleAddSupplier}>Add Supplier Account</button>
            <button className="admin-button" onClick={handleSupplierRequests}>
                View Supplier Requests {pendingSupplierApplications > 0 && <div className="notification-bubble-2">{pendingSupplierApplications}</div>}
            </button>
        </div>
    );
};

export default AdminMenu;
