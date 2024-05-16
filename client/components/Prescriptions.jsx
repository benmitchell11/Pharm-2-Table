import React, { useState, useEffect } from 'react';
import { storage, database, auth } from '../../server/firebase'; 
import { useAuth } from './AuthContext.jsx';
import { ref as sRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref, push, set, get } from 'firebase/database';
import Navbar from './NavBar.jsx';

const Prescriptions = () => {
    const [prescriptionFile, setPrescriptionFile] = useState(null);
    const [uploadError, setUploadError] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPrescriptionFile(file);
    };

    const handleUpload = async () => {
        if (!prescriptionFile) {
            setUploadError('Please select a file to upload.');
            return;
        }
        console.log(userData)

        try {
            
            const storageRef = sRef(storage, `prescriptions/${currentUser.uid}/${prescriptionFile.name}`);
            await uploadBytes(storageRef, prescriptionFile);

            
            const imageUrl = await getDownloadURL(storageRef);
            console.log('Image uploaded:', imageUrl);

           
            const prescriptionsRef = ref(database, 'prescriptions');
            const newPrescriptionRef = push(prescriptionsRef);
            await set(newPrescriptionRef, {
                prescriptionID: newPrescriptionRef.key,
                userID: currentUser.uid,
                userFirstName: userData.firstName,
                userLastName: userData.lastName,
                imageURL: imageUrl,
                prescriptionDate: new Date(),
            });
            
            
            setUploadSuccess(true);
        } catch (error) {
            setUploadError(error.message);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='content'>
                <h1>Prescriptions</h1>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload Prescription</button>
                {uploadError && <p>Error: {uploadError}</p>}
                {uploadSuccess && <p>Upload successful!</p>}
            </div>
        </div>
    );
};

export default Prescriptions;
