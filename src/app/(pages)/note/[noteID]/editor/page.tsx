import NoteEditor from './NoteEditor';
import { getUserID } from '@/actions/GetUser';

const NoteEditorPage = async () => {
  const userID = await getUserID();

  return <NoteEditor userID={userID!} />;
};

export default NoteEditorPage;
