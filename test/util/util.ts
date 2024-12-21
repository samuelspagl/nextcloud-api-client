import { BookmarkClient } from "../../src/scopes/bookmark/bookmarkClient";
import { DeckClient } from "../../src/scopes/deck/deckClient";

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

export {setupBookmarkClient, setupDeckClient}