// supplierController.js
const { admin, createUserApp } = require('../admin');

async function createSupplier(req, res) {
    try {
        const { email, password, address, suburb, companyName, contactNumber } = req.body;

        // Create the user using Firebase Auth
        const userRecord = await createUserApp.auth().createUser({
            email,
            password,
        });

        // Save user data to Realtime Database
        const userData = {
            email: email,
            userId: userRecord.uid,
            firstName: "",
            lastName: "",
            address: address,
            isAdmin: false,
            isSupplier: true, // Marking as a supplier
            isVerified: false,
            verifiedUntilDate: ''
            // Add other user data as needed
        };

        await createUserApp.database().ref('users/' + userRecord.uid).set(userData);

        // Save supplier data to Realtime Database
        const supplierData = {
            userId: userRecord.uid,
            email: email,
            address: address,
            suburb: suburb,
            companyName: companyName,
            contactNumber: contactNumber, // Include the image URL for the supplier
            // Add other supplier data as needed
        };

        await createUserApp.database().ref('suppliers/' + userRecord.uid).set(supplierData);

        const supplierApplicationData = {
            supplierID: userRecord.uid,
            companyName: companyName,
            email: email,
            status: "Pending"
        };

        await createUserApp.database().ref('supplierApplications/' + userRecord.uid).set(supplierApplicationData);

        res.status(200).json({ message: 'Supplier created successfully.', uid: userRecord.uid });
    } catch (error) {
        console.error('Error creating supplier:', error);
        res.status(500).json({ error: 'Failed to create supplier.' });
    }
}

module.exports = { createSupplier };
