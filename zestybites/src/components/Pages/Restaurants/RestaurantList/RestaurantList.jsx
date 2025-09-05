import React, { useState, useEffect } from 'react';
import RestaurantCard from '../RestaurantCard/RestaurantCard';
import './RestaurantList.css';

function RestaurantList() {
    const [restaurants, setRestaurants] = useState([]);

    const restaurantNames = [
        'Vegetarian Fresh Life',
        'Beer Power',
        'Sweet & Chill Café',
        'The Urban Fork',
        'Pizza Galaxy',
        'Royal Biryani House',
    ];

    useEffect(() => {
        
        const fetchedRestaurants = restaurantNames.map((name, index) => ({
            id: index + 1,
            name,
            description:
                'Salads, soups, sneaks, burgers, drinks, seafood, grill, fish, vegetarian menu, wine, hot meals, steaks...',
            type: 'Restaurant',
        }));
        setRestaurants(fetchedRestaurants);

    }, []);

    return (
        <div className="restaurant-list-container">
            <div className="restaurant-cards">
                {restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
            </div>

       
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <a href="/RestaurantDetail" className="load-more-button">
                    Load More
                </a>
            </div>
        </div>
    );
}

export default RestaurantList;
