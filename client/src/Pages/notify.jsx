import React from 'react';
import OfferPost from '../Components/offerPost';
import { useUser } from '../Context/userContext';
import { usePost } from '../Context/postContext';

const Notify = () => {
  const { posts } = usePost();
  const { user } = useUser();

  console.log("Logged-in user:", user);

  // Loading check
if (!posts || !user) {
  return <p className="text-center text-gray-500">Loading...</p>;
}

 

  // Filter posts owned by current user that have at least one bid
  const userPostsWithBids = posts.filter(val =>
    (val.owner?._id || val.owner)?.toString() === user._id.toString() &&
    Array.isArray(val.bids) &&
    val.bids.length > 0
  );

  // Debug logs

  console.log("Filtered userPostsWithBids:", userPostsWithBids);

  return (
    <div className='flex flex-col gap-4 p-4'>
      {userPostsWithBids.length === 0 ? (
        <p className="text-center text-gray-500">No new bid notifications</p>
      ) : (
        userPostsWithBids.map((p) => (
          <div key={p._id} className="pb-4">
            <OfferPost post={p} />
          </div>
        ))
      )}
    </div>
  );
};

export default Notify;
