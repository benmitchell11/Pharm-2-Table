import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { useAuth } from './AuthContext.jsx';
import { database } from '../../server/firebase';
import { useNavigate } from 'react-router-dom';
import '../../server/public/style/wishlistmenu.scss';

const WishlistMenu = ({ onClose }) => {
    const { currentUser } = useAuth();
    const [wishlistItems, setWishlistItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWishlistItems = async () => {
            if (currentUser) {
                try {
                    const wishlistRef = ref(database, `wishlists/${currentUser.uid}/items`);
                    const wishlistSnapshot = await get(wishlistRef);

                    if (wishlistSnapshot.exists()) {
                        const wishlistData = wishlistSnapshot.val();
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

    const handleViewWishlist = () => {
        navigate(`/wishlist/${currentUser.uid}`);
    };

    return (
        <div className="wishlist-content">
            <h3>Wishlist</h3>
            {wishlistItems.length > 0 ? (
                <ul>
                    {wishlistItems.map((item, index) => (
                        <li key={index}>{item.name}</li>
                    ))}
                </ul>
            ) : (
                <p>Your wishlist is empty.</p>
            )}
            <button className="view-wishlist-button" onClick={handleViewWishlist} >
                View Full Wishlist
            </button>
        </div>
    );
};

export default WishlistMenu;
