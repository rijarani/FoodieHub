import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

function Restaurants() {
  const [restaurants, setRestaurants] =
    useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await api.get(
        "/restaurants"
      );

      setRestaurants(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openRestaurantMenu = (id) => {
    navigate(`/menu/${id}`);
  };

  return (
    <div className="p-10">
      <h1 className="text-5xl font-bold mb-10">
        Restaurants 
      </h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            onClick={() =>
              openRestaurantMenu(
                restaurant.id
              )
            }
            className="bg-white p-6 rounded-2xl shadow-xl hover:scale-105 transition cursor-pointer"
          >
            <img
  src={
    restaurant.image ||
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
  }
  alt={restaurant.name}
  className="w-full h-52 object-cover rounded-xl mb-4"
/>
            <h2 className="text-3xl font-bold">
              {restaurant.name}
            </h2>

            <p className="text-gray-500 mt-2">
              {restaurant.location}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Restaurants;