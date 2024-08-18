"use client";

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import NoteEditorContent from '@/components/TipTap/Editor';

const NoteEditor = ({ userID }: { userID: string }) => {
  const { noteID } = useParams();

  if (!noteID) {
    return <p>Loading...</p>;
  }

  return (
    <Suspense
      fallback={
        <div className="relative min-h-screen bg-[#101720]">
          <div className="absolute inset-0 flex justify-center items-center">
            <span className="loading loading-spinner text-secondary"></span>
          </div>
        </div>
      }
    >
      <NoteEditorContent noteID={noteID as string} editorID={userID} />
    </Suspense>
  );
};

export default NoteEditor;
