import React, { useEffect, useState } from 'react';
import { ref, get, remove } from 'firebase/database';
import { useAuth } from './AuthContext.jsx';
import { database } from '../../server/firebase';
import NavBar from './NavBar.jsx'

const Wishlist = () => {
    const { currentUser } = useAuth();
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const fetchWishlistItems = async () => {
            if (currentUser) {
                try {
                    const wishlistRef = ref(database, `wishlists/${currentUser.uid}/items`);
                    const wishlistSnapshot = await get(wishlistRef);
                    
                    if (wishlistSnapshot.exists()) {
                        const wishlistData = wishlistSnapshot.val();
                        console.log('Wishlist Items:', wishlistData);
                        setWishlistItems(Object.values(wishlistData));
                    } else {
                        setWishlistItems([]);
                    }
                } catch (error) {
                    console.error('Error fetching wishlist items:', error);
                }
            }
        };

        fetchWishlistItems();
    }, [currentUser]);

    const handleDeleteFromWishlist = async (itemId) => {
        try {
            const itemRef = ref(database, `wishlists/${currentUser.uid}/items/${itemId}`);
            await remove(itemRef);
            setWishlistItems(prevItems => prevItems.filter(item => item.id !== itemId));
        } catch (error) {
            console.error('Error deleting item from wishlist:', error);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="content">
            <h2>Wishlist</h2>
                {wishlistItems.length > 0 ? (
                    <ul>
                    {wishlistItems.map((item, index) => (
                        <li key={index}>
                            {item.name}
                            <button onClick={() => handleDeleteFromWishlist(item.id)}>Delete from Wishlist</button>
                        </li>
                    ))}
                </ul>
                ) : (
                    <p>Your wishlist is empty.</p>
                )}
                <button>Clear Wishlist</button>
            </div>
        </div>
    );
};

export default Wishlist;
