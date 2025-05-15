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
      <div className="flex py-10">

        <div className="flex flex-col gap-5 mt- p-10">
        {posts?.map((val, key) => (
        <RoomPost post={val}/>
        ))}
      </div>
      <div className="map h-[65vh] w-[25vw] sticky top-[30vh] bg-neutral-600 rounded-2xl"></div>
      </div>

      <footer class="bg-gray-900 text-white py-6 mt-10">
  <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
    <p class="text-sm">&copy; 2025 YourCompany. All rights reserved.</p>
    <div class="flex space-x-4 mt-4 md:mt-0">
      <a href="#" class="hover:underline">Privacy Policy</a>
      <a href="#" class="hover:underline">Terms of Service</a>
      <a href="#" class="hover:underline">Contact</a>
    </div>
  </div>
</footer>

  
    </div>
  );
};

export default ListingPage;
