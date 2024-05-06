import React, { useState, useEffect } from 'react';
import { ref, get, database } from 'firebase/database';
import { Link } from 'react-router-dom'; // If using React Router for navigation
import Navbar from './NavBar.jsx';
import Select from 'react-select';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    

    return (
        <div>
            <Navbar />
            <div className="content">
                <h2>Shop</h2>
                <div id="search-container"> 
                    <input type="text" id="custom-search-input" placeholder="Search" />
                    <Select 
                        name="category-selector"
                        id="category-selector"
                        placeholder={'All Categories'}
                        options= {[
                            { value:"1", label: 'Allergy'},
                            { value:"2", label: 'Painkillers'},
                            { value:"3", label: 'Nasal'},
                            { value:"4", label: 'Cold Medicine'}
                        ]}
                    />
                    <button type="button" id="custom-search-button">Search</button>
                </div>
                <div id="abc-search" >
                <div>
                    {Array.from(Array(26)).map((_, index) => (
                        <button key={index} onClick={() => filterProductsByLetter(String.fromCharCode(65 + index))}>
                            {String.fromCharCode(65 + index)}
                        </button>
                    ))}
                </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
