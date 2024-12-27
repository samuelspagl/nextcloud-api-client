import { DeckClient } from './scopes/deck/deckClient'
import { BookmarkClient } from './scopes/bookmark/bookmarkClient'
import { NotesClient } from './scopes/notes/notesClient'
import { GeneralClient } from './scopes/general/generalClient'

export class NextcloudClient{
    deck: DeckClient
    bookmark: BookmarkClient
    notes: NotesClient
    general: GeneralClient
    
    constructor(baseUrl: string ,username: string, password: string) {
        this.deck = new DeckClient(baseUrl, username, password)
        this.bookmark = new BookmarkClient(baseUrl, username, password)
        this.notes = new NotesClient(baseUrl, username, password)
        this.general = new GeneralClient(baseUrl, username, password)
      }

}