import React from 'react';	
import { Link } from 'react-router-dom';
import Navbar from './NavBar.jsx';

const AdminMenu = () => {

    return (
        <div>  
             <Navbar />
             <div className="content">
                <ul>
                    <li><Link to="/manage-users">Manage Users</Link></li>
                    <li><Link to="/account-requests">View Pending Account Requests</Link></li>
                </ul>
             </div>
        </div>
    );     
}

export default AdminMenu