import { AutocompleteSearchResponse, AutocompleteSearchResults, Capabilities, CapabilitiesResponse, NextcloudInstance, UserInfo, UserInfoResponse } from "../../types/generalTypes";
import { BaseApiClient } from "../../util/baseClient";
import { pathAutocompleteUsers, pathCapabilities, pathUserInfo } from "./generalPaths";

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
}