import { expect, test, describe } from "bun:test";
import { setupNotesClient } from "../util/util";
import { NotePayload, NotesSettingsPayload } from "../../src/types/notesTypes";

describe("Standard Note Scenarios", () => {

    const client = setupNotesClient()
    let noteId: number

    test("Create a new Note", async () => {
        const payload: NotePayload = {
            title: "Test Note",
            content: "This is a test note"
        }
        const response = await client.createNote(payload)
        expect(response.title).toBe(payload.title)
        expect(response.content).toBe(payload.content)
        noteId = response.id
    })

    test("Fetch the content of the created Note", async () => {
        const response = await client.getNote(noteId)
        expect(response.title).toBe("Test Note")
        expect(response.content).toBe("This is a test note")
    })

    test("Update the Notes title and content", async () => {
        const payload: NotePayload = {
            title: "Updated Note",
            content: "This is an updated note"
        }
        const response = await client.updateNote(noteId, payload)
        expect(response.title).toBe(payload.title)
        expect(response.content).toBe(payload.content)
    })

    test("Fetch the note and check for updated title and content", async () => {
        const response = await client.getNote(noteId)
        expect(response.title).toBe("Updated Note")
        expect(response.content).toBe("This is an updated note")
    })

    test("Delete the Note", async () => {
        const response = await client.deleteNote(noteId)
        expect(response)
    })
})

describe("Query Notes", () => {
    const client = setupNotesClient()
    let noteIds: number[] = []

    test("Create multiple Notes", async () => {
        const payload1: NotePayload = {
            title: "Test Note 1",
            content: "This is the content of Note 1 with keyword: test1"
        }
        const payload2: NotePayload = {
            title: "Test Note 2",
            content: "This ist the content of Note 2 with keyword: test2"
        }
        const payload3: NotePayload = {
            title: "Test Note 3",
            content: "This is the content of Note 3 with keyword: test3",
            category: "testFolder"
        }
        const response1 = await client.createNote(payload1)
        const response2 = await client.createNote(payload2)
        const response3 = await client.createNote(payload3)
        noteIds.push(response1.id)
        noteIds.push(response2.id)
        noteIds.push(response3.id)
    })

    test("Fetch all Notes", async () => {
        const response = await client.queryNotes()
        expect(response)
        expect(response.length).toBe(3)
    })

    test("Fetch Notes with keyword in content", async () => {
        const response = await client.queryNotes({category: "testFolder"})
        expect(response.length).toBe(1)
        expect(response[0].content).toContain("test3")
    })

    test("Delete all Notes", async () => {
        for (let id of noteIds) {
            const response = await client.deleteNote(id)
            expect(response)
        }
    })
})

describe("Note Settings", () => {
    const client = setupNotesClient()

    test("Fetch Note Settings", async () => {
        const response = await client.getSettings()
        expect(response)
    })

    test("Update Note Settings", async () => {
        const payload: NotesSettingsPayload = {
            fileSuffix: ".txt"
        }
        const response = await client.updateSettings(payload)
        expect(response.fileSuffix).toBe(".txt")
    })

    test("Fetch updated Note Settings", async () => {
        const response = await client.getSettings()
        expect(response.fileSuffix).toBe(".txt")
    })

    test("Update Note Settings back to default", async () => {
        const payload: NotesSettingsPayload = {
            fileSuffix: ".md"
        }
        const response = await client.updateSettings(payload)
        expect(response.fileSuffix).toBe(".md")
    })
})