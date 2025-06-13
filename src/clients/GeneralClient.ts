import { pathCapabilities, pathUserInfo, pathAutocompleteUsers, pathUserAvatar } from "../paths/generalPath"
import { NextcloudInstance, CapabilitiesResponse, UserInfoResponse, AutocompleteSearchResults, AutocompleteSearchResponse, UserInfo } from "../types/generalTypes"
import { BaseApiClient } from "../util/BaseClient"

export class GeneralClient extends BaseApiClient{
    async getCapabilities(): Promise<NextcloudInstance>{
        return (await this.ocsGet<CapabilitiesResponse, null>(pathCapabilities)).ocs.data
    }

    async getUserInfo(userId: string): Promise<UserInfo>{
        return (await this.ocsGet<UserInfoResponse, null>(pathUserInfo(userId))).ocs.data
    }

    async queryUsernames(query: string): Promise<AutocompleteSearchResults>{
        return (await this.ocsGet<AutocompleteSearchResponse, {search: string}>(pathAutocompleteUsers, {search: query})).ocs.data
    }

    async getAvatarImage(username: string, pixel: number = 256): Promise<Blob>{
        return this.getBlob(pathUserAvatar(username, pixel))
    }
}