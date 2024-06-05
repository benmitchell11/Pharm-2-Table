import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../server/public/style/navbar.scss';
import { useAuth } from './AuthContext.jsx';
import { ref, get } from 'firebase/database';
import { database } from '../../server/firebase'; 
import { signOut } from 'firebase/auth';
import { auth } from '../../server/firebase';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import UserMenu from './UserMenu.jsx';
import WishlistMenu from './WishlistMenu.jsx';
import '../../server/public/style/usermenu.scss';
import '../../server/public/style/wishlistmenu.scss';
import '../../server/public/style/suppliermenu.scss';
import CartMenu from './CartMenu.jsx';
import SupplierMenu from './SupplierMenu.jsx';
import AdminMenu from './AdminMenu.jsx';

const Navbar = () => {
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [flyoutVisible, setFlyoutVisible] = useState(null);
    const [pendingApplications, setPendingApplications] = useState(0);
    const [pendingPrescriptions, setPendingPrescriptions] = useState(0);
    const [pendingSupplierApplications, setPendingSupplierApplications] = useState(0);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    const totalAdminPendingCount = pendingApplications + pendingSupplierApplications;
    const adminBubbleContent = totalAdminPendingCount > 9 ? '9+' : totalAdminPendingCount.toString();

    const handleUsermenuToggle = () => {
        setFlyoutVisible(flyoutVisible === 'usermenu' ? null : 'usermenu');
        console.log(userData)
    };

    const handleWishlistMenuToggle = () => {
        setFlyoutVisible(flyoutVisible === 'wishlist' ? null : 'wishlist');
    };

    const handleCartMenuToggle = () => {
        setFlyoutVisible(flyoutVisible === 'cart' ? null : 'cart');
    };

    const handleSupplierMenuToggle = () => {
        setFlyoutVisible(flyoutVisible === 'supplier' ? null : 'supplier');
    };

    const handleAdminMenuToggle = () => {
        setFlyoutVisible(flyoutVisible === 'admin' ? null : 'admin');
    };

    useEffect(() => {
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

        if (currentUser) {
            fetchUserData();
            fetchWishlistItems();
            fetchCartItems();
        }
    }, [currentUser]);

    useEffect(() => {
        const fetchPendingApplications = async () => {
            try {
                const applicationsRef = ref(database, 'applications');
                const snapshot = await get(applicationsRef);
                if (snapshot.exists()) {
                    const applications = snapshot.val();
                    const pendingCount = Object.values(applications).filter(app => app.status === 'Pending').length;
                    setPendingApplications(pendingCount);
                }
            } catch (error) {
                console.error('Error fetching pending applications:', error);
            }
        };

        const fetchPendingPrescriptions = async () => {
            try {
                const prescriptionsRef = ref(database, 'prescriptions');
                const snapshot = await get(prescriptionsRef);
                if (snapshot.exists()) {
                    const prescriptions = snapshot.val();
                    const pendingCount = Object.values(prescriptions).filter(app => app.status === 'Pending').length;
                    setPendingPrescriptions(pendingCount);
                }
            } catch (error) {
                console.error('Error fetching pending prescriptions:', error)
            }
        }

        const fetchPendingSupplierApplications = async () => {
            try {
                const supplierApplicationsRef = ref(database, 'supplierApplications');
                const snapshot = await get(supplierApplicationsRef);
                if (snapshot.exists()) {
                    const supplierApplications = snapshot.val();
                    const pendingCount = Object.values(supplierApplications).filter(app => app.status === 'Pending').length;
                    setPendingSupplierApplications(pendingCount)
                }
            } catch (error) {
                console.error('Error fetching pending supplier applications', error)
            }
        }

        fetchPendingApplications(), fetchPendingPrescriptions(), fetchPendingSupplierApplications();
    }, []);

    return (
        <nav id="navbar">
            <div id="logo-container">
                <img src="img/logo.png" className="logo" id="logo" alt="Logo" />
            </div>
            <div id="links-container">
                <Link to="/" className="link">Home</Link>
                <Link to="/prescriptions" className="link">Prescriptions</Link>
                <Link to="/shop" className="link">Shop</Link>
                <Link to="/contact" className="link">Contact</Link>
                <Link to="/about" className="link">About</Link>
            </div>
            <div id="buttons-container">
                <div className="flyout-container">
                    <button
                        type="button"
                        className="menu-button"
                        onClick={handleUsermenuToggle}
                    >
                        <img src="img/user.png" className="icon" alt="User Icon" />
                        <span className="button-title">Profile</span>
                    </button>
                    {flyoutVisible === 'usermenu' && (
                        <UserMenu
                            userData={userData}
                            onClose={() => setFlyoutVisible(null)}
                        />
                    )}
                </div>
                <div className="flyout-container">
                    <button
                        type="button"
                        className="menu-button"
                        onClick={handleWishlistMenuToggle}
                    >
                        <img src="img/wishlist.png" className="icon" alt="User Icon" />
                        <span className="button-title">Wishlist</span>
                        {wishlistItems.length > 0 && (
                            <div className="notification-bubble">{wishlistItems.length > 9 ? '9+' : wishlistItems.length}</div>
                        )}
                    </button>
                    {flyoutVisible === 'wishlist' && (
                        <WishlistMenu
                            userData={userData}
                            onClose={() => setFlyoutVisible(null)}
                        />
                    )}
                </div>
                <div className="flyout-container">
                    <button
                        type="button"
                        className="menu-button"
                        onClick={handleCartMenuToggle}
                    >
                        <img src="img/cart.png" className="icon" alt="Cart Icon" />
                        <span className="button-title">Cart</span>
                        {cartItems.length > 0 && (
                            <div className="notification-bubble">{cartItems.length > 9 ? '9+' : cartItems.length}</div>
                        )}
                    </button>
                    {flyoutVisible === 'cart' && (
                        <CartMenu
                            userData={userData}
                            onClose={() => setFlyoutVisible(null)}
                        />
                    )}
                </div>
                {currentUser && (
                    <div className="flyout-container">
                        {userData && (userData.isAdmin || userData.isSupplier) && (
                            <button
                                type="button"
                                className="menu-button"
                                onClick={handleSupplierMenuToggle}
                            >
                                <img src="img/supplier.png" className="icon" alt="Supplier Icon" />
                                <span className="button-title">Supplier</span>
                                {pendingPrescriptions > 0 && (
                                <div className="notification-bubble">{pendingPrescriptions}</div>
                            )}
                            </button>
                        )}
                        {flyoutVisible === 'supplier' && (
                            <SupplierMenu
                                userData={userData}
                                onClose={() => setFlyoutVisible(null)}
                            />
                        )}
                    </div>
                )}
                {currentUser && userData && userData.isAdmin && (
                    <div className="flyout-container">
                        <button
                            type="button"
                            className="menu-button"
                            onClick={handleAdminMenuToggle}
                        >
                            <img src="img/admin.png" className="icon" alt="Admin Icon" />
                            <span className="button-title">Admin</span>
                            {(pendingApplications > 0 || pendingSupplierApplications > 0) && (
                                <div className="notification-bubble">{adminBubbleContent}</div>
                            )}
                        </button>
                        {flyoutVisible === 'admin' && (
                            <AdminMenu
                                userData={userData}
                                onClose={() => setFlyoutVisible(null)}
                            />
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
