import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import { auth } from '../../server/firebase';
import SignIn from './SignIn.jsx';
import Register from './Registration.jsx'; 
import { getDatabase, ref, get } from 'firebase/database';
import { database } from '../../server/firebase';
import '../../server/public/style/usermenu.scss';

const UserMenu = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (currentUser) {
                    const userRef = ref(database, 'users/' + currentUser.uid);
                    const userDataSnapshot = await get(userRef);

                    if (userDataSnapshot.exists()) {
                        setUserData(userDataSnapshot.val());
                    } else {
                        console.log('User data not found');
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [currentUser]);

    const handleEditProfile = () => {
        navigate('/profile'); 
    };

    const handleUserOrders = () => {
        navigate('/user-orders'); 
    };

    const handleSignOut = async () => {
        console.log("Button Pressed")
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const handleSignIn = () => {
       {/*} setIsSignInModalOpen(true); // Open the Sign In modal
        setIsRegisterModalOpen(false) */}
        navigate('/signin');
    };

    const handleRegister = () => {
       {/* setIsRegisterModalOpen(true); // Open the Register modal
        setIsSignInModalOpen(false) */}
        navigate('/registration');
    };

    return (
        <div className="usermenu-content">
            {currentUser ? (
                <>
                    <h1>{userData?.firstName + ' ' + userData?.lastName || userData?.email + userData?.isAdmin}</h1>
                    <button className="user-button" onClick={handleEditProfile}>Edit Profile</button>
                    <button className="user-button" onClick={handleUserOrders}>View Orders</button>
                    <button className="user-button" onClick={handleSignOut}>Sign Out</button>
                </>
            ) : (
                <>
                    <button className="user-button" onClick={handleSignIn}>Sign In</button>
                    <button className="user-button" onClick={handleRegister}>Register</button>
                </>
            )}
            
            {/* Modals */}
            {isSignInModalOpen && <SignIn onClose={() => setIsSignInModalOpen(false)} />}
            {isRegisterModalOpen && <Register onClose={() => setIsRegisterModalOpen(false)} />}
        </div>
    );
};

export default UserMenu;
