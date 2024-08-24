"use client";

import { useCallback, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { redirect } from "next/navigation";

import ColorPicker from 'react-pick-color';

import MenuBar from "@/components/TipTap/MenuBar";

// Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';

// Extensions
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Heading from '@tiptap/extension-heading';
import CharacterCount from '@tiptap/extension-character-count';

// Configure Color extension
Color.configure({
  types: ['textStyle'],
});

const limit = 500;

const NewNoteEditor = ({ editorID }: { editorID: string }) => {
  const [color, setColor] = useState('#fff');
  const [isPublic, setIsPublic] = useState(false);
  const [title, setTitle] = useState('');

  const handleSwitchChange = (event: any) => {
    setIsPublic(event.target.checked);
  };

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'focus:outline-none prose',
      },
    },
    content: "Start here!",
    extensions: [
      StarterKit,
      Color.configure({
        types: ['textStyle',],
      }),
      TextStyle,
      CharacterCount.configure({
        limit: limit,
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
    ],
  });


  const saveNote = useCallback(async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/notes/${editorID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title, body: editor?.getHTML(), editorID: editorID, "bg_color": color, visibility: isPublic ? 'public' : 'private' }),
        cache: 'no-store',
      });
      toast.success('Data Saved Successfully', {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error('Error saving note:', error);
    }
  }, [editorID, title, editor, color, isPublic]);

  return (
    <div className='bg-[#101720] w-screen h-screen relative'>
      <div className='navbar z-50 relative flex flex-col sm:flex-row justify-between items-center p-4'>
        <div className='navbar-start mb-4 sm:mb-0'>
          <p className='text-xl text-white font-Grey_Qo'>New Note</p>
        </div>
        <div className='navbar-end'>
          <button
            onClick={() => (document.getElementById('save_modal') as HTMLDialogElement)?.showModal()}
            className='bg-yellow-300 text-black font-Grey_Qo px-4 py-2 rounded-lg'
          >
            Save
          </button>
        </div>
      </div>

      <div className='pt-5 bg-[#101720] z-50 relative'>
        <MenuBar editor={editor} />
      </div>

      <div className="absolute inset-0 flex justify-center items-center p-4 z-0 mt-72 sm:mt-0">
        <div className="bg-yellow-300 w-full max-w-lg h-80 flex rounded-lg shadow-md p-5">
          <EditorContent
            editor={editor}
            className='bg-white h-full w-full rounded-lg p-4 overflow-auto'
          />
        </div>
      </div>
      <ToastContainer limit={5} pauseOnFocusLoss />

      {/* DIALOGUE STARTS HERE */}

      <dialog id="save_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box flex flex-col items-center bg-white rounded-lg shadow-lg max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <h3 className="font-bold text-lg mb-4">Save Finalize</h3>
          <p className="text-center mb-6">Fill out the fields below to finalize this note!</p>

          <form
            action={async () => {
              (document.getElementById('save_modal') as HTMLDialogElement).close();
              await saveNote();
              redirect('/dashboard');
            }}
            method="post"
            className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 relative"
          >
            {/* Left Side */}
            <div className="flex flex-col space-y-4 md:pr-8">
              <div className="form-control">
                <label htmlFor="title" className="label">
                  <span className="label-text text-black">Title</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="input input-bordered w-full text-black"
                  placeholder="Enter a title"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-control text-black">
                <label htmlFor="visibility" className="label">
                  <span className="label-text text-black">Visibility</span>
                </label>
                <div className="flex items-center text-black pl-1">
                  <span className="mr-2">Private</span>
                  <input
                    type="checkbox"
                    className="toggle border-blue-500 bg-blue-500 [--tglbg:white] hover:bg-blue-700"
                    checked={isPublic}
                    onChange={handleSwitchChange}
                  />
                  <span className="ml-2">Public</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-full border-l border-gray-300 mx-auto md:mx-0"></div>

            {/* Right Side */}
            <div className="flex flex-col space-y-4 md:pl-8">
              <div className="form-control text-black">
                <label htmlFor="backgroundColor" className="label">
                  <span className="label-text text-black">Background Color</span>
                </label>
                <ColorPicker color={color} hideAlpha onChange={(color) => setColor(color.hex)} />
              </div>
            </div>

            {/* Buttons */}
            <div className="col-span-full flex flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 mt-6 justify-center">
              <button
                type="button"
                className="btn btn-error w-full sm:w-[100px] py-2 px-4 rounded-lg text-black bg-red-600 hover:bg-red-700"
                onClick={() => (document.getElementById('save_modal') as HTMLDialogElement).close()}
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
            <p className="col-span-full text-left text-sm mt-4">*Don’t worry you can edit this later.</p>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>





    </div>
  );
};

export default NewNoteEditor;