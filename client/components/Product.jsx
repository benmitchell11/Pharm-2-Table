import React from 'react';
import NavBar from './NavBar.jsx';
import "../../server/public/style/product.scss";

const Product = (product) => {
    console.log("product is" + product)

    
    

    return (
        <div>
            <NavBar />
            <div className="content">
                <h1>Hello GeeksforGeeks pages</h1>
                <p>Name: </p>
                <p>Description: </p>
            </div>
        </div>
    );
};

export default Product;
