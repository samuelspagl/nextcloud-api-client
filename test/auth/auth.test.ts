import { expect, test, describe } from "bun:test";
import { setupAuthClient } from "../util/util";
import {AnonymousLoginResponse} from "../../src/types/authTypes"
import { ApiError } from "../../src/util/error";

describe("Anonymous Login V2", () => {
    const client = setupAuthClient()
    let loginResponse: AnonymousLoginResponse
    test("Retrieve anonymous authorization url", async ()=> {
    
        loginResponse = await client.initiateAnonymousLogin()
        console.log(loginResponse)
        expect(loginResponse.login)
    })

    test("Stuff", async () => {
        try{
            const pollingResponse = await client.startPolling(loginResponse.poll.token,10,500)
            expect(true).toBe(false)
        }catch(e){
            expect(e).toBeInstanceOf(ApiError)
            expect(e.statusCode).toBe(404)
            expect(e.errorDetails.message).toBe('Invalid polling result')
        }
    }, 10000)

})