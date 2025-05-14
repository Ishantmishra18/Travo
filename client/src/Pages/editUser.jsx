import React, { useState } from "react";

export default function EditProfile() {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  return (
    <div className="max-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 px-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl flex overflow-hidden">
        {/* Left - Form Section */}
        <div className="w-[80vw] p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Edit Profile</h2>

          <form className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-xl bg-white shadow-sm focus:ring-indigo-400 focus:ring-2 outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full mt-1 p-2 border rounded-xl bg-white shadow-sm focus:ring-indigo-400 focus:ring-2 outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                className="w-full mt-1 p-2 border rounded-xl bg-white shadow-sm focus:ring-indigo-400 focus:ring-2 outline-none"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                className="w-full mt-1 p-2 border rounded-xl bg-white shadow-sm focus:ring-indigo-400 focus:ring-2 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-xl bg-white shadow-sm focus:ring-indigo-400 focus:ring-2 outline-none"
                placeholder="City, Country"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Gender</label>
              <select className="w-full mt-1 p-2 border rounded-xl bg-white shadow-sm focus:ring-indigo-400 focus:ring-2 outline-none">
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Language</label>
              <select className="w-full mt-1 p-2 border rounded-xl bg-white shadow-sm focus:ring-indigo-400 focus:ring-2 outline-none">
                <option>English</option>
                <option>Hindi</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">About Me</label>
              <textarea
                rows="3"
                className="w-full mt-1 p-3 border rounded-xl bg-white shadow-sm focus:ring-indigo-400 focus:ring-2 outline-none"
                placeholder="Tell others about yourself..."
              />
            </div>

            <div className="col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Right - Image Section */}
        <div className="w-1/3 bg-gradient-to-br from-indigo-300 to-purple-400 flex flex-col items-center justify-center p-8">
          <label className="cursor-pointer">
            <div className="w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-white hover:scale-105 transition duration-300">
              <img
                src={profileImage || "/default-avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <p className="text-white mt-4 text-sm font-light">Click to change</p>
        </div>
      </div>
    </div>
  );
}
