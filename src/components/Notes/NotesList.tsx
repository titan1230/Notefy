import React, { useEffect, useState } from 'react';
import NoteCard from './NoteCard';

interface Note {
  _id: string;
  title: string;
  body: string;
  visibility: string;
  "bg-color": string;
}

async function fetchNotes(userID: string): Promise<Note[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/notes/${userID}`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }
  const data = await response.json();
  return data.notes;
}

const NotesList: React.FC<{ userID: string, refreshKey: number }> = ({ userID, refreshKey }) => {
  const [notes, setNotes] = useState<Note[] | null>(null);

  useEffect(() => {
    fetchNotes(userID).then(setNotes).catch(console.error);
  }, [userID, refreshKey]);

  if (!notes) {
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        <span className='loading loading-spinner'></span>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="inset-0 flex justify-center items-center">
        <p className="text-black mt-8">
          You have created no notes. Get started by clicking the button above!
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {notes.map((note) => (
        <li key={note._id} className="flex justify-center">
          <NoteCard title={note.title} bgColor={note["bg-color"]} noteId={note._id} />
        </li>
      ))}
    </ul>
  );
};

export default NotesList;
