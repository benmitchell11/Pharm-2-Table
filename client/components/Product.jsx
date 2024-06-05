import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref, get, set, update } from 'firebase/database';
import { database } from '../../server/firebase';
import NavBar from './NavBar.jsx';
import { useAuth } from './AuthContext.jsx'
import WishlistButton from './WishlistButton.jsx';
import '../../server/public/style/product.scss';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const {currentUser} = useAuth()
    const [user, setUser] = useState({ id: currentUser.uid });
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [isInWishlist, setIsInWishlist] = useState(false);

    const raiseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(quantity > 1 ? quantity - 1 : 1); // Prevent quantity from going below 1
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productRef = ref(database, `products/${id}`);
                const productSnapshot = await get(productRef);
                if (productSnapshot.exists()) {
                    setProduct(productSnapshot.val());
                } else {
                    setError('Product not found.');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Error fetching product.');
            }
        };

        const fetchUserData = async () => {
            try {
                
                const userRef = ref(database, 'users/' + currentUser.uid);
                const userDataSnapshot = await get(userRef);

                if (userDataSnapshot.exists()) {
                    setUserData(userDataSnapshot.val());
                } else {
                    console.log('User data not found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        if (currentUser) {
            fetchUserData();
        }

        fetchProduct();
    }, [id], [currentUser]);

    const handleAddToCart = async () => {
        if (!user || !user.id) {
            console.error('User not authenticated');
            return;
        }

        const cartRef = ref(database, `carts/${user.id}/items/${id}`);
        const cartSnapshot = await get(cartRef);

        if (cartSnapshot.exists()) {
            // Update quantity if item already exists in cart
            const currentQuantity = cartSnapshot.val().quantity;
            update(cartRef, { quantity: currentQuantity + quantity });
        } else {
            // Add new item to cart
            set(cartRef, {
                ...product,
                quantity,
                id: id
            });
        }

        console.log('Item added to cart:', product);
    };

    useEffect(() => {
        const wishlistItems = localStorage.getItem('wishlistItems');
        if (wishlistItems) {
            const parsedItems = JSON.parse(wishlistItems);
            setIsInWishlist(parsedItems.includes(id));
        }
    }, [id]);

    const handleAddToWishlist = async () => {
        if (!user || !user.id) {
            console.error('User not authenticated');
            return;
        }

        const wishlistRef = ref(database, `wishlists/${user.id}/items/${id}`);
        const wishlistSnapshot = await get(wishlistRef);

        try {
            if (wishlistSnapshot.exists()) {
                console.log('Item already in wishlist');
                return;
            }

            await set(wishlistRef, {
                ...product,
                id: id
                // Add other item details as needed
            });
            setIsInWishlist(true);
            

            // Update local storage with new wishlist items
            const wishlistItems = localStorage.getItem('wishlistItems');
            let updatedItems = [];
            if (wishlistItems) {
                updatedItems = JSON.parse(wishlistItems);
            }
            updatedItems.push(id);
            localStorage.setItem('wishlistItems', JSON.stringify(updatedItems));

            console.log('Item added to wishlist:', id);
        } catch (error) {
            console.error('Error adding item to wishlist:', error);
        }
    };
    

    return (
        <div>
            <NavBar />
            {product && (
                <div className="content">
                    <h2>{product.name}</h2>
                    <img src={product.imageUrl} alt={product.name} />
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>Category: {product.category}</p>
                    <p>{id}</p>
                    <div className="add-to-cart-container">
                        <div className="quantity-container">
                            <label htmlFor="quantity-input">Quantity</label>
                            <div className="input-group">
                                <input
                                    type="number"
                                    id="quantity-input"
                                    className="quantity-input"
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                                />
                                <div className="buttons-container">
                                    <button className="quantity-button" onClick={raiseQuantity}>+</button>
                                    <button className="quantity-button" onClick={decreaseQuantity}>-</button>
                                </div>
                            </div>
                        </div>
                        <button onClick={handleAddToCart}>Add to Cart</button>
                        <button onClick={handleAddToWishlist}>Add to Wishlist</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Product;
