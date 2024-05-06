import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../server/public/style/navbar.scss';
import { useAuth } from './AuthContext.jsx';
import { ref, get } from 'firebase/database';
import { database } from '../../server/firebase'; // Adjust the import path as needed
import { signOut } from 'firebase/auth';
import { auth } from '../../server/firebase';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/');// Redirect or perform any additional actions after sign-out
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userRef = ref(database, 'users/' + currentUser.uid);
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

        if (currentUser) {
            fetchUserData();
        }
    }, [currentUser]);

    return (
        <nav id="navbar">
            <div id="logo-container">
                <img src="img/logo.png" className="logo" id="logo" alt="Logo" />
            </div>
            <div id="links-container">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/shop">Shop</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    {loading && <li>Loading user data...</li>}
                    {error && <li>Error fetching user data: {error}</li>}
                    {userData && (
                        <>
                            {userData.isAdmin && <li><Link to="/admin-menu">Admin</Link></li>}
                            <li>Welcome, {userData.firstName || userData.email}</li>
                            {/* Add a sign-out button here */}
                        </>
                    )}
                    {!currentUser &&(
                        <>
                            <li><Link to="/signin">Sign In</Link></li>
                            <li><Link to="/registration">Register</Link></li>
                        </>
                    )}
                </ul>
            </div>
            <div className="signout-container">
                {!currentUser && (
                    <button type="button" className="signout-button" onClick={handleSignOut}>Sign Out</button>
                )}   
            </div>
            <div id="buttons-container">
                <button type="button" className="user-button"><img src="img/user.png" className="user-icon" alt="User Icon"/></button>
                <button type="button" className="cart-button"><img src="img/cart.png" className="cart-icon" alt="Cart Icon"/></button>
            </div>
        </nav>
    );
};

export default Navbar;
