const { admin, createUserApp } = require('../admin');

// Function to upload image to Firebase Storage and get the URL
async function uploadImageToStorage(file, userId) {
    const bucket = admin.storage().bucket();
    const fileRef = bucket.file(`images/${userId}/${file.originalname}`);

    await fileRef.save(file.buffer);
    const [url] = await fileRef.getSignedUrl({
        action: 'read',
        expires: '03-01-2500' // set an appropriate expiration date
    });

    return url;
}

async function createUser(req, res) {
    try {
        const { email, password, firstName, lastName, address } = req.body;

        // Create the user using Firebase Auth
        const userRecord = await createUserApp.auth().createUser({
            email,
            password,
        });

        // Upload image and get URL if file exists
        let imageUrl = null;
        if (req.file) {
            imageUrl = await uploadImageToStorage(req.file, userRecord.uid);
        }

        // Save user data to Realtime Database
        const userData = {
            email: email,
            userId: userRecord.uid,
            firstName: firstName,
            lastName: lastName,
            address: address,
            isAdmin: false,
            isSupplier: false,
            isVerified: false,
            verifiedUntilDate: ''
            // Add other user data as needed
        };

        await createUserApp.database().ref('users/' + userRecord.uid).set(userData);

        const applicationData = {
            email: email,
            userID: userRecord.uid,
            firstName: firstName,
            lastName: lastName,
            status: 'Pending',
            imageUrl: imageUrl // Include the image URL in the application data
        };

        await createUserApp.database().ref('applications/' + userRecord.uid).set(applicationData);

        res.status(200).json({ message: 'User created successfully.', uid: userRecord.uid });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user.' });
    }
}

module.exports = { createUser };
