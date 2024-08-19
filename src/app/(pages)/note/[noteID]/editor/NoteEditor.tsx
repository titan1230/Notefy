"use client";

import { Suspense, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import NoteEditorContent from '@/components/TipTap/Editor';

const NoteEditor = ({ userID }: { userID: string }) => {
  const { noteID } = useParams();
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      if (!noteID) return;

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/note/${noteID}`, { cache: "no-store" });

      const data = await res.json();

      if (data.creatorID !== userID) {
        router.push(`/note/${noteID}`);
      }
    };

    checkAccess();
  }, [noteID, userID, router]);


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
