import React from "react";
import logo from "../assets/logo.png"; // ✅ Importing logo image
import { Link } from "react-router-dom"; // ✅ Importing Link for navigation

const Navbar = () => {
  return (
    <div className="items-center pl-4 py-3 flex border space-x-8">
      {/* ✅ Logo Section */}
      <img className="w-[50px]" src={logo} alt="Logo" />

      {/* ✅ Navigation Links */}
      <Link to="/" className="text-blue-600 text-4xl font-bold">
        Home
      </Link>

      <Link to="/watchlist" className="text-blue-600 text-4xl font-bold">
        Watchlist
      </Link>
    </div>
  );
};

export default Navbar;
