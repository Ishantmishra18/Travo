import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { useUser } from '../Context/userContext';
import api from '../utils/api';

const RoomPost = ({ post }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user, setUser } = useUser();

  const userBookmarks = user?.bookmarks;
  const images = [post.cover, ...(post.images || [])];

  useEffect(() => {
    if (userBookmarks?.includes(post._id)) {
      setBookmarked(true);
    }
  }, [post._id, userBookmarks]);

  const handleBookmark = async () => {
    if (!user) return;
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

  const nextSlide = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="w-[80vw] max-w-5xl h-[30vh] bg-white rounded-2xl overflow-hidden shadow-md flex relative">

      {/* Bookmark Icon */}
      {user && (
        <div
          className="absolute h-6 top-6 right-6 aspect-square text-center cursor-pointer z-10"
          onClick={handleBookmark}
        >
          {bookmarked ? (
            <FaBookmark className="h-full w-full text-black" />
          ) : (
            <FaRegBookmark className="h-full w-full text-black" />
          )}
        </div>
      )}

      {/* Image Slider Section */}
      <div className="imgcont relative w-[26vw] h-full overflow-hidden">
        {/* Arrows only if available */}
        {currentIndex > 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full cursor-pointer bg-black bg-opacity-30 text-white flex items-center justify-center hover:bg-opacity-80 transition z-10"
          >
            <FiChevronLeft size={20} />
          </button>
        )}
        {currentIndex < images.length - 1 && (
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full cursor-pointer bg-black bg-opacity-30 text-white flex items-center justify-center hover:bg-opacity-80 transition z-10"
          >
            <FiChevronRight size={20} />
          </button>
        )}

        {/* Slides */}
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 26}vw)`,
            width: `${images.length * 26}vw`,
          }}
        >
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`slide-${idx}`}
              className="w-[26vw] h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Post Content */}
      <div className="w-[60%] p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">{post.title}</h2>
          <p className="text-gray-800">{post.location}</p>
          <p className="text-gray-400">{post.description}</p>
          <div className="user mt-2 flex gap-2 ">
            <h1 className="text-gray-400">by {post.owner?.username || "User"}</h1>
          <img src={post.owner?.cover} alt="" className='h-7 w-7 border-2 border-gray-400 rounded-full object-cover' />
          </div>
          
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
