import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    cover: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/listing/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSuccessMsg('Post created successfully!');
      setFormData({
        title: '',
        description: '',
        location: '',
        price: '',
        cover: ''
      });

      setTimeout(() => {
        navigate('/profile');
      }, 3000);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex bg-white text-gray-800 font-sans">
      
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="h-full w-[70vw] px-16 py-12 flex flex-col gap-6 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-2">Add New Listing</h2>

        {successMsg && <p className="text-green-600">{successMsg}</p>}
        {errorMsg && <p className="text-red-600">{errorMsg}</p>}

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the place..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., New Delhi, India"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Price (in ₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., 5000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Cover Image URL</label>
            <input
              type="text"
              name="cover"
              value={formData.cover}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className={`mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold transition duration-300 hover:bg-blue-700 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Listing'}
          </button>
        </div>
      </form>

      {/* Image Upload / Preview Section */}
      <div className="h-full w-[30vw] bg-gray-50 flex flex-col items-center justify-center gap-5 p-6">
        <div className="cover h-[20vh] aspect-video bg-cover bg-center rounded-2xl border border-gray-300"
          style={{ backgroundImage: `url(${formData.cover || 'https://via.placeholder.com/300x200'})` }}>
        </div>
        <div className="text-sm text-gray-600 text-center">
          Preview of cover image. Paste a valid image URL in the field.
        </div>
      </div>
    </div>
  );
};

export default AddPost;
