"use client";

import React from 'react';
import Image from 'next/image';
import { signOut } from '@/lib/helper';
import Link from 'next/link';

interface NavbarProps {
  user: {
    name: string;
    image: string;
    id: string;
  };
}

const DashboardNavbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start flex items-center space-x-4 ">
        <Image
          src="/favicon.ico"
          alt="Notefy Logo"
          width={40}
          height={40}
          className="ml-2 mr-2 md:ml-5 md:mr-5"
        />
        <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
      </div>


      <div className='navbar-end'>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <div className="relative w-10 h-10 rounded-full overflow-hidden mr-4">
              <Image
                src={user.image}
                alt={`${user.name}'s profile`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="40px"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <Link href={`/user/${user.id}`}>Profile</Link>
            </li>
            <li>
              <Link href={`/user/settings`}>Settings</Link>
            </li>
            <li onClick={() => (document.getElementById('my_modal_2') as HTMLDialogElement)?.showModal()}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>

      <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
          <h3 className="font-bold text-lg mb-4">Confirm Logout</h3>
          <p className="text-center mb-6">Are you sure you want to log out? You’ll need to log in again to access your account.</p>

          <div className="flex space-x-4">
            <button
              className="btn btn-error w-[100px] py-2 px-4 rounded-lg text-white bg-red-600 hover:bg-red-700"
              onClick={() => (document.getElementById('my_modal_2') as HTMLDialogElement).close()}
            >
              Cancel
            </button>

            <form
              action={async () => {
                (document.getElementById('my_modal_2') as HTMLDialogElement).close();
                await signOut();
              }}
            >
              <button
                type="submit"
                className="btn btn-success w-[100px] py-2 px-4 rounded-lg text-white bg-green-600 hover:bg-green-700"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </div>

  );
};

export default DashboardNavbar;
