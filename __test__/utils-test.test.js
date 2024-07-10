import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadNotes, SaveNote, deleteNote, deleteMultipleNotes, editNote, notePress } from '../src/utils/utility';

// Mock Toast and navigation for testing
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('noteUtils', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });

  test('loadNotes should return an empty array if no notes are stored', async () => {
    const notes = await loadNotes();
    expect(notes).toEqual([]);
  });

  test('SaveNote should add a new note and store it', async () => {
    const setNotes = jest.fn();
    const setNewNote = jest.fn();
    const navigation = { navigate: jest.fn() };
    await SaveNote('Test Title', 'Test Body', setNotes, setNewNote, navigation);
    
    const notes = await loadNotes();
    expect(notes.length).toBe(1);
    expect(notes[0].title).toBe('Test Title');
  });

  test('deleteNote should remove a note by id', async () => {
    const setNotes = jest.fn();
    const navigation = { navigate: jest.fn() };

    // Add a note to delete
    await SaveNote('Test Title', 'Test Body', setNotes, jest.fn(), navigation);
    let notes = await loadNotes();
    const noteId = notes[0].id;

    await deleteNote(noteId, setNotes, navigation);
    notes = await loadNotes();
    expect(notes.length).toBe(0);
  });

  test('editNote should update a note by id', async () => {
    const navigation = { navigate: jest.fn() };

    // Add a note to edit
    await SaveNote('Test Title', 'Test Body', jest.fn(), jest.fn(), navigation);
    let notes = await loadNotes();
    const noteId = notes[0].id;

    await editNote(noteId, 'Updated Title', 'Updated Body', navigation);
    notes = await loadNotes();
    expect(notes[0].title).toBe('Updated Title');
    expect(notes[0].body).toBe('Updated Body');
  });

  test('deleteMultipleNotes should remove multiple notes by ids', async () => {
    const setNotes = jest.fn();

    // Add multiple notes
    await SaveNote('Test Title 1', 'Test Body 1', setNotes, jest.fn(), jest.fn());
    await SaveNote('Test Title 2', 'Test Body 2', setNotes, jest.fn(), jest.fn());

    let notes = await loadNotes();
    const noteIds = notes.map(note => note.id);

    await deleteMultipleNotes(noteIds, setNotes);
    notes = await loadNotes();
    expect(notes.length).toBe(0);
  });

  test('notePress should navigate to note or select multiple notes', () => {
    const navigation = { navigate: jest.fn() };
    const setSelectedNotes = jest.fn();
    const notes = [{ id: '1', title: 'Test Title', body: 'Test Body' }];

    // Single selection
    notePress('1', false, navigation, notes, [], setSelectedNotes);
    expect(navigation.navigate).toHaveBeenCalledWith('Current Note', { note: notes[0] });

    // Multiple selection
    notePress('1', true, navigation, notes, [], setSelectedNotes);
    expect(setSelectedNotes).toHaveBeenCalledWith(['1']);
  });
});
