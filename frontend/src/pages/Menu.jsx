import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import api from "../services/api";

function Menu() {

  const [menuItems, setMenuItems] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const { id } = useParams();

  useEffect(() => {
    fetchMenuItems();
  }, [id]);

  const fetchMenuItems = async () => {
    try {

      let url = "/menu";

      if (id) {
        url = `/menu/restaurant/${id}`;
      }

      const res = await api.get(url);

      setMenuItems(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (
    menuItemId
  ) => {
    try {

      const token =
        localStorage.getItem("token");

      await api.post(
        "/cart",
        {
          menuItemId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Added to cart");

    } catch (error) {

      console.log(error);

      alert("Please login first");
    }
  };

  const searchMenu = async (
    value
  ) => {

    setSearch(value);

    try {

      const res = await api.get(
        `/menu?search=${value}`
      );

      setMenuItems(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-5xl font-bold mb-8">
        Menu 🍔
      </h1>

      <input
        type="text"
        placeholder="Search food..."
        value={search}
        onChange={(e) =>
          searchMenu(e.target.value)
        }
        className="border p-3 mb-8 w-full rounded-lg"
      />

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">

        {menuItems.length === 0 ? (

          <p className="text-xl">
            No food items found 🍔
          </p>

        ) : (

          menuItems.map((item) => (

            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl shadow-xl hover:scale-105 transition"
            >

              <img
                src={
                  item.image ||
                  "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                }
                alt={item.name}
                className="w-full h-52 object-cover rounded-xl mb-4"
              />

              <h2 className="text-2xl font-bold">
                {item.name}
              </h2>

              <p className="mt-2">
                {item.description}
              </p>

              <p className="font-bold mt-3">
                Rs. {item.price}
              </p>

              <p className="text-sm text-gray-500">
                {item.category}
              </p>

              <button
                onClick={() =>
                  addToCart(item.id)
                }
                className="bg-black text-white px-4 py-2 mt-4 rounded-lg"
              >
                Add to Cart
              </button>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Menu;