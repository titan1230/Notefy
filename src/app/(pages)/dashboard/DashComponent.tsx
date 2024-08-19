"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { FaSync } from 'react-icons/fa';
import DashboardNavbar from '@/components/DashboardNavbar';
import NotesList from '@/components/Notes/NotesList'; // Correct import path

interface User {
  name: string;
  image: string;
  id: string;
  username: string;
}

interface DashProps {
  user: User;
}

const Dashboard: React.FC<DashProps> = ({ user }) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      // Trigger refresh for NotesList
      setRefreshKey(prevKey => prevKey + 1);
    } catch (error) {
      console.error('Failed to refresh notes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <DashboardNavbar user={user} />

      <main className="p-4 md:p-8">
        <div className="text-base md:text-lg mb-4">
          Welcome to your dashboard, {user.username}.
        </div>
        <Link href="/note/new">
          <button className="btn btn-primary mb-6">
            + New Note
          </button>
        </Link>

        <div className="glass p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Notes</h2>
            <button 
              onClick={handleRefresh} 
              className="btn btn-accent relative flex items-center justify-center"
            >
              <FaSync 
                className={`text-xl ${loading ? 'spin' : ''}`}
              />
              Refresh
            </button>
          </div>
          <Suspense fallback={
            <div className="absolute inset-0 flex justify-center items-center">
              <span className="loading loading-spinner text-secondary"></span>
            </div>
          }>
            <NotesList userID={user.id} refreshKey={refreshKey} />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
