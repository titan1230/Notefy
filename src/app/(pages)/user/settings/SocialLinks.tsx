"use client"

import React, { use, useEffect, useState } from 'react';
import { FaGithub, FaSquareXTwitter, FaGlobe, FaLinkedin } from 'react-icons/fa6';

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

export default function SocialLinks({ userPromise }: { userPromise: Promise<User> }) {

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

  const handleLinkedInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      linkedin: e.target.value,
    });
  };

  const handleGithubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      github: e.target.value,
    });
  };

  const handleTwitterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      twitter: e.target.value,
    });
  };

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      website: e.target.value,
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
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h1 className="card-title font-Grey_Qo">Social Links</h1>

        <div className="flex items-center my-2">
          <label className='flex input input-bordered w-full input-accent cursor-pointer items-center'
            onClick={
              () => {
                if (user.linkedin) {
                  window.open(`https://linkedin.com/in/${localUser?.linkedin}`, '_blank')
                }
              }
            }>
            <FaLinkedin size={30} className='mr-5' />
            <input
              type="text"
              value={user.linkedin || ''}
              placeholder="LinkedIn"
              readOnly
            />
          </label>

          <button className="btn btn-sm btn-secondary ml-2"
            onClick={() => (document.getElementById('linkedin_modal') as HTMLDialogElement).showModal()}
          >Edit
          </button>
        </div>

        <div className="flex items-center my-2">
          <label className='flex input input-bordered w-full input-accent cursor-pointer items-center'>
            <FaSquareXTwitter size={30} className='mr-5' />
            <input
              type="text"
              value={user.twitter || ''}
              placeholder="Twitter"
              readOnly
              onClick={
                () => {
                  if (user.twitter) {
                    window.open(`https://twitter.com/${localUser?.twitter}`, '_blank')
                  }
                }
              }
            />
          </label>

          <button className="btn btn-sm btn-secondary ml-2"
            onClick={() => (document.getElementById('twitter_modal') as HTMLDialogElement).showModal()}
          >Edit
          </button>
        </div>

        <div className="flex items-center my-2">
          <label className='flex input input-bordered w-full input-accent cursor-pointer items-center'>
            <FaGithub size={30} className='mr-5' />
            <input
              type="text"
              value={user.github || ''}
              placeholder="GitHub"
              readOnly
              title='Click to visit GitHub'
              onClick={
                () => {
                  if (user.github) {
                    window.open(`https://github.com/${localUser?.github}`, '_blank')
                  }
                }
              }
            />
          </label>

          <button className="btn btn-sm btn-secondary ml-2"
            onClick={() => (document.getElementById('github_modal') as HTMLDialogElement).showModal()}
          >Edit
          </button>
        </div>

        <div className="flex items-center my-2">
          <label className='flex input input-bordered w-full input-accent cursor-pointer items-center'>
            <FaGlobe size={30} className='mr-5' />
            <input
              type="text"
              value={user.website || ''}
              placeholder="Website"
              readOnly
              onClick={
                () => {
                  if (user.website) {
                    window.open(localUser?.website, '_blank')
                  }
                }
              }
            />
          </label>

          <button className="btn btn-sm btn-secondary ml-2"
            onClick={() => (document.getElementById('website_modal') as HTMLDialogElement).showModal()}
          >Edit
          </button>
        </div>
      </div>

      <dialog id="linkedin_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit LinkedIN URL</h3>
          <form
            action={async () => {
              await save('linkedin', localUser?.linkedin || '')
              window.location.reload()
            }}
          >
            <label className='flex input w-full input-accent items-center focus:outline-none'>
              <FaLinkedin size={30} className='mr-5' />
              <input
                type="text"
                value={localUser?.linkedin || ''}
                placeholder="LinkedIn"
                onChange={handleLinkedInChange}
              />
            </label>

            <div className="col-span-full flex flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 mt-6 justify-center">
              <button
                type="button"
                className="btn btn-error w-full sm:w-[100px] py-2 px-4 rounded-lg text-black bg-red-600 hover:bg-red-700"
                onClick={() => (document.getElementById('linkedin_modal') as HTMLDialogElement).close()}
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

      <dialog id="twitter_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Twitter URL</h3>

          <form
            action={async () => {
              await save('twitter', localUser?.twitter || '')
              window.location.reload()
            }}
          >
            <label className='flex input w-full input-accent items-center focus:outline-none'>
              <FaSquareXTwitter size={30} className='mr-5' />
              <input
                type="text"
                value={localUser?.twitter || ''}
                placeholder="Twitter"
                onChange={handleTwitterChange}
              />
            </label>

            <div className="col-span-full flex flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 mt-6 justify-center">
              <button
                type="button"
                className="btn btn-error w-full sm:w-[100px] py-2 px-4 rounded-lg text-black bg-red-600 hover:bg-red-700"
                onClick={() => (document.getElementById('twitter_modal') as HTMLDialogElement).close()}
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

      <dialog id="github_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <form action={async () => {
            await save('github', localUser?.github || '')
            window.location.reload()
          }}>

            <label className='flex input w-full input-accent items-center focus:outline-none'>
              <FaGithub size={30} className='mr-5' />
              <input
                type="text"
                value={localUser?.github || ''}
                placeholder="Github"
                onChange={handleGithubChange}
              />
            </label>

            <div className="col-span-full flex flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 mt-6 justify-center">
              <button
                type="button"
                className="btn btn-error w-full sm:w-[100px] py-2 px-4 rounded-lg text-black bg-red-600 hover:bg-red-700"
                onClick={() => (document.getElementById('github_modal') as HTMLDialogElement).close()}
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

      <dialog id="website_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>

          <form action={async () => {
            await save('website', localUser?.website || '')
            window.location.reload()
          }}>

            <label className='flex input w-full input-accent items-center focus:outline-none'>
              <FaGlobe size={30} className='mr-5' />
              <input
                type="text"
                value={localUser?.website || ''}
                placeholder="Website"
                onChange={handleWebsiteChange}
              />
            </label>

            <div className="col-span-full flex flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 mt-6 justify-center">
              <button
                type="button"
                className="btn btn-error w-full sm:w-[100px] py-2 px-4 rounded-lg text-black bg-red-600 hover:bg-red-700"
                onClick={() => (document.getElementById('website_modal') as HTMLDialogElement).close()}
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
