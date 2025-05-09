import React, { useState } from 'react';

const PlaceBit = ({ actualPrice = 500 , show}) => {
  const [message, setMessage] = useState('');
  const [payment, setPayment] = useState(actualPrice);

  const priceBlocks = [100, 200, 300].map(offset => ({
    above: actualPrice + offset,
    below: Math.max(actualPrice - offset, 0),
  }));

  return (
    <div className="h-[80vh] w-[60vw] rounded-2xl bg-white p-6 shadow-xl flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-gray-800">Place Your Bit</h2>

      {/* Message Input */}
      <textarea
        className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
        placeholder="Enter your message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
      />

      {/* Range Payment Input */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">Payment: ₹{payment}</label>
        <input
          type="range"
          min={0}
          max={actualPrice * 2}
          value={payment}
          onChange={e => setPayment(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Suggested Price Blocks */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {priceBlocks.map((block, index) => (
          <React.Fragment key={index}>
            <button
              className="bg-green-100 text-green-700 rounded-lg p-2 hover:bg-green-200"
              onClick={() => setPayment(block.above)}
            >
              Above: ₹{block.above}
            </button>
            <button
              className="bg-red-100 text-red-700 rounded-lg p-2 hover:bg-red-200"
              onClick={() => setPayment(block.below)}
            >
              Below: ₹{block.below}
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* Submit Button */}
      <button
        className="mt-auto bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        onClick={() =>  show(false)}
      >
        Place Bit
      </button>
    </div>
  );
};

export default PlaceBit;
