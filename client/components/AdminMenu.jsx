import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import "../../server/public/style/adminmenu.scss"

const AdminMenu = ({ userData, onClose }) => {
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

    return (
        <div className="admin-content">
            <button className="admin-button" onClick={handlePendingApplications}>View Pending Applications</button>
            <button className="admin-button" onClick={handleManageUsers}>Manage Users</button>
            <button className="admin-button" onClick={handleAddSupplier}>Add Supplier Account</button>
            <button className="admin-button">View Supplier Requests</button>
        </div>
    );
};

export default AdminMenu;