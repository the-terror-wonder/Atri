import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";

const Header = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Atri 🌿
        </Link>
        <nav>
          {userInfo && userInfo.role === "student" && (
            <Link to="/my-submissions" className="font-semibold">
              My Submissions
            </Link>
          )}
          <Link to="/dashboard" className="font-semibold">
            Dashboard
          </Link>
          {userInfo ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="font-semibold">
                Dashboard
              </Link>
              <span className="font-semibold">Welcome, {userInfo.name}</span>
              <button
                onClick={logoutHandler}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="hover:text-gray-300">
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
