import React from 'react';
import { usePost } from '../Context/postContext';
import Nav from '../Components/nav';
import RoomSB from '../Components/roomSB';
import RoomPost from '../Components/roomPost';

const ListingPage = () => {
  const { posts } = usePost(); 

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <RoomSB />
      <div className="flex flex-col gap-5 mt- p-10">
        {posts?.map((val, key) => (
        <RoomPost post={val}/>
        ))}
      </div>
    </div>
  );
};

export default ListingPage;
