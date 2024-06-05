import React, { useState } from 'react';
import axios from 'axios';

const SupplierRegistration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('');
    const [suburb, setSuburb] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            await axios.post('/api/registerSupplier', {
                email,
                password,
                companyName,
                contactNumber,
                address,
                suburb
            });
        } catch (error) {
            console.error('An error occurred. Please try again.', error);
        }
    };
    

    return (
        <div>
            <h2>Supplier Registration</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Company Name:</label>
                    <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contact Number:</label>
                    <input
                        type="text"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Suburb:</label>
                    <input
                        type="text"
                        value={suburb}
                        onChange={(e) => setSuburb(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default SupplierRegistration;
