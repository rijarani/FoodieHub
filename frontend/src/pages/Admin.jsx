import { useState } from "react";

import api from "../services/api";

function Admin() {

  const [restaurantData, setRestaurantData] =
    useState({
      name: "",
      image: "",
      location: "",
    });

  const [menuData, setMenuData] =
    useState({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
      restaurantId: "",
    });

  const handleRestaurantChange = (e) => {
    setRestaurantData({
      ...restaurantData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMenuChange = (e) => {
    setMenuData({
      ...menuData,
      [e.target.name]: e.target.value,
    });
  };

  const addRestaurant = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/restaurants",
        restaurantData
      );

      alert("Restaurant Added");
    } catch (error) {
      console.log(error);
    }
  };

  const addMenuItem = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/menu",
        menuData
      );

      alert("Menu Item Added");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-5xl font-bold mb-10">
        Admin Dashboard 🛠️
      </h1>

      <div className="grid grid-cols-2 gap-10">

        <form
          onSubmit={addRestaurant}
          className="bg-white p-6 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-6">
            Add Restaurant
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Restaurant Name"
            className="border p-3 w-full mb-4"
            onChange={handleRestaurantChange}
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            className="border p-3 w-full mb-4"
            onChange={handleRestaurantChange}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            className="border p-3 w-full mb-4"
            onChange={handleRestaurantChange}
          />

          <button className="bg-black text-white px-6 py-2 rounded-lg">
            Add Restaurant
          </button>
        </form>

        <form
          onSubmit={addMenuItem}
          className="bg-white p-6 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-6">
            Add Menu Item
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Food Name"
            className="border p-3 w-full mb-4"
            onChange={handleMenuChange}
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            className="border p-3 w-full mb-4"
            onChange={handleMenuChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            className="border p-3 w-full mb-4"
            onChange={handleMenuChange}
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            className="border p-3 w-full mb-4"
            onChange={handleMenuChange}
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            className="border p-3 w-full mb-4"
            onChange={handleMenuChange}
          />

          <input
            type="number"
            name="restaurantId"
            placeholder="Restaurant ID"
            className="border p-3 w-full mb-4"
            onChange={handleMenuChange}
          />

          <button className="bg-black text-white px-6 py-2 rounded-lg">
            Add Menu Item
          </button>
        </form>

      </div>
    </div>
  );
}

export default Admin;