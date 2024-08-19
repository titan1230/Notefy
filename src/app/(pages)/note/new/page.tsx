import { Suspense } from 'react';
import NewNoteEditor from '@/components/TipTap/NewNoteEditor';
import { auth } from '@/auth';

const NoteEditor = async () => {

  const session = await auth();

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
      <NewNoteEditor editorID={session?.user?.id!} />
    </Suspense>
  );
};

export default NoteEditor;
