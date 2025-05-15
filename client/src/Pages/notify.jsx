import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useUser } from '../Context/userContext';
import { Link } from 'react-router-dom';

const MyPlacedBids = () => {
  const { user } = useUser();
  const [bidsByMe, setBidsByMe] = useState([]);
  const [bidsOnMe, setBidsOnMe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || !user._id) return; // ✅ Safely wait for user to load

    const fetchBids = async () => {
      try {
        const { data } = await api.get('/bid/placed'); // API should return all related bids

        // ✅ Separate into two sections based on user ID
        const byMe = data.filter(bid => bid.bidder?._id === user._id);
        const onMe = data.filter(bid => bid.postOwner?._id === user._id);

        setBidsByMe(byMe);
        setBidsOnMe(onMe);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load bids');
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [user]);

  console.log(bidsByMe, bidsOnMe)

  if (!user || !user._id) return <p className="text-center">Loading user...</p>;
  if (loading) return <p className="text-center text-gray-500">Loading bids...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4">
      {/* Bids Placed By Me */}
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Bids I Placed</h2>
      {bidsByMe.length === 0 ? (
        <p className="text-gray-500 mb-6">You haven't placed any bids.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {bidsByMe.map((bid) => (
            <Link to={bid._id} key={bid._id} className="rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 bg-white p-6">
              <h3 className="text-xl font-bold text-blue-700 mb-2">{bid.postId?.title || 'Post not found'}</h3>
              <div className="text-gray-700 text-base">
                <span className="font-medium">Offer:</span> ₹{bid.latestOfferAmount || 'N/A'} <br />
                <span className="text-sm text-gray-500">{bid.latestMessage}</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">Posted by {bid.postOwner?.username || 'Unknown'}</p>
            </Link>
          ))}
        </div>
      )}

      {/* Bids Received On My Posts */}
      <h2 className="text-2xl font-bold mb-4 text-green-800">Bids On My Posts</h2>
      {bidsOnMe.length === 0 ? (
        <p className="text-gray-500">No bids received on your posts.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bidsOnMe.map((bid) => (
            <Link to={bid._id} key={bid._id} className="rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 bg-white p-6">
              <h3 className="text-xl font-bold text-green-700 mb-2">{bid.postId?.title || 'Post not found'}</h3>
              <div className="text-gray-700 text-base">
                <span className="font-medium">Offer:</span> ₹{bid.latestOfferAmount || 'N/A'} <br />
                <span className="text-sm text-gray-500">{bid.latestMessage}</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">By {bid.bidder?.username || 'Unknown'}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPlacedBids;
