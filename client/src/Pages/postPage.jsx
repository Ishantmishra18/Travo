import React, { useState } from 'react';
import PlaceBit from '../Components/placeBit';
import { usePost } from '../Context/postContext';
import { useParams } from 'react-router-dom';


const RoomDetails = () => {
  const [showBit, setShowBit] = useState(false);

  const { postID }= useParams();

  const {posts}=usePost()
  const post = posts.find(val=>val._id==postID)

  const room = {
    title: 'Cozy Studio Apartment',
    location: 'Mumbai, India',
    description:
      'This modern studio apartment offers a peaceful stay in the heart of Mumbai. Fully furnished, WiFi, and close to the metro.',
    price: 2200,
    roomType: 'Entire place',
    amenities: ['WiFi', 'Air conditioning', 'Kitchen', 'Washer', 'Parking'],
    images: [
      'https://cdn.create.vista.com/api/media/medium/214626304/stock-photo-streaming?token=',
    ],
    rating: 4.7,
    reviews: 143,
    host: {
      name: 'Rahul Sharma',
      avatar: 'https://i.pravatar.cc/150?img=32',
    },
  };

  if (!post) {
  return <div className="text-center text-xl text-red-500 mt-10">Loading post details or post not found.</div>;
}


  return (
    <div className="max-w-5xl mx-auto p-6 relative">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-600">{room.location}</p>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {room.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Room image ${i + 1}`}
            className="rounded-lg w-full h-64 object-cover"
          />
        ))}
      </div>

      {/* Button to trigger Bit card */}
      <div
        onClick={() => setShowBit(true)}
        className="bit px-5 py-4 bg-black rounded-2xl mt-2 text-white cursor-pointer w-fit"
      >
        Place Bit
      </div>

      {/* Show Bit Card Modal */}
      {showBit && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex justify-center items-center">
          <div className="relative">
            {/* Close Button */}
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
        <p className="text-lg text-gray-800">{room.description}</p>
        <p className="mt-2">
          <strong>Room type:</strong> {room.roomType}
        </p>
        <p className="mt-1">
          <strong>Price:</strong> ₹{room.price} / night
        </p>

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
            <p className="text-sm text-gray-500">
              ⭐ {room.rating} ({room.reviews} reviews)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
