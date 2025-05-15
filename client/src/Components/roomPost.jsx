import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { useUser } from '../Context/userContext';
import api from '../utils/api';

const RoomPost = ({ post }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const { user , setUser } = useUser();

  const userBookmarks = user?.bookmarks;

  useEffect(() => {
    if (userBookmarks?.includes(post._id)) {
      setBookmarked(true);
    }
  }, [post._id, userBookmarks]);

  const handleBookmark = async () => {
    if (!user) return; // Prevent if not logged in
    try {
     if (bookmarked) {
  await api.delete(`/user/bookmark/${post._id}`);
  setUser(prev => ({
    ...prev,
    bookmarks: prev.bookmarks.filter(id => id !== post._id),
  }));
} else {
  await api.post(`/user/bookmark/${post._id}`);
  setUser(prev => ({
    ...prev,
    bookmarks: [...prev.bookmarks, post._id],
  }));
}

      setBookmarked(!bookmarked);
    } catch (error) {
      console.log('Error updating bookmark:', error);
    }
  };

  return (
    <div className="w-[80vw] max-w-5xl h-[30vh] bg-white rounded-2xl overflow-hidden shadow-md flex relative">
      
      {/* Bookmark icon only if user is logged in */}
      {user && (
        <div
          className="absolute h-6 top-6 right-6 aspect-square text-center cursor-pointer"
          onClick={handleBookmark}
        >
          {bookmarked ? (
            <FaBookmark className="h-full w-full text-black" />
          ) : (
            <FaRegBookmark className="h-full w-full text-black" />
          )}
        </div>
      )}

      {/* Image Section */}
      <div className="imgcont relative w-[40%] h-full">
        <div className="absolute w-full top-1/2 -translate-y-1/2 flex justify-between px-4">
          <button className="w-10 h-10 rounded-full bg-black bg-opacity-20 text-white flex items-center justify-center hover:bg-opacity-80 transition cursor-pointer">
            <FiChevronLeft size={20} />
          </button>
          <button className="w-10 h-10 rounded-full bg-black bg-opacity-20 text-white flex items-center justify-center hover:bg-opacity-80 transition cursor-pointer">
            <FiChevronRight size={20} />
          </button>
        </div>
        <img src={post.cover} alt="Room" className="w-full h-full object-cover" />
      </div>

      {/* Content Section */}
      <div className="w-[60%] p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">{post.title}</h2>
          <p className="text-gray-800">Goa, India · 2 Guests · 1 Room</p>
          <p className="text-gray-400">{post.description}</p>
          <h1 className="text-gray-400">by {post.owner.username}</h1>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-lg text-black">₹{post.price} / night</p>
          <Link
            to={`/listing/${post._id}`}
            className="bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-900 transition"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomPost;
