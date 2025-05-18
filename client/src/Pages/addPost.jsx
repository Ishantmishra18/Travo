import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiCirclePlus } from "react-icons/ci";
import api from '../utils/api';

const AddPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
  });

  const [coverPreview, setCoverPreview] = useState('');
  const [coverFile, setCoverFile] = useState(null);

  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const coverInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleRemoveCover = () => {
    setCoverFile(null);
    setCoverPreview('');
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 8 - galleryFiles.length);
    const previews = files.map(file => URL.createObjectURL(file));
    setGalleryFiles(prev => [...prev, ...files]);
    setGalleryPreviews(prev => [...prev, ...previews]);
  };

  const handleRemoveGalleryImage = (index) => {
    const updatedFiles = galleryFiles.filter((_, i) => i !== index);
    const updatedPreviews = galleryPreviews.filter((_, i) => i !== index);
    setGalleryFiles(updatedFiles);
    setGalleryPreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coverFile) return alert("Please upload a cover image");
    if (galleryFiles.length === 0) return alert("Please upload at least one gallery image");

    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('location', formData.location);
    form.append('price', formData.price);
    form.append('cover', coverFile);
    galleryFiles.forEach((img, i) => form.append('images', img));

    try {
      const token = localStorage.getItem('token');
      await api.post('/listing/add', form, {
      });
      setSuccessMsg('Listing created successfully!');
      setTimeout(() => navigate('/profile'), 3000);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-[90vw] h-[90vh] bg-white rounded-3xl shadow-2xl flex overflow-hidden">

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="w-[80vw] p-10 flex flex-col justify-start">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New Listing</h2>

          {successMsg && <p className="text-green-600">{successMsg}</p>}
          {errorMsg && <p className="text-red-600">{errorMsg}</p>}

          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange}
                className="w-full mt-1 p-3 bg-gray-100 rounded-xl" />
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange}
                className="w-full mt-1 p-3 bg-gray-100 rounded-xl resize-none h-24" />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange}
                className="w-full mt-1 p-3 bg-gray-100 rounded-xl" />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Price (₹)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange}
                className="w-full mt-1 p-3 bg-gray-100 rounded-xl" />
            </div>

            <div className="col-span-2 flex justify-end">
              <button type="submit"
                className={`bg-black text-white px-6 py-3 rounded-xl hover:translate-y-1 cursor-pointer transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}>
                {loading ? 'Creating...' : 'Create Listing'}
              </button>
            </div>
          </div>
        </form>

        {/* Right Preview Panel */}
        <div className="w-[35%] bg-neutral-800 flex flex-col items-center justify-start p-4">
          {/* Cover Image Upload */}
          <div
            className="w-full h-48 aspect-video rounded-2xl overflow-hidden border-4 border-white mb-4 relative cursor-pointer group"
            onClick={() => !coverFile && coverInputRef.current.click()}
          >
            {coverPreview ? (
              <>
                <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                <button
                  className="absolute top-2 right-2 text-white bg-red-600/70 rounded-sm px-2 py-1 text-xs hover:bg-red-700/80"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveCover();
                  }}
                >
                  ✕
                </button>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white bg-gray-700">
                <CiCirclePlus className="text-5xl" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              ref={coverInputRef}
              onChange={handleCoverUpload}
              className="hidden"
            />
          </div>

          <h2 className='mb-4 text-white'>Add More Images (at least 2)</h2>
          {/* Gallery Images Grid */}
          <div className="grid grid-cols-3 gap-2">
            {galleryPreviews.map((src, i) => (
              <div key={i} className="relative h-20 w-28 rounded-md overflow-hidden shadow border">
                <img src={src} alt={`img-${i}`} className="w-full h-full object-cover" />
                <button
                  onClick={() => handleRemoveGalleryImage(i)}
                  className="absolute top-1 right-1 bg-red-600/70 text-white text-xs px-1 rounded-sm cursor-pointer hover:bg-red-700/80"
                >
                  ✕
                </button>
              </div>
            ))}
            {galleryFiles.length < 8 && (
              <>
                <div
                  className="h-20 w-28 rounded-md overflow-hidden shadow border bg-white/35 cursor-pointer grid place-content-center"
                  onClick={() => galleryInputRef.current.click()}
                >
                  <CiCirclePlus className='text-3xl text-white' />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={galleryInputRef}
                  onChange={handleGalleryUpload}
                  className="hidden"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
