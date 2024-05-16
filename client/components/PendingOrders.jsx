import React, { useState, useEffect } from 'react';
import NavBar from './NavBar.jsx';
import '../../server/public/style/pendingorders.scss'

const PendingOrders = () => {
    const [pendingOrders, setPendingOrders] = useState([]);

    useEffect(() => {
        
        fetchPendingOrders();
    }, []);

    const fetchPendingOrders = async () => {
        try {
            
            const response = await fetch('api/pending-orders');
            if (response.ok) {
                const data = await response.json();
                setPendingOrders(data.pendingOrders);
            } else {
                console.error('Failed to fetch pending orders:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching pending orders:', error);
        }
    };

    const handleApproveOrder = async (orderId) => {
        try {
            
            const response = await fetch(`api/orders/${orderId}/approve`, {
                method: 'PUT',
            });
            if (response.ok) {
                
                fetchPendingOrders();
            } else {
                console.error('Failed to approve order:', response.statusText);
            }
        } catch (error) {
            console.error('Error approving order:', error);
        }
    };

    const handleRejectOrder = async (orderId) => {
        try {
            
            const response = await fetch(`api/orders/${orderId}/reject`, {
                method: 'PUT',
            });
            if (response.ok) {
                
                fetchPendingOrders();
            } else {
                console.error('Failed to reject order:', response.statusText);
            }
        } catch (error) {
            console.error('Error rejecting order:', error);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="content">
                <h2>Pending Orders</h2>
                <ul>
                    {pendingOrders.map(order => (
                        <li key={order.id}>
                            Order ID: {order.id}<br />
                            Customer: {order.customerName}<br />
                            Order Date: {order.orderDate}<br />
                            <button onClick={() => handleApproveOrder(order.id)}>Approve</button>
                            <button onClick={() => handleRejectOrder(order.id)}>Reject</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PendingOrders;
