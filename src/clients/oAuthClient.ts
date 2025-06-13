import { pathOAuthAuthorize, pathOAuthToken } from "../paths/authPath";
import { oAuthResponse } from "../types/authTypes";

export class oAuthClient{
    private baseUrl: string;
    private clientId: string;

    constructor(baseUrl: string ,clientId: string) {
        this.baseUrl = baseUrl;
        this.clientId = clientId;
          }

    authorizeUrl(redirectUri: string): string {
        const scope = 'openid';
        const responseType = 'code';
        const state = Math.random().toString(36).slice(2, 9);
        return `${this.baseUrl}${pathOAuthAuthorize}?client_id=${this.clientId}&scope=${scope}&state=${state}&response_type=${responseType}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    }

    async getToken(redirectUri: string, code: string, client_secret: string): Promise<oAuthResponse> {
        const response = await fetch(`${this.baseUrl}${pathOAuthToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: this.clientId,
                client_secret: client_secret,
                redirect_uri: redirectUri,
                code: code,
                grant_type: 'authorization_code',
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to get token: ${response.statusText}`);
        }

        return await response.json() as oAuthResponse;
    }

    async refreshToken(refreshToken: string, client_secret: string): Promise<oAuthResponse> {
        const response = await fetch(`${this.baseUrl}${pathOAuthToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: this.clientId,
                client_secret: client_secret,
                refresh_token: refreshToken,
                grant_type: 'refresh_token',
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to refresh token: ${response.statusText}`);
        }

        return await response.json() as oAuthResponse;
    }
}