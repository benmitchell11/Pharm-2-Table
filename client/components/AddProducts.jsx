import React, { useState, useEffect } from 'react';
import { database, storage } from '../../server/firebase';
import { ref, push, set, get, update } from 'firebase/database';
import { uploadBytes, getDownloadURL, ref as sRef } from 'firebase/storage';
import { useAuth } from './AuthContext.jsx';
import NavBar from './NavBar.jsx';
import { Link } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState(null);
    const [existingProducts, setExistingProducts] = useState([]);
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedQuantities, setSelectedQuantities] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (currentUser) {
                    const userRef = ref(database, 'users/' + currentUser.uid);
                    const userDataSnapshot = await get(userRef);

                    if (userDataSnapshot.exists()) {
                        setUserData(userDataSnapshot.val());
                    } else {
                        console.log('User data not found');
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
        fetchExistingProducts();
    }, [currentUser]);

    const fetchExistingProducts = async () => {
        try {
            const productsRef = ref(database, 'products');
            const productsSnapshot = await get(productsRef);
            if (productsSnapshot.exists()) {
                const products = productsSnapshot.val();
                const productsList = Object.keys(products).map((key) => ({
                    id: key,
                    ...products[key],
                }));
                setExistingProducts(productsList);
            } else {
                console.log('No products found');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error.message);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();

        if (!image) {
            setError('Please select an image to upload.');
            return;
        }

        try {
            const storageRef = sRef(storage, `products/${image.name}`);
            await uploadBytes(storageRef, image);
            const url = await getDownloadURL(storageRef);
            setImageUrl(url);

            const productsRef = ref(database, 'products');
            const newProductRef = push(productsRef);
            const productData = {
                name,
                description,
                price,
                quantity,
                category,
                imageUrl: url,
            };
            await set(newProductRef, productData);

            // Reset form fields and error state
            setName('');
            setDescription('');
            setPrice('');
            setQuantity('');
            setCategory('');
            setImage(null);
            setImageUrl('');
            setError(null);
        } catch (error) {
            console.error('Error adding product:', error);
            setError('Error adding product');
        }
    };

    const handleAddExistingProduct = async (productId) => {
        const quantity = selectedQuantities[productId] || 0;

        try {
            const productRef = ref(database, `products/${productId}`);
            const productSnapshot = await get(productRef);

            if (productSnapshot.exists()) {
                const existingProduct = productSnapshot.val();
                const updatedQuantity = parseInt(existingProduct.quantity) + parseInt(quantity);
                await update(productRef, { quantity: updatedQuantity });
                console.log('Product quantity updated successfully.');
            } else {
                console.error('Product not found.');
                setError('Product not found');
            }
        } catch (error) {
            console.error('Error updating product quantity:', error);
            setError('Error updating product quantity');
        }
    };

    const handleQuantityChange = (productId, quantity) => {
        setSelectedQuantities((prev) => ({ ...prev, [productId]: quantity }));
    };

    return (
        <div>
            <NavBar />
            <div className="content">
                <h2>Add Product</h2>
                {error && <p>Error: {error}</p>}
                <form onSubmit={handleAddProduct}>
                    {/* Form inputs */}
                    <label htmlFor="name">Product Name:</label>
                    <input
                        type="text"
                        id="productName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="description">Description:</label>
                    <input
                        type="textarea"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <button type="submit">Add Product</button>
                </form>
                <h2>Add Existing Product</h2>
                {existingProducts.map((product) => (
                    <div key={product.id}>
                        <Link to={`/product/${product.id}`}>
                            <h3>{product.name}</h3>
                        </Link>
                        <input
                            type="number"
                            placeholder="Enter quantity"
                            onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                        />
                        <button onClick={() => handleAddExistingProduct(product.id)}>
                            Add Product
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddProduct;
