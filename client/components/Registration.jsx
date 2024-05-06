import React, { useState } from 'react';
import { auth, database, storage} from '../../server/firebase'; // Adjust the path as per your project structure
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set, push } from 'firebase/database';
import FileUpload from './FileUpload.jsx';
import {  uploadBytes, getDownloadURL, ref as sRef } from 'firebase/storage';
import Navbar from './NavBar.jsx';


const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User registered:', userCredential.user);

            const storageRef = sRef(storage, `images/${userCredential.user.uid}/${imageFile.name}`);
            await uploadBytes(storageRef, imageFile);

            // Get download URL for the uploaded image
            const imageUrl = await getDownloadURL(storageRef);
            console.log('Image uploaded:', imageUrl);

    
            const userData = {
                email: userCredential.user.email,
                uid: userCredential.user.uid,
                firstName: firstName,
                lastName: lastName,
                address: address,
                imageUrl: imageUrl,
                isAdmin: false,
                isVerified: false,

                // Additional user data as needed
            };
    
            // Add user data to Realtime Database
            await set(ref(database, 'users/' + userCredential.user.uid), userData);
            console.log('User data added to Realtime Database');
    
            // Redirect or show success message
        } catch (error) {
            setError(error.message);
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setImageFile(selectedFile);
    };

    return (
        <div>
            <Navbar />
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
                        type="firstName"
                        placeholder='First Name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input 
                        type="lastName"
                        placeholder='Last Name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <input 
                        type="address"
                        placeholder='Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <input 
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
            {error && <div>{error}</div>}
        </div>
    );
};

export default Registration;
