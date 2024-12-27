import { expect, test, describe } from "bun:test";
import { setupGeneralClient } from "../util/util";


test("Fetch capabilities", async () => {
    const client = setupGeneralClient()

    const response = await client.getCapabilities()
    expect(response.capabilities.theming)
})

test("Fetch User info", async() => {
    const client = setupGeneralClient()

    const response = await client.getUserInfo(process.env.NC_USER)
    expect(response.id).toBe(process.env.NC_USER)
})

test("Query Users", async () => {
    const client = setupGeneralClient()

    const response = await client.queryUsernames('testaccount')
    expect(response.length).toBe(1)
})