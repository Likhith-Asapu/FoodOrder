import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import React from 'react'
import UsersList from "./components/users/UsersList";
import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import Login from "./components/users/Login";
import VendorNavbar from "./components/templates/VendorNavbar";
import Profile from "./components/vendor/Profile";
import Menu from "./components/vendor/Menu";
import BuyerProfile from "./components/buyer/Profile";
import BuyerOrder from "./components/buyer/Order";
import BuyerNavbar from "./components/templates/BuyerNavbar";
import VendorOrders from "./components/vendor/VendorOrders";
import Cart from "./components/buyer/Cart";
import Stats from "./components/vendor/Stats";
const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

const VendorLayout = () => {
  return (
    <div>
      <VendorNavbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

const BuyerLayout = () => {
  return (
    <div>
      <BuyerNavbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="users" element={<UsersList />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/vendor" element={<VendorLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="stats" element={<Stats />} />
          <Route path="menu" element={<Menu />} />
          <Route path="orders" element={<VendorOrders />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/buyer" element={<BuyerLayout />}>
          <Route path="profile" element={<BuyerProfile />} />
          <Route path="orders" element={<BuyerOrder />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
