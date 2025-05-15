import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { useUser } from '../Context/userContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Profile</h2>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-xl transition"
          >
            Logout
          </button>

          <Link
            to="list"
            className="block w-full border border-black text-black py-2.5 rounded-xl hover:bg-black hover:text-white transition"
          >
            Add Your Listing
          </Link>

          <Link
            to="bookmark"
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-xl transition"
          >
            My Bookmarks
          </Link>

          <Link
            to="edit"
            className="block w-full bg-gray-800 hover:bg-gray-900 text-white py-2.5 rounded-xl transition"
          >
            Edit My Profile
          </Link>

          <Link
            to="/"
            className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 rounded-xl transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
