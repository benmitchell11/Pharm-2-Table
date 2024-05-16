// Flyout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import "../../server/public/style/cartmenu.scss"

const CartMenu = ({ userData, onClose }) => {
    const navigate = useNavigate();

    return (
        <div className="wishlist-content">
            <p>Cart</p>
            <button className="close-button" onClick={onClose}>Close</button>
        </div>
    );
};

export default CartMenu;
