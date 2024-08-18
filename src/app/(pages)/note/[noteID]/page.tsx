import React, { Suspense } from 'react';

interface PropInterface {
  params: {
    noteID: string;
  };
}

export async function generateMetadata({ params }: { params: { noteID: string } }) {
  const noteContent = await fetchNoteContent(params.noteID);

  if (noteContent.error) {
    return {
      title: "Note not found | Notefy",
      description: "The note you requested is either private or does not exist.",
    };
  }

  return {
    title: `${noteContent.title} | Notefy`,
    description: noteContent.body.slice(0, 160),
  };
}

async function fetchNoteContent(noteID: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/note/${noteID}`, { cache: "no-store" });

  const data = await res.json();
  return data;
}

const NoteContent = async ({ noteID }: { noteID: string }) => {
  const noteContent = await fetchNoteContent(noteID);

  if (noteContent.error) {
    return (
      <div className='relative min-h-screen bg-[#101720]'>
        <div className="absolute inset-0 flex justify-center items-center">
          <p className="text-lg text-center text-white">The note you requested is either private or does not exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-[#101720]">
      <h2 className="absolute top-4 left-4 bg-slate-70 text-white font-Grey_Qo p-2 rounded-md text-2xl font-semibold min-w-72 ">
        {noteContent.title}
      </h2>

      <div className="absolute inset-0 flex justify-center items-center">
        <div className="bg-yellow-300 w-80 h-80 flex rounded-lg shadow-md p-5">
          <textarea readOnly className="bg-yellow-300 w-full border-0 shadow-none resize-none h-full text-lg break-words focus:outline-none">
            {noteContent.body}
          </textarea>
        </div>
      </div>
    </div>
  );
};

const Note = ({ params }: PropInterface) => {
  return (
    <div className='bg-base-100'>
      <Suspense fallback={(
        <div className='relative min-h-screen bg-[#101720]'>
          <div className="absolute inset-0 flex justify-center items-center">
            <span className="loading loading-spinner text-secondary"></span>
          </div>
        </div>
      )}>
        <NoteContent noteID={params.noteID} />
      </Suspense>
    </div>
  );
};

export default Note;
