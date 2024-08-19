import { FaItalic, FaBold, FaStrikethrough, FaListUl, FaListOl, FaQuoteRight } from "react-icons/fa";
import { IoArrowUndoSharp, IoArrowRedoSharp } from "react-icons/io5";
import { Editor } from "@tiptap/react";

interface MenuBarProps {
  editor: Editor | null;
}

type Level = 1 | 2 | 3 | 4 | 5 | 6;

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className='p-2 mx-2 mt-0.5 flex flex-wrap bg-[#202532] rounded-3xl'>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`m-1 p-2 text-white rounded ${editor.isActive('bold') ? 'bg-gray-700' : ''}`}
      >
        <FaBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`m-1 p-2 text-white rounded ${editor.isActive('italic') ? 'bg-gray-700' : ''}`}
      >
        <FaItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`m-1 p-2 text-white rounded ${editor.isActive('strike') ? 'bg-gray-700' : ''}`}
      >
        <FaStrikethrough />
      </button>

      {[1, 2, 3, 4, 5, 6].map((level) => (
        <button
          key={level}
          onClick={() => {
            const l = level as Level
            editor.chain().focus().toggleHeading({ level: l }).run()}
          }
          className={`m-1 p-2 text-white rounded ${editor.isActive('heading', { level }) ? 'bg-gray-700' : ''}`}
        >
          <h3>H{level}</h3>
        </button>
      ))}

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`m-1 p-2 text-white rounded ${editor.isActive('bulletList') ? 'bg-gray-700' : ''}`}
      >
        <FaListUl />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`m-1 p-2 text-white rounded ${editor.isActive('orderedList') ? 'bg-gray-700' : ''}`}
      >
        <FaListOl />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`m-1 p-2 text-white rounded ${editor.isActive('blockquote') ? 'bg-gray-700' : ''}`}
      >
        <FaQuoteRight />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="m-1 p-2 text-white rounded"
      >
        <IoArrowUndoSharp />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="m-1 p-2 text-white rounded"
      >
        <IoArrowRedoSharp />
      </button>

      <input
        className="m-1 p-2 rounded text-white bg-gray-700 border-none cursor-pointer h-10"
        type="color"
        onInput={(event) => {
          const target = event.target as HTMLInputElement;
          console.log(target.value);
          editor.chain().focus().setColor(target.value).run();
        }}
        value={editor.getAttributes('textStyle').color}
      />
    </div>
  );
}

export default MenuBar;
