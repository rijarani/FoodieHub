import Restaurants from "./pages/Restaurants";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";
import Menu from "./pages/Menu";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
    
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

<Route
  path="/admin"
  element={<Admin />}
/>
        <Route
          path="/register"
          element={<Register />}
        />

        <Route
  path="/cart"
  element={
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
  }
/>

        <Route
  path="/orders"
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/>
      

<Route
  path="/menu/:id"
  element={<Menu />}
/>
        <Route path="/restaurants"
  element={<Restaurants />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;