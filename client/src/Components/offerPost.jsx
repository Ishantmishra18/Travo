import React from 'react';
import { Link } from 'react-router-dom';


const OfferPost = ({ post }) => {
  if (!post) {
    console.log("OfferPost received undefined post");
    return <p>Post not found</p>;
  }

  console.log("OfferPost received:", post);
  
  if (!post.bids || post.bids.length === 0) {
    return <p className="text-gray-500">No bids for this post.</p>;
  }

  return (
    <div className='flex flex-col items-start gap-4 p-4 bg-gray-100 rounded-md shadow-md'>
      <h2 className="text-lg font-semibold mb-2">Bids for: {post.title}</h2>
      <Link to={`/listing/${post._id}`} className='px-3 py-1 rounded-xl border-2'>view post</Link>
      {post.bids.map((val, key) => (
        <div
          key={key}
          className=" p-3 rounded-md shadow-sm bg-gray-50 flex flex-col w-[80vw] items-start"
        >
          <p className="text-md"><span className="font-medium">Message:</span> {val.message}</p>
          <p className="text-md"><span className="font-medium">Amount:</span> ₹{val.amount}</p>
          {val.bidder && (
            <p className="text-sm text-gray-600">Bidded by : {val.bidder}</p>
            
          )}
          <div className="respond flex gap-3 mt-10">
            <div className="Accept px-3 py-2 bg-black text-white rounded-xl">Accept</div>
            <div className="px-3 py-2 bg-black text-white rounded-xl">Reject</div>
            <div className="px-3 py-2 bg-black text-white rounded-xl">Counter Offer</div>
          </div>
        </div>
      ))}
    </div>
  );
};


export default OfferPost;
