import React, { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../../server/firebase';
import { Link } from 'react-router-dom'; // If using React Router for navigation
import Navbar from './NavBar.jsx';
import Select from 'react-select';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

   
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const productsRef = ref(database, 'products'); 
            const snapshot = await get(productsRef);
            if (snapshot.exists()) {
                const productsData = snapshot.val();
                const productsArray = Object.keys(productsData).map((key) => ({
                    id: key,
                    ...productsData[key],
                }));
                setProducts(productsArray);
            } else {
                setProducts([]);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    
    useEffect(() => {
        fetchProducts();
    }, []);

    
    const filterProductsByLetter = (letter) => {
        const filteredProducts = products.filter((product) =>
            product.name.startsWith(letter)
        );
        setProducts(filteredProducts);
    };

    const filterProducts = () => {
        if (searchQuery.trim() !== '') {
            const filteredProducts = products.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setProducts(filteredProducts);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="content">
                <h2>Shop</h2>
                <div id="search-container"> 
                <input
                        type="text"
                        id="custom-search-input"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
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
                    <button type="button" id="custom-search-button" onClick={filterProducts}>
                        Search
                    </button>
                </div>
                <div id="abc-search">
                    <div>
                        {Array.from(Array(26)).map((_, index) => (
                            <button key={index} onClick={() => filterProductsByLetter(String.fromCharCode(65 + index))}>
                                {String.fromCharCode(65 + index)}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="product-list">
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                    {!loading && !error && products.length === 0 && <p>No products found.</p>}
                    {!loading && !error && products.length > 0 && (
                        <ul>
                            {products.map((product) => (
                                console.log('Product:', product),
                                <li key={product.id}>
                                    <Link
                                        to={{
                                        pathname: `/product/${product.id}`,
                                        state: product, 
                                        }}
                                    >
                                        <h3>{product.name}</h3>
                                        <p>{product.description}</p>
                                        <p>Price: ${product.price}</p>
                                    </Link>

                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;
