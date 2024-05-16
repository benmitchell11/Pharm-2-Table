import React from 'react';
import NavBar from './NavBar.jsx';

const AboutPage = () => {
    return (
        <div>
            <NavBar />
            <div className="content">
                <h2>About Pharm 2 Table</h2>
                <p>
                    Pharm 2 Table is an innovative platform that connects pharmacies directly
                    with suppliers to streamline the supply chain of pharmaceutical products.
                </p>
                <p>
                    Our goal is to revolutionize the way pharmacies manage their inventory and
                    procure essential medicines, ensuring timely delivery and optimal stock levels.
                </p>
                <p>
                    With Pharm 2 Table, pharmacies can access a wide range of products from
                    trusted suppliers, manage orders efficiently, and improve overall operational
                    efficiency in the healthcare sector.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
