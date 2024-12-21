import { expect, test, describe } from "bun:test";
import { setupBookmarkClient } from "../util/util";

describe("Create, Get, Update and Delete Shares", () => {

    const client = setupBookmarkClient()
    let shareId: number
    const shareeUserId = "testuser2"
    let folderId: number

    test("Create Folder", async () => {
        const payload = {
            title: "Test Folder"
        }
        const response = await client.createFolder(payload)
        folderId = response.id
    })

    test("Create folder share", async () => {
        const payload = {
            participant: shareeUserId,
            type: 0,
            canWrite: false,
            canShare: false
        }
        const response = await client.createFolderShare(folderId, payload)
        shareId = response.id
    })

    test("Get folder share", async () => {
        const response = await client.getFolderShares(folderId)
        expect(response[0].id).toBe(shareId)
    })

    test("Update folder share", async () => {
        const payload = {
            canWrite: true,
            canShare: false
        }
        const response = await client.updateFolderShare(shareId, payload)
        expect(response.canWrite).toBe(true)
    })

    test("Get Share", async () => {
        const response = await client.getShare(shareId)
        expect(response.id).toBe(shareId)
        expect(response.canWrite).toBe(true)
    })

    test("Delete Share", async () => {
        const response = await client.deleteFolderShare(shareId)
        expect(response).toBe('success')
    })

    test("Delete Folder", async () => {
        const response = await client.deleteFolder(folderId)
        expect(response).toBe('success')
    })
})