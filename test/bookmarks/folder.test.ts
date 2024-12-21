import { expect, test, describe } from "bun:test";
import { setupBookmarkClient } from "../util/util";

test("Get full folder tree", () => {
    const client = setupBookmarkClient()
    const response = client.getFolderTree()
    expect(response)
});

describe("Create, Update, Get and Delete Folder", () => {
    const client = setupBookmarkClient()
    let folderId: number

    test("Create Folder", async () => {
        const payload = {
            title: "Test Folder"
        }
        const response = await client.createFolder(payload)
        expect(response.title).toBe(payload.title)
        folderId = response.id
    })

    test("Update Folder", async () => {
        const payload = {
            title: "Updated Folder"
        }
        const response = await client.updateFolder(folderId, payload)
        expect(response.title).toBe(payload.title)
    })

    test("Get Folder", async () => {
        const response = await client.getFolder(folderId)
        expect(response.title).toBe("Updated Folder")
    })

    test("Delete Folder", async () => {
        const response = await client.deleteFolder(folderId)
        expect(response).toBe('success')
    })
});

describe("Create a hash of a folder and track it", () => {
    const client = setupBookmarkClient()
    let folderId: number
    let bookmarkId: number
    let hash: string

    test("Create Folder", async () => {
        const payload = {
            title: "Test Folder"
        }
        const response = await client.createFolder(payload)
        folderId = response.id
    })

    test("Create Bookmark", async () => {
        const payload = {
            url: "https://spagl-media.de/",
            title: "Some title",
            folders: [folderId]
        }
        const response = await client.createBookmark(payload)
        expect(response.folders).toContain(folderId)
        bookmarkId = response.id
    })

    test("Get Folder Hash", async () => {
        const response = await client.hashFolder(folderId)
        hash = response
    });

    test("Update Bookmark", async () => {
        const payload = {
            title: "Updated title"
        }
        const response = await client.updateBookmark(bookmarkId, payload)
        expect(response.title).toBe(payload.title)
    })

    test("Retrieve and compare hash", async () => {
        const response = await client.hashFolder(folderId)
        expect(response).not.toBe(hash)
    })

    test("Delete Folder", async () => {
        const response = await client.deleteFolder(folderId)
        expect(response).toBe('success')
    })
})

describe("Get folder count", () => {
    const client = setupBookmarkClient()
    let folderId: number

    test("Create Folder", async () => {
        const payload = {
            title: "Test Folder"
        }
        const response = await client.createFolder(payload)
        folderId = response.id
    })

    test("Get Folder Count", async () => {
        const response = await client.getFolderContentCount(folderId)
        expect(response).toBe(0)
    })

    test("Delete Folder", async () => {
        const response = await client.deleteFolder(folderId)
        expect(response).toBe('success')
    })
})

describe("Add and remove bookmark from folder",async  ()=> {
    const client = setupBookmarkClient()
    let folderId: number
    let bookmarkId: number

    test("Create Folder", async () => {
        const payload = {
            title: "Test Folder"
        }
        const response = await client.createFolder(payload)
        folderId = response.id
    })

    test("Create Bookmark", async () => {
        const payload = {
            url: "https://spagl-media.de/",
            title: "Some title",
        }
        const response = await client.createBookmark(payload)
        bookmarkId = response.id
    })

    test("Add Bookmark to Folder", async () => {
        const response = await client.addBookmarkToFolder(folderId, bookmarkId)
        expect(response).toBe('success')
    })

    test("Get Folder Content Count", async () => {
        const response = await client.getFolderContentCount(folderId)
        expect(response).toBe(1)
    })

    test("Remove Bookmark from Folder", async () => {
        const response = await client.deleteBookmarkFromFolder(folderId, bookmarkId)
        expect(response).toBe('success')
    })


    test("Delete Folder", async () => {
        const response = await client.deleteFolder(folderId)
        expect(response).toBe('success')
    })
})

describe("Folder content order scenarios", async () => {
    const client = setupBookmarkClient()
    let folderId: number
    let bookmarkId1: number
    let bookmarkId2: number
    let bookmarkId3: number

    test("Create Folder", async () => {
        const payload = {
            title: "Test Folder"
        }
        const response = await client.createFolder(payload)
        folderId = response.id
    })

    test("Create Bookmarks", async () => {
        const payload1 = {
            url: "https://spagl-media.de/",
            title: "Some title",
            folders: [folderId]
        }
        const response1 = await client.createBookmark(payload1)
        bookmarkId1 = response1.id

        const payload2 = {
            url: "https://spagl-media.de/1",
            title: "Some title",
            folders: [folderId]
        }
        const response2 = await client.createBookmark(payload2)
        bookmarkId2 = response2.id

        const payload3 = {
            url: "https://spagl-media.de/2",
            title: "Some title",
            folders: [folderId]
        }
        const response3 = await client.createBookmark(payload3)
        bookmarkId3 = response3.id
    })

    test("Get Folder Content", async () => {
        const response = await client.getFolderContentOrder(folderId)
        expect(response[0].id).toBe(bookmarkId1)
        expect(response[1].id).toBe(bookmarkId2)
        expect(response[2].id).toBe(bookmarkId3)
    })



    test("Move Bookmark 3 to first position", async () => {
        const payload = {data:[
            {
                type: 'bookmark',
                id: bookmarkId3
            },
            {
                type: 'bookmark',
                id: bookmarkId1
            },
            {
                type: 'bookmark',
                id: bookmarkId2
            }
        ]}
        const response = await client.setFolderContentOrder(folderId, payload )
        expect(response).toBe('success')
    })

    test("Get Folder Content", async () => {
        const response = await client.getFolderContentOrder(folderId)
        expect(response[0].id).toBe(bookmarkId3)
        expect(response[1].id).toBe(bookmarkId1)
        expect(response[2].id).toBe(bookmarkId2)
    })

    test("Get Folder content", async () => {
        const response = await client.getFolderContent(folderId)
        expect(response.length).toBe(3)
    })

    test("Delete Folder", async () => {
        const response = await client.deleteFolder(folderId)
        expect(response).toBe('success')
    })
})