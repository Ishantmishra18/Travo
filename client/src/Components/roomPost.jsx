import React from 'react';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from 'react-router-dom';

const RoomPost = () => {
  return (
    <div className="w-[80vw] max-w-5xl h-[30vh] bg-white rounded-2xl overflow-hidden shadow-md flex">
      {/* Image */}
      <div className="imgcont relative w-[40%] h-full">
        <div className="absolute w-full top-1/2 -translate-y-1/2 flex justify-between px-4">
        <button className="w-10 h-10 rounded-full bg-black bg-opacity-20 text-white flex items-center justify-center hover:bg-opacity-80 transition cursor-pointer">
            <FiChevronLeft size={20} />
          </button>
          <button className="w-10 h-10 rounded-full bg-black bg-opacity-20 text-white flex items-center justify-center hover:bg-opacity-80 transition cursor-pointer">
            <FiChevronRight size={20} />
          </button>
        </div>
      <img
        src="https://cdn.create.vista.com/api/media/medium/214626304/stock-photo-streaming?token="
        alt="Room"
        className="w-full h-full object-cover"
      />
      </div>
      

      {/* Content */}
      <div className="w-[60%] p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Modern Beachside Retreat</h2>
          <p className="text-gray-500">Goa, India · 2 Guests · 1 Room</p>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-lg text-black">₹5,200 / night</p>
          <Link to='/post' className="bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-900 transition">
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomPost;
