import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; 

const DishDashboard = () => {
    const [dishes, setDishes] = useState([]);

    const fetchDishes = () => {
        axios.get('http://localhost:8080/api/dishes')
            .then(response => {
                setDishes(response.data);
            })
            .catch(error => {
                console.error('Error fetching dishes:', error);
            });
    };

    useEffect(() => {
        fetchDishes();
        const interval = setInterval(fetchDishes, 5000);

        return () => clearInterval(interval);
    }, []);
    const togglePublishedStatus = (dishId) => {
        axios.put(`http://localhost:8080/api/dishes/${dishId}/toggle`)
            .then(response => {
                setDishes(prevDishes => 
                    prevDishes.map(dish => 
                        dish.dishId === dishId ? response.data : dish
                    )
                );
            })
            .catch(error => {
                console.error('Error toggling dish status:', error);
            });
    };

    return (
        <div>
            <div className="dashboard-header">
                <h1>Dish Dashboard</h1>
            </div>
            <ul className="dish-list">
                {dishes.map(dish => (
                    <li key={dish.dishId} className="dish-item">
                        <img src={dish.imageUrl} alt={dish.dishName} />
                        <h2>{dish.dishName}{dish.isPublished}</h2>
                        <button onClick={() => togglePublishedStatus(dish.dishId)}>
                            {!dish.published ? 'Unpublish' : 'Publish'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DishDashboard;
