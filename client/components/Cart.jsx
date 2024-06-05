import React, { useEffect, useState } from 'react';
import { ref, get, remove } from 'firebase/database';
import { useAuth } from './AuthContext.jsx';
import { database } from '../../server/firebase';
import NavBar from './NavBar.jsx';

const Cart = () => {
    const { currentUser } = useAuth();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            if (currentUser) {
                try {
                    const cartRef = ref(database, `carts/${currentUser.uid}/items`);
                    const cartSnapshot = await get(cartRef);

                    if (cartSnapshot.exists()) {
                        const cartData = cartSnapshot.val();
                        console.log('Cart Items:', cartData);
                        setCartItems(Object.values(cartData));
                    } else {
                        setCartItems([]);
                    }
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                }
            }
        };

        fetchCartItems();
    }, [currentUser]);

    const handleDeleteFromCart = async (itemId) => {
        try {
            const itemRef = ref(database, `carts/${currentUser.uid}/items/${itemId}`);
            await remove(itemRef);
            setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
        } catch (error) {
            console.error('Error deleting item from cart:', error);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="content">
                <h2>Cart</h2>
                {cartItems.length > 0 ? (
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                {item.name}
                                <button onClick={() => handleDeleteFromCart(item.id)}>Delete from Cart</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Your cart is empty.</p>
                )}
                <button>Checkout</button>
                <button>Clear Cart</button>
            </div>
        </div>
    );
};

export default Cart;
