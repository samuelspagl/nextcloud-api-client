import { BookmarkClient } from "../../src/index";
import { DeckClient } from "../../src/index";
import { NotesClient } from "../../src/index";
import { GeneralClient } from "../../src/index"
import { AuthClient, oAuthClient } from "../../src/index"

function getEnvironmentVariable(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is not set.`);
    }
    return value;
}

function setupBookmarkClient(): BookmarkClient{
    return new BookmarkClient(
        getEnvironmentVariable("NC_SERVER"),
        getEnvironmentVariable("NC_USER"),
        getEnvironmentVariable("NC_USER_PASSWORD")
    );
}

function setupDeckClient(): DeckClient{
    return new DeckClient(
        getEnvironmentVariable("NC_SERVER"),
        getEnvironmentVariable("NC_USER"),
        getEnvironmentVariable("NC_USER_PASSWORD")
    );
}

function setupNotesClient(): NotesClient{
    return new NotesClient(
        getEnvironmentVariable("NC_SERVER"),
        getEnvironmentVariable("NC_USER"),
        getEnvironmentVariable("NC_USER_PASSWORD")
    );
}

function setupGeneralClient(): GeneralClient{
    return new GeneralClient(
        getEnvironmentVariable("NC_SERVER"),
        getEnvironmentVariable("NC_USER"),
        getEnvironmentVariable("NC_USER_PASSWORD")
    );
}

function setupAuthClient(): AuthClient{
    return new AuthClient(
        getEnvironmentVariable("NC_SERVER"),
        getEnvironmentVariable("NC_USER"),
        getEnvironmentVariable("NC_USER_PASSWORD")
    );
}

function setupOAuthClient(): oAuthClient{
    return new oAuthClient(
        getEnvironmentVariable("NC_SERVER"),
        getEnvironmentVariable("NC_CLIENT_ID"),)
}

export {setupAuthClient, setupBookmarkClient, setupDeckClient, setupNotesClient, setupGeneralClient, setupOAuthClient, getEnvironmentVariable}