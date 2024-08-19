"use client";

import { useCallback, useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
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

const NoteEditorContent = ({ noteID, editorID }: { noteID: string, editorID: string }) => {
  const [noteData, setNoteData] = useState<string>("<p>Loading...</p>");
  const [title, setTitle] = useState<string>("Untitled Document");


  useEffect(() => {
    const fetchNoteData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/note/${noteID}`, { cache: "no-store" });
        if (!response.ok) {
          throw new Error('Failed to fetch note data');
        }
        const data = await response.json();
        setNoteData(data.body);
        setTitle(data.title);

      } catch (error) {
        console.error('Error fetching note data:', error);
      }
    };

    fetchNoteData();
  }, [noteID]);

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'focus:outline-none prose',
      },
    },
    content: noteData,
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

  const handleInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value || "Untitled Document";
    setTitle(newTitle);

    if (newTitle.length === 0) {
      event.target.style.width = "170px";
    } else {
      event.target.style.width = `${(newTitle.length + 3) * 8}px`;
    }
  }, []);



  const saveNote = useCallback(async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/note/${noteID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: noteID, title, content: editor?.getHTML(), editorID: editorID }),
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
  }, [noteID, editorID, editor, title]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      saveNote();
    }
  }, [saveNote]);


  useEffect(() => {
    if (editor) {
      editor.commands.setContent(noteData);
    }
  }, [editor, noteData]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown as any);
    return () => document.removeEventListener('keydown', handleKeyDown as any);
  }, [handleKeyDown]);


  return (
    <div className='bg-[#101720] w-screen h-screen relative'>
      <div className='navbar z-50 relative flex justify-between items-center p-4'>
        <div className='navbar-start'>
          <input
            type="text"
            className="rounded h-[50px] min-w-[20px] pl-1 pr-1 text-white bg-transparent text-lg border-solid border-2 focus:outline-none focus:border-yellow-300"
            value={title}
            onInput={handleInput}
            placeholder="Untitled Document"
          />
        </div>
        <div className='navbar-end'>
          <button
            onClick={saveNote}
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