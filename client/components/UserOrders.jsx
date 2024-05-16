import React, { useState, useEffect } from 'react';
import { database } from '../../server/firebase'; 
import { ref, get } from 'firebase/database';
import Navbar from './NavBar.jsx';
import '../../server/public/style/userorders.scss';

const UserOrders = ({ userId }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersRef = ref(database, 'orders');
                const ordersSnapshot = await get(ordersRef);

                if (ordersSnapshot.exists()) {
                    
                    const userOrders = Object.values(ordersSnapshot.val()).filter(order => order.userId === userId);
                    setOrders(userOrders);
                } else {
                    console.log('No orders found');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

    return (
        <div>
            <Navbar />
            <div className="content">
                {loading && <p>Loading orders...</p>}
                {error && <p>Error fetching orders: {error}</p>}
                {orders.length === 0 && !loading && <p>No orders found.</p>}
                {orders.length > 0 && (
                    <ul>
                        {orders.map(order => (
                            <li key={order.id}>
                                <p>Order ID: {order.id}</p>
                                <p>Order Date: {order.date}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default UserOrders;
