import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { database } from '../../server/firebase'; // Adjust the import path as needed
import '../../server/public/style/profile.scss';
import Navbar from './NavBar.jsx';
import { useAuth } from './AuthContext.jsx'

const Profile = () => {
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log(currentUser)

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
        <div>
            <Navbar />
            <div className="content">
                <h2>User Profile</h2>
                {loading && <p>Loading user data...</p>}
                {error && <p>Error fetching user data: {error}</p>}
                {userData && (
                    <div>
                        <p>Email: {userData.email}</p>
                        <p>First Name: {userData.firstName}</p>
                        <p>Last Name: {userData.lastName}</p>
                        <p>Address: {userData.address}</p>
                        {/* Add more fields as needed */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
