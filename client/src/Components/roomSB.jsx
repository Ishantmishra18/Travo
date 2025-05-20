import React from 'react';

const RoomSB = () => {
  return (
    <div className="bg-white/95 backdrop-blur-2xl rounded-none md:rounded-b-2xl shadow-md p-2 sm:p-3 md:p-4 md:px-8 w-full max-w-full mx-auto sticky top-[10vh] hidden md:block z-50">
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-2 sm:gap-4 overflow-x-auto">
        
        {/* Location */}
        <div className="flex-1 min-w-[160px]">
          <label className="block text-[10px] sm:text-xs font-medium text-gray-700 mb-0.5">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter destination"
            className="w-full px-2 py-2 sm:px-3 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none"
          />
        </div>

        {/* Check-in */}
        <div className="min-w-[120px]">
          <label className="block text-[10px] sm:text-xs font-medium text-gray-700 mb-0.5">Check-in</label>
          <input
            type="date"
            className="w-full px-2 py-2 sm:px-3 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-sm"
          />
        </div>

        {/* Check-out */}
        <div className="min-w-[120px]">
          <label className="block text-[10px] sm:text-xs font-medium text-gray-700 mb-0.5">Check-out</label>
          <input
            type="date"
            className="w-full px-2 py-2 sm:px-3 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-sm"
          />
        </div>

        {/* Rooms */}
        <div className="min-w-[100px]">
          <label className="block text-[10px] sm:text-xs font-medium text-gray-700 mb-0.5">Rooms</label>
          <select className="w-full px-2 py-2 sm:px-3 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-sm">
            <option>1</option>
            <option>2</option>
            <option>3+</option>
          </select>
        </div>

        {/* Budget */}
        <div className="min-w-[120px]">
          <label className="block text-[10px] sm:text-xs font-medium text-gray-700 mb-0.5">Budget</label>
          <select className="w-full px-2 py-2 sm:px-3 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-sm">
            <option>Any</option>
            <option>Under ₹5000</option>
            <option>₹5000 - ₹10000</option>
            <option>₹10000+</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="min-w-[100px] self-end sm:self-auto">
          <button className="w-full bg-black text-white px-2 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl hover:bg-gray-900 transition text-xs sm:text-sm">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomSB;
