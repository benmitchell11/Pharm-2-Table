import React, { useState } from 'react';
import { database,  storage } from '../../server/firebase'; 
import { ref, push, set } from 'firebase/database';
import { uploadBytes, getDownloadURL, ref as sRef } from 'firebase/storage'; 
import NavBar from './NavBar.jsx';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null); 
    const [imageUrl, setImageUrl] = useState(''); 
    const [error, setError] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

   
    

    const handleSubmit = async (e) => {
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

    return (
        <div>
            <NavBar />
            <div className="content">
                <h2>Add Product</h2>
                {error && <p>Error: {error}</p>}
                <form onSubmit={handleSubmit}>
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
                    <label htmlFor="dprice">Price:</label>
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
            </div>
        </div>
    );
};

export default AddProduct;
