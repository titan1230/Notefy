interface NoteCardProps {
  title: string;
  bgColor: string;
  noteId: string;
}

const NoteCard: React.FC<NoteCardProps> = ({ title, bgColor, noteId }) => {

  return (
    <a
      href={`/note/${noteId}`}
      className= {`flex items-center justify-center p-4 rounded-lg md:w-[150px] w-full h-[150px] aspect-square`}
      style={{ backgroundColor: bgColor }}
    >
      <h3 className="text-sm font-bold text-center truncate">{title}</h3>
    </a>
  );
};

export default NoteCard;
