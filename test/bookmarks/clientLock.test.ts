import { expect, test, describe } from "bun:test";
import { setupBookmarkClient } from "../util/util";

describe("Create and release client lock", () => {
    const client = setupBookmarkClient()

    test("Create client lock", async () => {
        const response = await client.aquireClientLock()
        expect(response).toBe('success')
    })

    test.todo("Try to change something while lock is active", async () => {
        try{
            await client.createFolder({title: "Test"})
            expect(true).toBe(false)
        }
        catch(e){
            expect(e.statusCode).toBe(423)
        }
    })

    test("Release client lock", async () => {
        const response = await client.deleteClientLock()
        expect(response).toBe('success')
    })

    test.todo("Try to change something after lock is released", async () => {
        const response = await client.createFolder({title: "Test"})
        expect(response.title).toBe("Test")
    })
})
