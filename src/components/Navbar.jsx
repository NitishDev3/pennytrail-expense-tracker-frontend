import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { logout, setUser } from '../store/userSlice';
import { setToastInfo } from '../store/configSlice'; // Add this import if setToastInfo is from configSlice

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/logout`, { withCredentials: true });
      dispatch(logout());
      dispatch(setToastInfo(response.data.message));
      setShowDropdown(false);
    } catch (error) {
      const message = error.response?.data?.message || 'Network Error';
      dispatch(setToastInfo(message));
    }
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <nav className="flex items-center justify-between px-6 py-4">
        {/* App Logo */}
        <div className="text-2xl font-bold text-primary">Penny Trail</div>

        {/* Profile Icon */}
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-700 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 14c-4.418 0-8 2.239-8 5v1a1 1 0 001 1h14a1 1 0 001-1v-1c0-2.761-3.582-5-8-5z"
            />
          </svg>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <ul className="py-2">
                <li
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition"
                  onClick={() => {
                    console.log('Update Profile');
                    setShowDropdown(false);
                  }}
                >
                  Update Profile
                </li>
                <li
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
