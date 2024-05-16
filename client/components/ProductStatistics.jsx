import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto'; 
import Navbar from './NavBar.jsx';
import '../../server/public/style/productstatistics.scss'

const ProductStatistics = ({ supplierId }) => {
    const [statistics, setStatistics] = useState(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const stats = await getSalesStatistics(supplierId);
                setStatistics(stats);
            } catch (error) {
                console.error('Error fetching sales statistics:', error);
            }
        };

        fetchStatistics();
    }, [supplierId]);

    useEffect(() => {
        if (statistics) {
            
            const ctx = document.getElementById('salesChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: statistics.products.map(product => product.name),
                    datasets: [{
                        label: 'Sales Count',
                        data: statistics.products.map(product => product.salesCount),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, [statistics]);

    return (
        <div>
            <Navbar />
            <div className="content">
            <h2>Sales Statistics</h2>
                {statistics ? (
                    <div>
                        <canvas id="salesChart" width="400" height="200"></canvas>
                    </div>
                ) : (
                    <p>Loading statistics...</p>
                )}
            </div>
        </div>
    );
};

export default ProductStatistics;
