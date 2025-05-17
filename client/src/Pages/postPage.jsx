import React, { useState, useEffect } from 'react';
import PlaceBit from '../Components/placeBit';
import { usePost } from '../Context/postContext';
import { useParams } from 'react-router-dom';
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

  const room = {
    title: 'Cozy Studio Apartment',
    location: 'Mumbai, India',
    description: 'This modern studio apartment offers a peaceful stay in the heart of Mumbai. Fully furnished, WiFi, and close to the metro.',
    price: 2200,
    roomType: 'Entire place',
    amenities: ['WiFi', 'Air conditioning', 'Kitchen', 'Washer', 'Parking'],
    images: ['https://cdn.create.vista.com/api/media/medium/214626304/stock-photo-streaming?token='],
    rating: 4.7,
    reviews: 143,
    host: {
      name: 'Rahul Sharma',
      avatar: 'https://i.pravatar.cc/150?img=32',
    },
  };

  return (
    <div className="max-w-5xl mx-auto p-6 relative">

      {/* Sticky Navbar */}
      <div className="sticky top-[11vh] z-50 bg-white/90 backdrop-blur-2xl rounded-xl shadow-md mb-6 px-4 py-3 flex justify-end gap-4">
        {/* Place Bit */}
        <button
          onClick={() => setShowBit(true)}
          className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-900 transition"
        >
          Place Bit
        </button>

        {/* Bookmark */}
        <button onClick={handleBookmark} className="text-black text-xl">
          {bookmarked ? (
            <FaBookmark className="text-black" />
          ) : (
            <FaRegBookmark className="text-black" />
          )}
        </button>
      </div>

      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-600">{post.location}</p>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      
          <img
            src={post.cover}
            alt={`Room image`}
            className="rounded-lg w-full h-64 object-cover"
          />
        
      </div>
      <div className="w-full flex flex-wrap">
        {post.images.map((val , key)=>(
          <img src={val} alt="" key={key} className='h-[20vh] w-[15vw] rounded-2xl'/>
        ))}
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

      <div className="mt-6">
        <p className="text-lg text-gray-800">{post.description}</p>
        <p className="mt-2"><strong>Room type:</strong> {room.roomType}</p>
        <p className="mt-1"><strong>Price:</strong> ₹{post.price} / night</p>

        <div className="mt-3">
          <strong>Amenities:</strong>
          <ul className="list-disc list-inside mt-1 text-gray-700">
            {room.amenities.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <img
            src={room.host.avatar}
            alt={room.host.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-medium">Hosted by {post.owner.username}</p>
            <p className="text-sm text-gray-500">⭐ {room.rating} ({room.reviews} reviews)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
