"use client"

import React, { use, useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa6';

interface User {
  _id: string;
  name: string;
  image: string;
  username: string;
  bio?: string;
  location?: string;
  website?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  error?: string;
}

export default function UserInformation({ userPromise }: { userPromise: Promise<User> }) {

  const [localUser, setUser] = useState<User | null>(null);

  const user = use(userPromise);

  useEffect(() => {
    setUser(user);
  }, [user]);

  if (!user || user.error) {
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        <span className="loading loading-spinner text-secondary"></span>
      </div>
    );
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      username: e.target.value,
    });
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUser({
      ...user,
      bio: e.target.value
    });
  };

  async function save(type: string, data: string) {
    try {
      await fetch(`/api/user/info/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "type": type,
          "data": data,
        }),
      });
    } catch (error) { }
  }

  return (
    <div>
      <div className="card bg-base-100 shadow-xl min-h-[380px]">
        <div className="card-body">
          <h2 className="card-title font-Grey_Qo pb">User Information</h2>
          <div className="flex items-center my-2">
            <label className='flex input input-bordered w-full input-accent cursor-pointer items-center'>
              <FaUser size={30} className='mr-5' />
              <input
                type="text"
                value={user?.username || ''}
                placeholder="Username"
                readOnly
              />
            </label>

            <button className="btn btn-sm btn-secondary ml-2"
              onClick={() => (document.getElementById('username_modal') as HTMLDialogElement).showModal()}
            >Edit
            </button>
          </div>

          <label className="form-control">
            <div className="label">
              <h4 className="label-text text-black font-Grey_Qo">Your bio</h4>
            </div>
            <textarea className="textarea textarea-bordered h-24 textarea-accent resize-none" value={user?.bio} readOnly />
            <div className="label">
              <button className="btn btn-sm btn-secondary label-text-alt"
                onClick={() => (document.getElementById('bio_modal') as HTMLDialogElement).showModal()}
              >Edit
              </button>
            </div>
          </label>
        </div>
      </div>

      <dialog id="username_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Your Username</h3>

          <form action={async () => {
            await save('username', localUser?.username || '')
            window.location.reload()
          }}>

            <label className='flex input w-full input-accent items-center focus:outline-none'>
              <FaUser size={30} className='mr-5' />
              <input
                type="text"
                value={localUser?.username || ''}
                placeholder="username"
                onChange={handleUsernameChange}
              />
            </label>

            <div className="col-span-full flex flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 mt-6 justify-center">
              <button
                type="button"
                className="btn btn-error w-full sm:w-[100px] py-2 px-4 rounded-lg text-black bg-red-600 hover:bg-red-700"
                onClick={() => (document.getElementById('username_modal') as HTMLDialogElement).close()}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-success w-full sm:w-[100px] py-2 px-4 rounded-lg text-white bg-green-600 hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <dialog id="bio_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg font-Grey_Qo">Edit your bio!</h3>
          <form action={async () => {
            await save('bio', localUser?.bio || '')
            window.location.reload()
          }}>

            <label className="form-control">
              <div className="label">
                <h4 className="label-text text-black font-Grey_Qo">Your bio</h4>
              </div>
              <textarea className="textarea textarea-bordered h-24 textarea-accent resize-none" value={localUser?.bio} maxLength={100} onChange={handleBioChange} />
            </label>

            <div className="col-span-full flex flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 mt-6 justify-center">
              <button
                type="button"
                className="btn btn-error w-full sm:w-[100px] py-2 px-4 rounded-lg text-black bg-red-600 hover:bg-red-700"
                onClick={() => (document.getElementById('bio_modal') as HTMLDialogElement).close()}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-success w-full sm:w-[100px] py-2 px-4 rounded-lg text-white bg-green-600 hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
