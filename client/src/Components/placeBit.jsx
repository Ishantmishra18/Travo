import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const PlaceBit = ({ post, show }) => {
  const [message, setMessage] = useState('');
  const [payment, setPayment] = useState(post.price);
  const [bidId, setBidId] = useState('');
  const [bidStatus, setBidStatus] = useState(''); // 'exists' or 'placed'
  const navigate = useNavigate();

  const priceBlocks = [100, 200, 300].map(offset => ({
    above: post.price + offset,
    below: Math.max(post.price - offset, 0),
  }));

  const handleBit = async () => {
    try {
      const response = await api.post(`/bid/post/${post._id}`, {
        offerAmount: payment,
        message,
      });

      if (response.status === 200 && response.data?.bidId) {
        setBidId(response.data.bidId);
        setBidStatus('exists');
      } else if (response.status === 201 && response.data?.bidId) {
        setBidId(response.data.bidId);
        setBidStatus('placed');
      }
      else if(response.status === 401){
        console.log(response.data.message)
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (bidStatus) {
    return (
      <div className="w-[40vw] mx-auto p-10 rounded-3xl shadow-xl bg-white space-y-6 border border-gray-100 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          {bidStatus === 'exists' ? 'You’ve already placed a bid on same post before' : 'Your bid has been placed'}
        </h2>
        <p className="text-gray-600">
          {bidStatus === 'exists'
            ? 'You can continue the conversation in chat.'
            : 'You can follow up with the owner in the chatroom.'}
        </p>
        <button
          onClick={() => {
            show(false); // hide modal if any
            navigate(`/chat/${bidId}`);
          }}
          className="mt-4 bg-black text-white cursor-pointer px-6 py-3 rounded-full font-semibold transition"
        >
          Go to Chat
        </button>
      </div>
    );
  }

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
          <label className="text-sm text-gray-500">Your Offer</label>
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
          onClick={handleBit}
          className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 text-sm font-semibold transition"
        >
          Submit Bid
        </button>
      </div>
    </div>
  );
};

export default PlaceBit;
