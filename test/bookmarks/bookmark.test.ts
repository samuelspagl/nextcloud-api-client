import { expect, test, describe } from "bun:test";
import { setupBookmarkClient } from "../util/util";

test("Query Bookmarks", async () => {
    const client = setupBookmarkClient()
        const response = await client.queryBookmarks()
        expect(response)
});


describe("Create, Update, Get and Delete Bookmark", () => {
    const client = setupBookmarkClient()

    let bookmarkId: number

    test("Create Bookmark", async () => {
        const payload = {
            url: "https://spagl-media.de/",
            title: "spagl_media",
            description: "This is a description"
        }
        const response = await client.createBookmark(payload)

        expect(response.url).toBe(payload.url)
        expect(response.title).toBe(payload.title)
        expect(response.description).toBe(payload.description)

        bookmarkId = response.id
    });

    test("Update Bookmark", async () => {
        const payload = {
            description: "This is an updated description"
        }
        const response = await client.updateBookmark(bookmarkId, payload)
        expect(response.description).toBe(payload.description)
    });

    test("Get Bookmark", async () => {
        const response = await client.getBookmark(bookmarkId)
        expect(response.description).toBe("This is an updated description")
    });

    test("Delete Bookmark", async () => {
        const response = await client.deleteBookmark(bookmarkId)
        expect(response).toBe('success')
    })
});

test("Get Bookmark Image", async () => {
    const client = setupBookmarkClient()

    const response = await client.getBookmarkImage(182)
    expect(response).toBeInstanceOf(Blob)
    const fileUrl = URL.createObjectURL(response);
})

test("Get Bookmark Favicon", async () => {
    const client = setupBookmarkClient()

    const response = await client.getBookmarkFavicon(181)
    expect(response).toBeInstanceOf(Blob)
    const fileUrl = URL.createObjectURL(response);
});

describe("Increase click count on bookmark", () => {
    const client = setupBookmarkClient()
    let bookmarkUrl = ""
    let bookmarkId = 0

    test("Create Bookmark", async () => {
        const payload = {
            url: "https://spagl-media.de/",
            title: "spagl_media",
            description: "This is a description"
        }
        const response = await client.createBookmark(payload)

        expect(response.url).toBe(payload.url)
        expect(response.title).toBe(payload.title)
        expect(response.description).toBe(payload.description)

        bookmarkUrl = response.url
        bookmarkId = response.id
    });

    test("Click Bookmark", async () => {
        const response = await client.clickBookmark(bookmarkUrl)
        expect(response).toBe('success')
    });

    test("Get Bookmark and check click count", async () => {
        const response = await client.getBookmark(bookmarkId)

        expect(response.clickcount).toBe(1)
    })

    test("Delete Bookmark", async () => {
        const response = await client.deleteBookmark(bookmarkId)
        expect(response).toBe('success')
    })
})
