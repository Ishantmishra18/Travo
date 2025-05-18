import React from 'react';
import { Link } from 'react-router-dom';

const OfferPost = ({ bid, myPost }) => {
  const actualPrice = bid.postId.price;
  const offeredPrice = bid.latestOfferAmount;
  const priceDifference = offeredPrice - actualPrice;

  const differenceColor =
    priceDifference > 0 ? 'text-green-600' : priceDifference < 0 ? 'text-red-600' : 'text-gray-700';

  return (
    <Link
      to={bid._id}
      className="w-full flex flex-col md:flex-row h-auto md:h-[30vh] overflow-hidden rounded-2xl gap-6 bg-white shadow-lg hover:shadow-2xl transition duration-300 p-4"
    >
      {/* Cover Image */}
      <img
        src={bid.postId.cover}
        alt="Post Cover"
        className="w-full md:w-[40%] h-[200px] md:h-full object-cover rounded-xl"
      />

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 gap-2 relative">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            <span className="text-sm font-normal text-gray-500">on </span>{bid.postId.title}
          </h2>

          <p className="text-gray-600 bg-gray-100 px-4 py-2 rounded-full mt-2 text-sm max-w-full truncate">
            {bid.latestMessage}
          </p>
        </div>

        {/* Prices */}
        <div className="flex gap-4 mt-2">
          <div className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
            Offered: ₹{offeredPrice}
          </div>
          <div className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            Actual: ₹{actualPrice}
          </div>
          <div className={`text-sm bg-gray-100 px-3 py-1 rounded-full ${differenceColor}`}>
            {priceDifference > 0 ? '+' : ''}{priceDifference}
          </div>
        </div>

        {/* Bidder Info */}
        <div className="flex items-center justify-between mt-4">
          <h2 className="text-sm text-gray-700">
            {myPost? 'by' : 'to'} <span className="font-medium">{myPost ? bid.bidder.username : bid.postOwner.username}</span>
          </h2>
          {/* Bidder Cover Photo */}
          <img
            src={myPost ? bid?.bidder.cover : bid?.postOwner.cover}
            alt={myPost?"Bidder":"postOwner"}
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
          />
        </div>
      </div>
    </Link>
  );
};

export default OfferPost;
