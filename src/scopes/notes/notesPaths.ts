const notesPrefix = '/index.php/apps/notes/api/v1'


export const pathNotes = `${notesPrefix}/notes`
export const pathNotesById = (noteId: number) => `${notesPrefix}/notes/${noteId}`
export const pathNotesSettings = `${notesPrefix}/settings`