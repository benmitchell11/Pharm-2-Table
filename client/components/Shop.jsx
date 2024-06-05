import React, { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../../server/firebase';
import { Link } from 'react-router-dom'; // If using React Router for navigation
import Navbar from './NavBar.jsx';
import '../../server/public/style/shop.scss'

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

    const filterProducts = () => {
        if (searchQuery.trim() !== '') {
            const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setProducts(filtered);
        } else {
            fetchProducts();
        }
    };

    const handleSearchInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (value.trim() === '') {
            fetchProducts();
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

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
                        onChange={handleSearchInputChange}
                    />
                    <button type="button" id="custom-search-button" onClick={filterProducts}>
                        Search
                    </button>
                </div>
                <div className="product-grid">
                    {products.map((product) => (
                        <div className="grid-item" key={product.id}>
                            <Link
                                to={{
                                    pathname: `/product/${product.id}`,
                                    state: product,
                                }}
                            >
                                <img src={product.imageUrl} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>Price: ${product.price}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Shop;
