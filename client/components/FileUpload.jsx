import React, { useState } from 'react';
import { storage } from '../../server/firebase'; // Import the storage instance from your firebase.js file

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        try {
            if (!file) {
                setError('Please select a file');
                return;
            }

            const storageRef = storage.ref();
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file);
            const downloadUrl = await fileRef.getDownloadURL();

            // Save the download URL to the users table or wherever you want
            // For example, if you have a users collection in Firestore:
            // const usersRef = firestore.collection('users');
            // const userId = '...'; // Get the user ID somehow
            // await usersRef.doc(userId).update({ imageUrl: downloadUrl });

            setImageUrl(downloadUrl);
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {error && <div>{error}</div>}
            {imageUrl && <img src={imageUrl} alt="Uploaded" />}
        </div>
    );
};

export default FileUpload;
