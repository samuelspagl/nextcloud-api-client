// ------------------------------
//             Models
// ------------------------------


export interface Note {
    /**
     * Every note has a unique identifier which is created by the server.
     * It can be used to query and update a specific note.
     * @since API version 1.0
     * @readonly
     */
    id: number;

    /**
     * The note's entity tag (ETag) indicates if a note's attribute has changed.
     * It can be used to detect if the local note has to be updated from the server.
     * @since API version 1.2
     * @readonly
     */
    etag: string;

    /**
     * Indicates if the note is read-only. This is `true` if the note is shared by another user without editing permissions.
     * If `true`, all read/write attributes become read-only, except for the `favorite` attribute.
     * @since API version 1.2
     * @readonly
     */
    readonly: boolean;

    /**
     * Notes can contain arbitrary text, formatted with Markdown. 
     * Clients should use Markdown carefully as not all markup may be supported.
     * @since API version 1.0
     */
    content: string;

    /**
     * The note's title is also used as the filename for the note's file.
     * Some special characters are removed and a sequential number is added if a note with the same title exists.
     * @since API version 1.0
     */
    title: string;

    /**
     * Every note is assigned to a category. By default, the category is an empty string (uncategorized).
     * Categories are mapped to folders, and sub-categories can be created using `/` as a delimiter.
     * @since API version 1.0
     */
    category: string;

    /**
     * If a note is marked as favorite, it is displayed at the top of the notes list. Default is `false`.
     * @since API version 1.0
     */
    favorite: boolean;

    /**
     * Unix timestamp for the last modified date/time of the note.
     * If not provided during note creation or content update, the current time is used.
     * @since API version 1.0
     */
    modified: number;
}

export interface NotesSettings {
    /**
     * Path to the folder, where note's files are stored in Nextcloud.
     * The path must be relative to the user folder. Default is the localized string 'Notes'.
     * @since API version 1.2
     */
    notesPath: string;

    /**
     * Newly created note's files will have this file suffix.
     * For API version 1.2, only the values `.txt` or `.md` are allowed.
     * Since API version 1.3, custom suffixes can also be chosen. Default is `.txt`.
     * @since API version 1.2
     */
    fileSuffix: '.txt' | '.md' | string; // string to support custom suffixes from version 1.3
}



// ------------------------------
//             Requests
// ------------------------------

export interface NotesSearchParams {
    /**
     * Filter the result by category name, e.g., ?category=recipes.
     * Notes with a different category are excluded from the result.
     * @since API version 1.1
     */
    category?: string;

    /**
     * Fields to be excluded from the response, separated by commas.
     * E.g., ?exclude=content,title. This reduces transferred data size.
     * @since API version 1.0
     */
    exclude?: string;

    /**
     * Only notes that haven't changed before this Unix timestamp are included in the response.
     * The result contains only the `id` attribute for such notes.
     * @since API version 1.0
     */
    pruneBefore?: number;

    /**
     * Limits the number of full notes in the response to the given number.
     * If there are more notes, the result is chunked, and a cursor is provided to fetch the next chunk.
     * @since API version 1.2
     */
    chunkSize?: number;

    /**
     * A cursor string for fetching the next chunk of notes when using chunkSize.
     * You should use the cursor value from the previous request's X-Notes-Chunk-Cursor header.
     * Don't use this parameter for the first chunk request.
     * @since API version 1.2
     */
    chunkCursor?: string;

    /**
     * HTTP header used to reduce transferred data size by providing the ETag value from the previous response.
     * The ETag is used for cache validation.
     * @since API version 1.0
     */
    'If-None-Match'?: string; // This is an HTTP header, not a query parameter, but included here for consistency
}

export interface NotePayload {
    /**
     * Notes can contain arbitrary text, formatted with Markdown. 
     * Clients should use Markdown carefully as not all markup may be supported.
     * @since API version 1.0
     */
    content?: string;

    /**
     * The note's title is also used as the filename for the note's file.
     * Some special characters are removed and a sequential number is added if a note with the same title exists.
     * @since API version 1.0
     */
    title?: string;

    /**
     * Every note is assigned to a category. By default, the category is an empty string (uncategorized).
     * Categories are mapped to folders, and sub-categories can be created using `/` as a delimiter.
     * @since API version 1.0
     */
    category?: string;

    /**
     * If a note is marked as favorite, it is displayed at the top of the notes list. Default is `false`.
     * @since API version 1.0
     */
    favorite?: boolean;
}

export interface NotesSettingsPayload {
    /**
     * Path to the folder, where note's files are stored in Nextcloud.
     * The path must be relative to the user folder. Default is the localized string 'Notes'.
     * @since API version 1.2
     */
    notesPath?: string;

    /**
     * Newly created note's files will have this file suffix.
     * For API version 1.2, only the values `.txt` or `.md` are allowed.
     * Since API version 1.3, custom suffixes can also be chosen. Default is `.txt`.
     * @since API version 1.2
     */
    fileSuffix?: '.txt' | '.md' | string; // string to support custom suffixes from version 1.3
}