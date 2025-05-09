import React from 'react';

const RoomSB = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-[45vw] max-w-5xl mx-auto">
      {/* Location input - prominent */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input
          type="text"
          name="location"
          placeholder="Enter a destination"
          className="w-full px-4 py-5 border border-gray-300 rounded-xl focus:outline-none "
        />
      </div>

      {/* Row with other inputs */}
      <div className="flex flex-wrap gap-4 items-end justify-start">
        <div className=" w-[140px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-xl"
          />
        </div>

        <div className=" w-[140px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-xl"
          />
        </div>

        <div className="w-[60px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Rooms</label>
          <select className=" px-3 py-2 border border-gray-300 rounded-xl">
            <option>1</option>
            <option>2</option>
            <option>3+</option>
          </select>
        </div>

        <div className=" w-[120px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-xl">
            <option>Any</option>
            <option>Under ₹5000</option>
            <option>₹5000 - ₹10000</option>
            <option>₹10000+</option>
          </select>
        </div>

        <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition">
          Search
        </button>
      </div>
    </div>
  );
};

export default RoomSB;
