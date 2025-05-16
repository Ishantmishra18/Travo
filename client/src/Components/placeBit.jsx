import React, { useState } from 'react';
import api from '../utils/api';

const PlaceBit = ({ post, show }) => {
  const [message, setMessage] = useState('');
  const [payment, setPayment] = useState(post.price);

  const priceBlocks = [100, 200, 300].map(offset => ({
    above: post.price + offset,
    below: Math.max(post.price - offset, 0),
  }));

  const handleBit = async () => {
    try {
      await api.post(`/bid/post/${post._id}`, {
        offerAmount: payment,
        message,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-[60vw] mx-auto p-10 rounded-3xl shadow-xl bg-white space-y-8 border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-900">Make a Bid</h2>

      {/* Message Input */}
      <div className="space-y-2">
        <label className="text-sm text-gray-500">Add a Message</label>
        <textarea
          rows={4}
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Your message to the owner..."
          className="w-full p-4 bg-gray-100 rounded-xl text-gray-800 focus:bg-gray-200 focus:outline-none transition"
        />
      </div>

      {/* Payment Slider */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm text-gray-500">
            Your Offer
          </label>
          <span className="text-lg font-semibold text-gray-800">₹{payment}</span>
        </div>
        <input
          type="range"
          min={0}
          max={post.price * 2}
          value={payment}
          onChange={e => setPayment(Number(e.target.value))}
          className="w-full accent-gray-700"
        />
      </div>

      {/* Quick Bids */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {priceBlocks.map((block, index) => (
          <React.Fragment key={index}>
            <button
              type="button"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full py-2 px-4 text-sm font-medium transition"
              onClick={() => setPayment(block.above)}
            >
              + ₹{block.above}
            </button>
            <button
              type="button"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full py-2 px-4 text-sm font-medium transition"
              onClick={() => setPayment(block.below)}
            >
              - ₹{block.below}
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* Submit Button */}
      <div className="pt-6 flex justify-end">
        <button
          onClick={() => {
            handleBit();
            show(false);
          }}
          className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 text-sm font-semibold transition"
        >
          Submit Bid
        </button>
      </div>
    </div>
  );
};

export default PlaceBit;
