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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const token = localStorage.getItem('token');
      await api.post('/listing/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMsg('Post created successfully!');
      setFormData({
        title: '',
        description: '',
        location: '',
        price: '',
        cover: '',
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 px-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl flex overflow-hidden">
        {/* Left - Form Section */}
        <form onSubmit={handleSubmit} className="w-[80vw] p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New Listing</h2>

          {successMsg && <p className="text-green-600">{successMsg}</p>}
          {errorMsg && <p className="text-red-600">{errorMsg}</p>}

          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
                className="w-full mt-1 p-3 focus:outline-none focus:bg-gray-200 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-400"
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the place..."
                className="w-full mt-1 focus:outline-none focus:bg-gray-200 p-3 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-400 resize-none h-24"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., New Delhi, India"
                className="w-full mt-1 focus:outline-none focus:bg-gray-200 p-3 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Price (in ₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 5000"
                className="w-full mt-1 focus:outline-none focus:bg-gray-200 p-3 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-400"
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">Cover Image URL</label>
              <input
                type="text"
                name="cover"
                value={formData.cover}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full mt-1 focus:outline-none focus:bg-gray-200 p-3 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-400"
              />
            </div>

            <div className="col-span-2 flex justify-end">
              <button
                type="submit"
                className={`bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Listing'}
              </button>
            </div>
          </div>
        </form>

        {/* Right - Image Preview */}
        <div className="w-1/3 bg-gradient-to-br from-indigo-300 to-purple-400 flex flex-col items-center justify-center p-8">
          <div className="w-full h-48 aspect-video rounded-2xl overflow-hidden shadow-xl border-4 border-white hover:scale-105 transition duration-300 bg-white">
            <img
              src={formData.cover || 'https://via.placeholder.com/300x200'}
              alt="Cover Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-white mt-4 text-sm font-light text-center">
            Paste a valid image URL in the field to preview
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
