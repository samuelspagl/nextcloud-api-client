import { AnonymousLoginPollResults, AnonymousLoginResponse } from "../../types/authTypes";
import { BaseApiClient } from "../../util/baseClient";
import { ApiError } from "../../util/error";
import { pathAnonymousLoginV2, pathAnonymousPolling } from "./authPaths";

export class AuthClient extends BaseApiClient{
    async initiateAnonymousLogin(): Promise<AnonymousLoginResponse>{
        return this.post<null,AnonymousLoginResponse>(pathAnonymousLoginV2, null)
    }

    async startPolling(token: string, maxCounter: number = 240, waitTimeMs: number = 300): Promise<AnonymousLoginPollResults>{
        let counter = 0
        let response = null
        while(counter < maxCounter){
            await new Promise(r => setTimeout(r, waitTimeMs));
            try{
                response = await this.post<{token: string}, AnonymousLoginPollResults>(pathAnonymousPolling, {token: token})
            }catch(e){
                if (e instanceof ApiError){
                    counter+=1
                }else{
                    throw Error(`Polling error, received ${e}`)
                }
            }
        }
        if (!response){
            throw new ApiError({code: 404,
                message: "Invalid polling result",
                url: pathAnonymousPolling,
                timestamp: new Date().toDateString()
            }, 'AuthError')
        }
        return response
        // Implement that an error is thrown if timeout is exceeded.
        // Make typescript happy.

    }
}