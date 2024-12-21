import { expect, test, describe } from "bun:test";
import { setupDeckClient } from "../util/util";
import { CreateBoardPayload, CreateCardPayload, CreateStackPayload, UpdateBoardPayload, UpdateCardPayload, Card, Stack, Board } from "../../src/types/deckTypes";

describe("Standard Deck Tests", () => {

    const client = setupDeckClient()
    let boardId: number
    let stackId: number
    let cardId: number

    test("Create Board", async () => {
        const payload: CreateBoardPayload = {
            title: "Test Board",
            color: "FF0000"
        }
        const response = await client.createBoard(payload)
        expect(response.title).toBe(payload.title)
        boardId = response.id
    })

    test("Check if Board is listed fetching all boards", async () => {
        const response = await client.getBoards(false)
        let found = false
        response.forEach(board => {
            if (board.id === boardId) {
                found = true
            }
        })
        expect(found).toBe(true)
    })

    test("Update the Board", async () => {
        const payload: UpdateBoardPayload = {
            title: "Updated Board",
            color: "55ab6c"
        }
        const response = await client.updateBoard(boardId, payload)
        expect(response.title).toBe(payload.title)
        expect(response.color).toBe(payload.color)
    })

    test("Retrieve Board details to check for updated value", async () => {
        const response = await client.getBoard(boardId)
        expect(response.title).toBe("Updated Board")
    })

    test("Create Stack", async () => {
        const payload: CreateStackPayload = {
            title: "Test Stack",
            order: 999
                }
        const response = await client.createStack(boardId, payload)
        expect(response.title).toBe(payload.title)
        stackId = response.id
    })

    test("Update Stack title", async () => {
        const payload = {
            title: "Updated Stack",
            order: 999
        }
        const response = await client.updateStack(boardId, stackId, payload)
        expect(response.title).toBe(payload.title)
    })

    test("Get Stack", async () => {
        const response = await client.getStack(boardId, stackId)
        expect(response.title).toBe("Updated Stack")
    })

    test("Create Card", async () => {
        const payload: CreateCardPayload = {
            title: "Test Card",
        }
        const response = await client.createCard(boardId, stackId, payload)
        expect(response.title).toBe(payload.title)
        cardId = response.id
    })

    test("Get Cards from Stack", async () => {
        const response = await client.getStack(boardId, stackId)
        let found = false
        response.cards.forEach(card => {
            if (card.id === cardId) {
                found = true
            }
        })
        expect(found).toBe(true)
    })

    test("Update Card", async () => {
        const payload: UpdateCardPayload = {
            title: "Updated Card",
            owner: process.env.NC_USER,
            type: "plain",
            description: "Some description"
        }
        const response = await client.updateCard(boardId, stackId, cardId, payload)
        expect(response.title).toBe(payload.title)
        expect(response.description).toBe(payload.description)
    })

    test("Delete Card", async () => {
        const response = await client.deleteCard(boardId, stackId, cardId)
        if (response !== undefined){
            console.warn("⚠️  The delete card endpoint returns the card details unlike listed in the API documentation. See https://deck.readthedocs.io/en/latest/API/#delete-boardsboardid-delete-a-board")
            console.debug("DELETE /boards/{boardId}/stacks/{stackId}/card/{cardId} returns: ", response)
            expect(response)
        }

    })

    test("Delete Stack", async () => {
        const response = await client.deleteStack(boardId, stackId)
        if (response !== undefined){
            console.warn("⚠️  The delete stack endpoint returns the card details unlike listed in the API documentation. See https://deck.readthedocs.io/en/latest/API/#delete-boardsboardidstacksstackid-delete-a-stack")
            console.debug("DELETE /boards/{boardId}/stacks/{stackId} returns: ", response)
            expect(response)
        }
    })

    test("Delete Board", async () => {
        const response = await client.deleteBoard(boardId)
        if (response !== undefined) {
            console.warn("⚠️  The delete stack endpoint returns the card details unlike listed in the API documentation. See https://deck.readthedocs.io/en/latest/API/#delete-boardsboardidstacksstackidcardscardid-delete-a-card")
            console.debug("DELETE /boards/{boardId} returns: ", response)
            expect(response)
        }
    })

});