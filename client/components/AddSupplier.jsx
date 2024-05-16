import React, { useState } from 'react';
import NavBar from './NavBar.jsx';
import '../../server/public/style/addsupplier.scss';

const AddSupplier = () => {
    const [supplierData, setSupplierData] = useState({
        name: '',
        email: '',
        password: '',
        contact: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplierData({ ...supplierData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('api/suppliers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(supplierData),
            });
            if (response.ok) {
                
                setSupplierData({
                    name: '',
                    email: '',
                    password: '',
                    contact: '',
                });
                setError('');
                alert('Supplier account added successfully.');
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to add supplier account.');
            }
        } catch (error) {
            console.error('Error adding supplier account:', error);
            setError('An error occurred while adding the supplier account.');
        }
    };

    return (
        <div>
            <NavBar />
            <div className='content'>
                <h2>Add Supplier Account</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Supplier Name:</label>
                    <input type="text" id="name" name="name" value={supplierData.name} onChange={handleChange} required />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={supplierData.email} onChange={handleChange} required />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={supplierData.password} onChange={handleChange} required />

                    <label htmlFor="contact">Contact Number:</label>
                    <input type="text" id="contact" name="contact" value={supplierData.contact} onChange={handleChange} required />

                    <button type="submit">Add Supplier</button>
                </form>
            </div>
        </div>
    );
};

export default AddSupplier;
