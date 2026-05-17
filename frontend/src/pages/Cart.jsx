import { useEffect, useState } from "react";

import api from "../services/api";

function Cart() {

  const [cartItems, setCartItems] =
    useState([]);

  const [address, setAddress] =
    useState("");

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {

      const token =
        localStorage.getItem("token");

      const res = await api.get(
        "/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCartItems(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id) => {
    try {

      const token =
        localStorage.getItem("token");

      await api.delete(
        `/cart/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCartItems();

    } catch (error) {
      console.log(error);
    }
  };

  const checkout = async () => {
    try {

      const token =
        localStorage.getItem("token");

      await api.post(
        "/orders/checkout",
        {
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order placed successfully");

      fetchCartItems();

      setAddress("");

    } catch (error) {

      console.log(error);

      alert("Checkout failed");
    }
  };

  return (
    <div className="p-10 min-h-screen bg-gray-100">

      <h1 className="text-5xl font-bold mb-10">
        Cart 🛒
      </h1>

      {cartItems.length === 0 ? (

        <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Your Cart Is Empty
          </h2>

          <p className="text-gray-500">
            Add delicious food items to continue 🍔
          </p>
        </div>

      ) : (

        <>
          <div className="grid md:grid-cols-2 gap-6">

            {cartItems.map((item) => (

              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl shadow-xl"
              >

                <img
                  src={
                    item.menuItem.image ||
                    "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                  }
                  alt={item.menuItem.name}
                  className="w-full h-52 object-cover rounded-xl mb-4"
                />

                <h2 className="text-3xl font-bold">
                  {item.menuItem.name}
                </h2>

                <p className="text-gray-600 mt-2">
                  {item.menuItem.description}
                </p>

                <p className="font-bold mt-3 text-lg">
                  Rs. {item.menuItem.price}
                </p>

                <p className="mt-2">
                  Quantity: {item.quantity}
                </p>

                <button
                  onClick={() =>
                    removeItem(item.id)
                  }
                  className="bg-red-500 text-white px-5 py-2 rounded-lg mt-4"
                >
                  Remove
                </button>

              </div>

            ))}

          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl mt-10">

            <h2 className="text-3xl font-bold mb-6">
              Checkout 📦
            </h2>

            <input
              type="text"
              placeholder="Enter Delivery Address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              className="border p-4 w-full rounded-lg mb-6"
            />

            <button
              onClick={checkout}
              className="bg-black text-white px-8 py-3 rounded-xl text-lg"
            >
              Place Order
            </button>

          </div>
        </>

      )}

    </div>
  );
}

export default Cart;