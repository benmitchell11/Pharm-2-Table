import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { useAuth } from './AuthContext.jsx';
import { database } from '../../server/firebase';
import { useNavigate } from 'react-router-dom';
import '../../server/public/style/cartmenu.scss';

const CartMenu = ({ onClose }) => {
    const { currentUser } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            if (currentUser) {
                try {
                    const cartRef = ref(database, `carts/${currentUser.uid}/items`);
                    const cartSnapshot = await get(cartRef);

                    if (cartSnapshot.exists()) {
                        const cartData = cartSnapshot.val();
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

    const handleViewCart = () => {
        navigate(`/cart/${currentUser.uid}`);
    };

    return (
        <div className="cart-content">
            <p className="cart-title">Cart</p>
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>{item.name}</li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}
            <button className="view-cart-button" onClick={handleViewCart} >
                View Cart
            </button>
        </div>
    );
};

export default CartMenu;
