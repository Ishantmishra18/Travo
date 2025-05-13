// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../Context/userContext';


const NavBar = () => {
  const { user } = useUser();

  return (
    <nav className="bg-white shadow-md h-[10vh] p-4 flex justify-between sticky top-0 z-40">
      <Link to='/' className="text-xl font-bold">Travo</Link>
      <div className="space-x-4">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
        
          <div className="flex items-center gap-6">
          <h1>welcome {user.username}</h1>
          <Link to='/chat' className='px-4 py-2 rounded-xl bg-black relative text-white'>Inbox
          <div className="pop bg-red-600 text-center h-6  rounded-full absolute -top-1 -left-3 aspect-square">3</div>
          </Link>
          <Link to="/profile">Profile</Link>
          </div>
          
        )}
      </div>
    </nav>
  );
};

export default NavBar;
