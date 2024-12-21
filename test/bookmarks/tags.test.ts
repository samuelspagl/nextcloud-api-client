import { expect, test, describe } from "bun:test";
import { setupBookmarkClient } from "../util/util";

describe("Create, Fetch, Update and Delete Tags", () =>{
    const client = setupBookmarkClient()
    let bookmarkId = 0

    test("Create Bookmark with specific tag", async () => {
        const payload = {
            url: "https://spagl-media.de/",
            tags: ["test"]
        }
        const response = await client.createBookmark(payload)
        expect(response.tags).toEqual(payload.tags)
        bookmarkId = response.id
    })

    test("Fetching all tags should contain 'test'", async () => {
        const response = await client.getTags()
        expect(response).toContain('test')
    })

    test("Rename tag from 'test' to 'test2'", async () => {
        const response = await client.renameTag('test', 'test2')
        expect(response).toBe('success')
    })

    test("Fetching all tags should contain 'test2'", async () => {
        const response = await client.getTags()
        expect(response).toContain('test2')
    })

    test("Tag of bookmark should be 'test2'", async() => {
        const response = await client.getBookmark(bookmarkId)
        expect(response.tags).toContain('test2')
    })

    test("Delete tag 'test2'", async () => {
        const response = await client.deleteTag('test2')
        expect(response).toBe('success')
    })

    test("Fetching all tags should not contain 'test2'", async () => {
        const response = await client.getTags()
        expect(response).not.toContain('test2')
    })

    test("Tag of bookmark should not be 'test2'", async() => {
        const response = await client.getBookmark(bookmarkId)
        expect(response.tags).not.toContain('test2')
    })

    test("Delete Bookmark", async () => {
        const response = await client.deleteBookmark(bookmarkId)
        expect(response).toBe('success')
    })
})