"use client";

import { Suspense, use, useState } from 'react';
import Image from 'next/image';
import { FaTwitter, FaGithub, FaLinkedin, FaSync } from 'react-icons/fa';
import NotesList from './Notes/NotesList';

interface User {
  _id: string;
  name: string;
  image: string;
  bio?: string;
  location?: string;
  website?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  error?: string;
}

interface UserProfileProps {
  userPromise: Promise<User>;
}

function UserProfile({ userPromise }: UserProfileProps) {
  const user = use(userPromise);

  if (!user || user.error) {
    return (
      <div className="relative min-h-screen bg-[#101720]">
        <div className="absolute inset-0 flex justify-center items-center p-4">
          <p className="text-lg text-center text-white">
            This profile is either private or does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black pt-10 pl-10 pr-10">
      <div className="flex flex-col items-center justify-center w-full max-w-md p-6 md:p-8 mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg mb-10">
        <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden shadow-md">
          <Image
            src={user.image}
            alt="User Profile Picture"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div className="mt-6 md:mt-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{user.name}</h2>
          {user.location && (
            <p className="text-gray-500 mt-1 md:mt-2 text-sm md:text-base">{user.location}</p>
          )}
          {user.bio && (
            <p className="mt-3 md:mt-4 text-gray-600 text-sm md:text-base leading-relaxed">{user.bio}</p>
          )}
        </div>
        <div className="mt-6 md:mt-8 flex justify-center space-x-4 md:space-x-6">
          {user.twitter && (
            <a
              href={`https://twitter.com/${user.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out"
            >
              <FaTwitter className="w-6 h-6 md:w-7 md:h-7" />
            </a>
          )}
          {user.github && (
            <a
              href={`https://github.com/${user.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-900 transition duration-200 ease-in-out"
            >
              <FaGithub className="w-6 h-6 md:w-7 md:h-7" />
            </a>
          )}
          {user.linkedin && (
            <a
              href={`https://linkedin.com/in/${user.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 transition duration-200 ease-in-out"
            >
              <FaLinkedin className="w-6 h-6 md:w-7 md:h-7" />
            </a>
          )}
        </div>
        {user.website && (
          <div className="mt-4 md:mt-6">
            <a
              href={user.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 text-xs md:text-sm font-medium transition duration-200 ease-in-out"
            >
              Visit website
            </a>
          </div>
        )}
      </div>


      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{`${user.name} | Public Notes`}</h2>
        </div>
        <Suspense fallback={
          <div className="absolute inset-0 flex justify-center items-center">
            <span className="loading loading-spinner text-secondary"></span>
          </div>
        }>
          <NotesList userID={user._id} refreshKey={1} priv={1} />
        </Suspense>
      </div>
    </div>
  );
}

export default UserProfile;
