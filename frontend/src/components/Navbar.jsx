import { Link } from "react-router-dom";

function Navbar() {

  const logout = () => {
    localStorage.removeItem("token");

    alert("Logged out");
  };

  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center shadow-lg">

      <h1 className="text-3xl font-bold text-yellow-400">
        FoodieHub 🍔
      </h1>

      <div className="flex flex-wrap gap-4 text-lg items-center justify-center">

        <Link to="/">
          Home
        </Link>

        <Link to="/restaurants">
          Restaurants
        </Link>

        <Link to="/admin">
  Admin
</Link>

        <Link to="/cart">
          Cart
        </Link>

        <Link to="/orders">
          Orders
        </Link>

        <Link to="/login">
          Login
        </Link>

        <Link to="/register">
          Register
        </Link>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-1 rounded-lg"
        >
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;