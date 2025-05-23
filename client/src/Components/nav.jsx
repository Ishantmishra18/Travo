import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../Context/userContext';
import { FiLogIn, FiUserPlus, FiMail } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

const NavBar = () => {
  const { user } = useUser();

  return (
    <nav className="bg-white shadow-md h-[10vh] px-6 py-3 flex justify-between items-center sticky top-0 z-40">
      {/* Brand */}
      <Link to="/" className="text-2xl font-extrabold text-black">
        Travo
      </Link>

      {/* Navigation Options */}
      <div className="space-x-4 flex items-center text-sm ">
        {!user ? (
          <>
            <Link
              to="/login"
              className="flex items-center gap-1 text-gray-700 hover:text-black transition"
            >
              <FiLogIn size={18} />
              Login
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-1 text-gray-700 hover:text-black transition"
            >
              <FiUserPlus size={18} />
              Register
            </Link>
          </>
        ) : (
          <>
            <p className="text-gray-700 font-medium hidden sm:block">
              Welcome, <span className="font-semibold text-black">{user.username}</span>
            </p>

            <Link
              to="/chat"
              className="relative flex items-center gap-1 px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition"
            >
              <FiMail size={18} />
              <span>Inbox</span>
              <div className="absolute -top-2 -left-2 bg-red-600 text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                3
              </div>
            </Link>

            <Link
              to="/profile"
              className="h-10 w-10 rounded-full overflow-hidden border-2 border-gray-300"
            >
              {user.cover ? (
                <img
                  src={user.cover}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-200">
                  <FaUserCircle size={28} className="text-gray-500" />
                </div>
              )}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
