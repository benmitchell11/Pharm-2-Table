import React, { useState } from 'react';
import { ref, get, set } from 'firebase/database';
import { database } from '../../server/firebase';
import { useAuth } from './AuthContext.jsx';
import '../../server/public/style/wishlistbutton.scss';

const WishlistButton = ({ productId }) => {
    const [isInWishlist, setIsInWishlist] = useState(false);
    const { currentUser } = useAuth();
    

    const handleAddToWishlist = async () => {
        if (!currentUser || !currentUser.uid) {
            console.log(productID)
            console.error('User not authenticated');
            return;
        }

        const wishlistRef = ref(database, `wishlists/${currentUser.uid}/items`);
        const wishlistSnapshot = await get(wishlistRef);

        if (wishlistSnapshot.exists()) {
            const existingItem = Object.values(wishlistSnapshot.val()).find(item => item.productId === productId);
            if (existingItem) {
                console.log('Item already in wishlist');
                return; // Exit function if item is already in wishlist
            }
        }

        try {
            // Ensure productId is defined before setting the database value
            if (productId) {
                await set(ref(wishlistRef, productId), {
                    productId: productId,
                    // Add other item details as needed
                });
                console.log('Item added to wishlist:', productId);
            } else {
                console.error('productId is undefined');
            }
        } catch (error) {
            console.error('Error adding item to wishlist:', error);
        }
    };

    return (
        <button onClick={handleAddToWishlist} className={isInWishlist ? 'wishlist-filled' : 'wishlist-outline'}>
            {isInWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
        </button>
    );
};

export default WishlistButton;
