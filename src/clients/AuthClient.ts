import { pathLoginV2, pathPolling, pathOAuthAuthorize, pathOAuthToken } from "../paths/authPath";
import { BaseApiClient } from "../util/BaseClient";
import { ApiError } from "../util/error";
import {loginV2InitResponse, loginV2PollResponse, oAuthResponse} from "../types/authTypes"
export class AuthClient extends BaseApiClient{
    
    async initiateAnonymousLogin(): Promise<loginV2InitResponse>{
        return this.post<null,loginV2InitResponse>(pathLoginV2, null)
    }

    async startPolling(token: string, maxCounter: number = 240, waitTimeMs: number = 300): Promise<loginV2PollResponse>{
        let counter = 0
        let response = null
        while(counter < maxCounter){
            await new Promise(r => setTimeout(r, waitTimeMs));
            try{
                response = await this.post<{token: string}, loginV2PollResponse>(pathPolling, {token: token})
            }catch(e){
                if (e instanceof ApiError){
                    counter+=1
                }else{
                    throw Error(`Polling error, received ${e}`)
                }
            }
        }
        if (!response){
            throw new ApiError({code: 999,
                message: "Invalid polling result",
                url: pathPolling,
                timestamp: new Date().toDateString()
            }, 'AuthError')
        }
        return response
        // Implement that an error is thrown if timeout is exceeded.
        // Make typescript happy.
    }
}