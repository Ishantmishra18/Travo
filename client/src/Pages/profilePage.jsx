import React from 'react';
import axios from 'axios';
import { useNavigate , Link } from 'react-router-dom';
import api from '../utils/api';
import { useUser } from '../Context/userContext';


const ProfilePage = () => {
  const navigate = useNavigate();
  const {setUser}= useUser()

  const logout = async () => {
    try {
        await api.post('/auth/logout');
        setUser(null)
      navigate('/'); 
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div>
      <h2>Profile Page</h2>
      <div
        className="bg-black text-white px-3.5 py-2.5 rounded-2xl cursor-pointer inline-block"
        onClick={logout}
      >
        Logout
      </div>
      <div className="flex gap-5 mt-3">
      <Link to='list' className="list border-2 border-black px-4 py-3">add your listing</Link>

      <Link to='/' className='bg-black rounded-full px-5 py-2 text-white'>back to home</Link>
      <Link to='bookmark'>My bookmark</Link>
      <Link to='edit' className='px-3 py-2 bg-black text-white'>edit my profile</Link>
      </div>
    </div>
  );
};

export default ProfilePage;
