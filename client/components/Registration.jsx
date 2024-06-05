import React, { useState } from 'react';
import { auth, database, storage } from '../../server/firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { uploadBytes, getDownloadURL, ref as sRef } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './NavBar.jsx';
import '../../server/public/style/registration.scss';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [showPendingMessage, setShowPendingMessage] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Register the user without signing in
            const response = await axios.post('/api/createUser', {
                email,
                password,
                firstName,
                lastName,
                address,
                imageFile,

            });
    
            
    
            setShowPendingMessage(true);
        } catch (error) {
            setError(error.message);
        }
    };
    
    

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setImageFile(selectedFile);
    };

    const handleClosePopup = () => {
        setShowPendingMessage(false);
        navigate('/'); // Redirect to the home page
    };

    return (
        <div>
            <Navbar />
            <div className="modal">
                <div className="content">
                    <h2>Registration</h2>
                    <form onSubmit={handleRegister}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input 
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input 
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <input 
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <input 
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <button type="button" onClick={handleRegister}>Register</button>
                    </form>
                    {error && <div className="error-message">{error}</div>}
                </div>
            </div>
            {showPendingMessage && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Application Pending</h3>
                        <p>Your application is still pending. You will receive an email once it is approved.</p>
                        <button onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Registration;
