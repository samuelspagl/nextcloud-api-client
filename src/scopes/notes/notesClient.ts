import { NotesSearchParams, Note, NotePayload, NotesSettings, NotesSettingsPayload } from "../../types/notesTypes";
import { BaseApiClient } from "../../util/baseClient";
import { pathNotes, pathNotesById, pathNotesSettings } from "./notesPaths";

export class NotesClient extends BaseApiClient{

    async queryNotes(query?: NotesSearchParams): Promise<Note[]>{
        return await this.get<Note[], NotesSearchParams>(pathNotes, query)
    }

    async getNote(noteId: number): Promise<Note>{
        return await this.get<Note, null>(pathNotesById(noteId))
    }

    async createNote(payload: NotePayload): Promise<Note>{
        return await this.post<NotePayload, Note>(pathNotes, payload)
    }

    async updateNote(noteId: number, payload: NotePayload): Promise<Note>{
        return await this.put<NotePayload, Note>(pathNotesById(noteId), payload)
    }

    async deleteNote(noteId: number): Promise<void>{
        return await this.delete<void>(pathNotesById(noteId))
    }

    async getSettings(): Promise<NotesSettings>{
        return await this.get<NotesSettings, null>(pathNotesSettings)
    }

    async updateSettings(payload: NotesSettingsPayload): Promise<NotesSettings>{
        return await this.put<NotesSettingsPayload, NotesSettings>(pathNotesSettings, payload)
    }
}