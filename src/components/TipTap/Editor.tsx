"use client";

import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import MenuBar from "@/components/TipTap/MenuBar";

// Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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

const NoteEditorContent = ({ noteID, editorID }: { noteID: string, editorID: string }) => {
  const [noteData, setNoteData] = useState<string>("");


  useEffect(() => {
    const fetchNoteData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/note/${noteID}`, { cache: "no-store" });
        if (!response.ok) {
          throw new Error('Failed to fetch note data');
        }
        const data = await response.json();
        setNoteData(data.content || "");
      } catch (error) {
        console.error('Error fetching note data:', error);
      }
    };

    fetchNoteData();
  }, [noteID]);

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'focus:outline-none prose',
      },
    },
    content: noteData === "" ? "<p>Start Here</p>" : noteData,
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

  const notify = () => {
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
  };

  return (
    <div className='bg-[#101720] w-screen h-screen relative'>
      <div className='navbar z-50 relative flex justify-between items-center p-4'>
        <div className='navbar-start'>
          <h1 className='text-white text-2xl'>Note Editor</h1>
        </div>
        <div className='navbar-end'>
          <button
            onClick={() => {
              fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/note/${noteID}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: noteID, content: editor?.getHTML(), }),
              })
                .then(() => notify())
                .catch((error) => console.error('Error saving note:', error));
            }}
            className='bg-yellow-300 text-black font-Grey_Qo px-4 py-2 rounded-lg'
          >
            Save
          </button>
        </div>
      </div>

      <div className='pt-5 bg-[#101720] z-50 relative'>
        <MenuBar editor={editor} />
      </div>

      <div className="absolute inset-0 flex justify-center items-center p-4 z-0">
        <div className="bg-yellow-300 w-full max-w-lg h-80 flex rounded-lg shadow-md p-5">
          <EditorContent
            editor={editor}
            className='bg-white h-full w-full rounded-lg p-4 overflow-auto'
          />
        </div>
      </div>
      <ToastContainer limit={5} pauseOnFocusLoss />
    </div>
  );
};

export default NoteEditorContent;