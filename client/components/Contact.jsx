import React from 'react';
import NavBar from './NavBar.jsx';
import '../../server/public/style/contact.scss'

const Contact = () => {
    return (
        <div>
            <NavBar />
            <div className="content">
                <h2>Contact Information</h2>
                <p>Email: example@example.com</p>
                <p>Phone: +1 234 567 890</p>
                <p>Address: 123 Main St, City, Country</p>
                <p>A list of our suppliers and theyre contact information can be found <a>here</a> </p>
                <p>If you are a supplier and would like to join please fill out this form</p>
            </div>
        </div>
    );
};

export default Contact;
