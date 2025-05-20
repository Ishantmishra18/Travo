import React, { useState, useEffect } from 'react';
import PlaceBit from '../Components/placeBit';
import { usePost } from '../Context/postContext';
import { useParams , Link} from 'react-router-dom';
import api from '../utils/api';
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";


const RoomDetails = ({ userBookmarks = [] }) => {
  const [showBit, setShowBit] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const { postID } = useParams();
  const { posts } = usePost();
  const post = posts.find(val => val._id === postID);

  useEffect(() => {
    if (userBookmarks.includes(postID)) {
      setBookmarked(true);
    }
  }, [userBookmarks, postID]);

  const handleBookmark = async () => {
    try {
      if (bookmarked) {
        await api.delete(`/user/bookmark/${postID}`);
      } else {
        await api.post(`/user/bookmark/${postID}`);
      }
      setBookmarked(!bookmarked);
    } catch (err) {
      console.error('Bookmark error:', err);
    }
  };

  if (!post) {
    return <div className="text-center text-xl text-red-500 mt-10">Loading post details or post not found.</div>;
  }

  return (
  <div className="mx-4 md:mx-10 lg:mx-20 p-4 md:p-6 relative">

    {/* Sticky Navbar */}
    <div className="sticky top-[10vh] z-50 bg-white/90 backdrop-blur-2xl rounded-xl shadow-md mb-4 px-4 py-3 flex justify-between items-start md:items-center gap-3">
      <div className="flex items-start md:items-center gap-6 flex-row">
        <h2 className='text-xl md:text-2xl'>{post.price}/night</h2>
      </div>

      <div className="flex gap-3 ">
        <button
          onClick={() => setShowBit(true)}
          className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-900 transition"
        >
          Place Bit
        </button>

        <button onClick={handleBookmark} className="text-black text-xl">
          {bookmarked ? <FaBookmark className="text-black" /> : <FaRegBookmark className="text-black" />}
        </button>
      </div>
    </div>

    {/* Image Grid */}
    <h1 className='mb-2 mt-4 md:text-2xl font-bold text-lg '>{post.title}</h1>
    <div className="imgcont flex flex-col lg:flex-row w-full h-auto lg:h-[500px] gap-2 relative">
      {post.images?.length > 2 && (
        <div className="absolute bottom-2 right-2 bg-black/90 px-5 py-2 cursor-pointer rounded-2xl text-white text-sm">
          View all {post.images.length + 1} photos
        </div>
      )}
      <div className="w-full lg:w-[60%] h-[250px] lg:h-full">
        <img src={post.cover} alt="" className="w-full h-full object-cover rounded-2xl lg:rounded-l-3xl" />
      </div>
      <div className="flex flex-row lg:flex-col w-full lg:w-[40%] h-[250px] lg:h-full gap-2">
        <div className="w-1/2 lg:w-full h-full">
          {post.images?.[0] && (
            <img src={post.images[0]} alt="" className="w-full h-full object-cover rounded-xl lg:rounded-tr-3xl" />
          )}
        </div>
        <div className="w-1/2 lg:w-full h-full">
          {post.images?.[1] && (
            <img src={post.images[1]} alt="" className="w-full h-full object-cover rounded-xl lg:rounded-br-3xl" />
          )}
        </div>
      </div>
    </div>

    {/* Show Bit Card Modal */}
    {showBit && (
      <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex justify-center items-center z-50">
        <div className="relative">
          <button
            onClick={() => setShowBit(false)}
            className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
          >
            ✕
          </button>
          <PlaceBit post={post} show={setShowBit} />
        </div>
      </div>
    )}

    {/* Description & Owner Card */}
    <div className="mt-6">
      <p className="text-base md:text-lg text-gray-800">{post.description}</p>

      <div className="mt-4 flex items-center gap-4 p-4 bg-white shadow-md rounded-lg w-fit">
        {/* Avatar */}
        <img
          src={post.owner.cover}
          alt={post.owner.username}
          className="w-14 h-14 rounded-full object-cover border-2"
        />

        {/* Info */}
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-gray-800">{post.owner.username}</span>
          <span className="text-sm text-gray-500">Post Owner</span>
        </div>

        {/* Button */}
        <Link
          to={`/profile/${post.owner._id}`}
          className="ml-auto px-4 py-2 text-sm bg-black text-white rounded-lg transition"
        >
          View Profile
        </Link>
      </div>
    </div>
  </div>
);
};

export default RoomDetails;
