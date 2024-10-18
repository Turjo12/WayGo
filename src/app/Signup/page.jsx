'use client';
import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import { imageUpload } from '../../api/utils/index';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);
  const router = useRouter();

  const { createUser, updateUserProfile } = useContext(AuthContext);

  const handleProfilePicChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!image) {
      Swal.fire({
        title: 'Profile Picture Required',
        text: 'Please upload a profile picture.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      const imageUrl = await imageUpload(image);
      await createUser(email, password);
      await updateUserProfile(name, imageUrl);
      Swal.fire({
        title: 'Signup Successful',
        text: 'You have successfully signed up.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        router.push('/');
      });
    } catch (err) {
      Swal.fire({
        title: 'Signup Failed',
        text: err.message || 'An unexpected error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center py-10 px-5">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-semibold text-center text-[#25527E] mb-8">
          Create Your Account
        </h2>

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0652b]"
              placeholder="Your Full Name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0652b]"
              placeholder="Your Email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0652b]"
              placeholder="Your Phone Number"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0652b]"
              placeholder="Your Password"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="profile-pic">
              Profile Picture
            </label>
            <input
              type="file"
              id="profile-pic"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0652b]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-[#f0652b] text-white font-semibold rounded-lg hover:bg-[#e55c28] transition-colors duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-5 text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-[#f0652b] hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
