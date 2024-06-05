import React, { useState, useEffect } from 'react';
import { database } from '../../server/firebase'; 
import { ref, get } from 'firebase/database';
import Navbar from './NavBar.jsx';
import '../../server/public/style/manageusers.scss';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersRef = ref(database, 'users');
                const usersSnapshot = await get(usersRef);

                if (usersSnapshot.exists()) {
                    const usersArray = Object.entries(usersSnapshot.val()).map(([id, userData]) => ({ id, ...userData }));
                    setUsers(usersArray);
                } else {
                    console.log('No users found');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="content">
                {loading && <p>Loading users...</p>}
                {error && <p>Error fetching users: {error}</p>}
                {users.length === 0 && !loading && <p>No users found.</p>}
                {users.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th></th>
                                {/* Add more user details as needed */}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td><button>Delete User</button></td>
                                    {/* Add more user details as needed */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
