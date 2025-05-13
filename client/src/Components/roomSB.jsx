import React from 'react';

const RoomSB = () => {
  return (
    <div className="bg-white/95 backdrop-blur-2xl rounded-b-2xl shadow-md p-4 px-8 w-full max-w-full mx-auto sticky top-[10vh] z-50">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Location */}
        <div className="flex-1 min-w-[180px]">
          <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter destination"
            className="w-full px-3 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none"
          />
        </div>

        {/* Check-in */}
        <div className="min-w-[140px]">
          <label className="block text-xs font-medium text-gray-700 mb-1">Check-in</label>
          <input
            type="date"
            className="w-full px-3 py-3 border border-gray-300 rounded-xl text-sm"
          />
        </div>

        {/* Check-out */}
        <div className="min-w-[140px]">
          <label className="block text-xs font-medium text-gray-700 mb-1">Check-out</label>
          <input
            type="date"
            className="w-full px-3 py-3 border border-gray-300 rounded-xl text-sm"
          />
        </div>

        {/* Rooms */}
        <div className="min-w-[100px]">
          <label className="block text-xs font-medium text-gray-700 mb-1">Rooms</label>
          <select className="w-full px-3 py-3 border border-gray-300 rounded-xl text-sm">
            <option>1</option>
            <option>2</option>
            <option>3+</option>
          </select>
        </div>

        {/* Budget */}
        <div className="min-w-[140px]">
          <label className="block text-xs font-medium text-gray-700 mb-1">Budget</label>
          <select className="w-full px-3 py-3 border border-gray-300 rounded-xl text-sm">
            <option>Any</option>
            <option>Under ₹5000</option>
            <option>₹5000 - ₹10000</option>
            <option>₹10000+</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="min-w-[120px] self-end">
          <button className="w-full bg-black text-white px-4 py-3 rounded-xl hover:bg-gray-900 transition text-sm">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomSB;
