import { BookmarkClient } from "../../src/scopes/bookmark/bookmarkClient";
import { DeckClient } from "../../src/scopes/deck/deckClient";
import { NotesClient } from "../../src/scopes/notes/notesClient";
import { GeneralClient } from "../../src/scopes/general/generalClient"
import { AuthClient } from "../../src/scopes/auth/authClient"

function setupBookmarkClient(): BookmarkClient{
    return new BookmarkClient(
        process.env.NC_SERVER,
        process.env.NC_USER,
        process.env.NC_PASSWORD
    );
}

function setupDeckClient(): DeckClient{
    return new DeckClient(
        process.env.NC_SERVER,
        process.env.NC_USER,
        process.env.NC_PASSWORD
    );
}

function setupNotesClient(): NotesClient{
    return new NotesClient(
        process.env.NC_SERVER,
        process.env.NC_USER,
        process.env.NC_PASSWORD
    );
}

function setupGeneralClient(): GeneralClient{
    return new GeneralClient(
        process.env.NC_SERVER,
        process.env.NC_USER,
        process.env.NC_PASSWORD
    );
}

function setupAuthClient(): AuthClient{
    return new AuthClient(
        process.env.NC_SERVER,
        process.env.NC_USER,
        process.env.NC_PASSWORD
    );
}

export {setupBookmarkClient, setupDeckClient, setupNotesClient, setupGeneralClient, setupAuthClient}