import { expect, test, describe } from "bun:test";
import { setupGeneralClient, getEnvironmentVariable } from "../util/clients";

test("Fetch capabilities", async () => {
    const client = setupGeneralClient()

    const response = await client.getCapabilities()
    expect(response.capabilities.theming)
})

test("Fetch User info", async() => {
    const client = setupGeneralClient()

    const response = await client.getUserInfo(getEnvironmentVariable("NC_USER"))
    expect(response.id).toBe(getEnvironmentVariable("NC_USER"))
})

test("Query Users", async () => {
    const client = setupGeneralClient()

    const response = await client.queryUsernames('testaccount')
    expect(response.length).toBe(1)
})

test("Get Avatar of User", async () => {
    const client = setupGeneralClient()

    const response = await client.getAvatarImage(getEnvironmentVariable("NC_USER"))
    expect(response.size).toBeDefined()
})