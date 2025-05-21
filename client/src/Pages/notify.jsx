import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useUser } from '../Context/userContext';
import OfferPost from '../Components/offerPost';
import { Link } from 'react-router-dom';
import Loader from '../Components/loader';

const MyPlacedBids = () => {
  const { user } = useUser();
  const [bidsByMe, setBidsByMe] = useState([]);
  const [bidsOnMe, setBidsOnMe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || !user._id) return; // Safely wait for user to load

    const fetchBids = async () => {
      try {
        const { data } = await api.get('/bid/placed'); // API should return all related bids

        // Separate into two sections based on user ID
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

  if (!user || !user._id  || loading) return <><Loader></Loader></>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="">
      {/* Bids Placed By Me */}
      <h2 className="text-2xl m-2">Bids I Placed</h2>
      {bidsByMe.length === 0 ? (
        <p className="text-gray-500 mx-2 mb-6">You haven't placed any bids.</p>
      ) : (
        <div className="h-auto w-screen items-center md:w-[60vw] flex flex-col mb-8 gap-2">
          {bidsByMe.map((bid) => (
          <OfferPost bid={bid} myPost={false}/>
          ))}
        </div>
      )}

      {/* Bids Received On My Posts */}
      <h2 className="text-2xl m-2">Bids On My Posts</h2>
      {bidsOnMe.length === 0 ? (
        <p className="text-gray-500 mx-2">No bids received on your posts.</p>
      ) : (
        <div className="h-auto w-screen md:w-[60vw] flex flex-col gap-2">
          {bidsOnMe.map((bid) => (
            <OfferPost myPost={true} bid={bid}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPlacedBids;
