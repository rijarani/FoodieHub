import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-100 to-yellow-100 flex flex-col justify-center items-center text-center p-10">

      <h1 className="text-7xl font-extrabold text-black mb-6">
        FoodieHub 🍔
      </h1>

      <p className="text-2xl text-gray-700 mb-8 max-w-2xl">
        Discover amazing restaurants,
        delicious meals, and order food
        instantly from your favorite places.
      </p>

      <Link
        to="/restaurants"
        className="bg-black text-white px-8 py-4 rounded-xl text-xl hover:bg-gray-800 transition"
      >
        Explore Restaurants
      </Link>

      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
        alt="Food"
        className="w-[800px] rounded-3xl shadow-2xl mt-10"
      />
    </div>
  );
}

export default Home;