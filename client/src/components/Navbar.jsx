import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import logo from "../assets/atri_logo_landscape.png";

const Navbar = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logoutHandler = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <nav className="bg-stone-100/80 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-amber-200/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="Atri Logo" className="h-10 w-auto" />
          </Link>

          {/* Hamburger Menu Button (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>

          {/* Desktop Menu Links */}
          <div className="hidden md:flex items-center space-x-8 text-stone-700 font-semibold">
            {userInfo ? (
              <>
                <Link
                  to="/dashboard"
                  className="bg-amber-100 text-amber-800 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-amber-200 transition-colors shadow-sm"
                >
                  Dashboard
                </Link>
                {userInfo.role === "student" && (
                  <>
                    <Link
                      to="/my-submissions"
                      className="hover:text-amber-600 transition-colors"
                    >
                      My Submissions
                    </Link>
                    <Link
                      to="/calendar"
                      className="hover:text-amber-600 transition-colors"
                    >
                      Calendar
                    </Link>
                  </>
                )}
                <span>Hi, {userInfo.name}</span>
                <button
                  onClick={logoutHandler}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-amber-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 border-t border-stone-200">
          {userInfo ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-stone-700 font-semibold hover:text-amber-600"
              >
                Dashboard
              </Link>
              {userInfo.role === "student" && (
                <Link
                  to="/my-submissions"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-stone-700 hover:text-amber-600"
                >
                  My Submissions
                </Link>
              )}
              <button
                onClick={logoutHandler}
                className="w-full text-left mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-stone-700 hover:text-amber-600"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block text-center mt-2 bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-lg text-sm font-semibold"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
