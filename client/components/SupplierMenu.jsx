// Flyout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import "../../server/public/style/suppliermenu.scss"

const SupplierMenu = ({ userData, onClose }) => {
    const navigate = useNavigate();

    const handleAddProducts = () => {
        navigate('/add-products'); 
      };

    const handleProductStatistics = () => {
    navigate('/product-statistics'); 
      };
    
    const handlePendingOrders = () => {
    navigate('/pending-orders'); 
    };

    const handlePendingPrescriptions = () => {
        navigate('/pending-prescriptions'); 
        };

    return (
        <div className="supplier-content">
            <button className="supplier-button" onClick={handlePendingPrescriptions}>View Pending Prescription Requests</button>
            <button className="supplier-button" onClick={handlePendingOrders}>View Order Requests</button>
            <button className="supplier-button" onClick={handleAddProducts}>Add Products</button>
            <button className="supplier-button" onClick={handleProductStatistics}>View Product Statistics</button>
        </div>
    );
};

export default SupplierMenu;
