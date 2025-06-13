// src/apiClient.ts

import { FetchResponse, ResolvedFetchOptions } from 'ofetch';
import { request } from './request';
import { RequestOptions } from './request';
import { ApiError, buildErrorObject, buildOcsErrorObject } from './error';

export interface ApiClientOptions {
    proxyTo?: string
}

export class BaseApiClient {
    private baseUrl: string;
    private username: string | undefined;
    private password: string | undefined;
    private clientOptions: ApiClientOptions;
    private tokenRefreshFunction?: () => Promise<string | undefined>;

    constructor(baseUrl: string, username?: string, password?: string, options: ApiClientOptions = {}) {
        this.username = username;
        this.password = password;
        this.baseUrl = baseUrl;
        this.clientOptions = options
    }

    protected async get<T, Q>(url: string, query?: Q): Promise<T> {
        return await this.request<T>(url, {
            method: 'GET',
            query: query as Record<string, any>,
        });
    }

    protected async getBlob(url: string): Promise<Blob> {
        return await this.request<Blob>(url, {
            method: 'GET',
            responseType: 'blob'
        });
    }

    protected async post<T, R>(url: string, body: T): Promise<R> {
        return await this.request<R>(url, {
            method: 'POST',
            body: JSON.stringify(body)
        });
    }

    protected async postBlob<T, R>(url: string, body: T): Promise<R> {
        return await this.request<R>(url, {
            method: 'POST',
            body: JSON.stringify(body)
        });
    }

    protected async put<T, R>(url: string, body: T): Promise<R> {
        return await this.request<R>(url, {
            method: 'PUT',
            body: JSON.stringify(body),
        });
    }

    protected async patch<T, R>(url: string, body: T): Promise<R> {
        return await this.request<R>(url, {
            method: 'PATCH',
            body: JSON.stringify(body),
        });
    }

    protected async delete<T>(url: string): Promise<T> {
        return await this.request<T>(url, {
            method: 'DELETE',
        });
    }

    protected async ocsGet<T, Q>(url: string, query?: Q): Promise<T> {
        return await this.ocsRequest<T>(url, {
            method: 'GET',
            query: query as Record<string, any>
        });
    }

    protected async ocsPost<T, R>(url: string, body: T): Promise<R> {
        return await this.ocsRequest<R>(url, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    }

    protected async ocsPut<T, R>(url: string, body: T): Promise<R> {
        return await this.ocsRequest<R>(url, {
            method: 'PUT',
            body: JSON.stringify(body),
        });
    }

    protected async ocsDelete<T>(url: string): Promise<T> {
        return await this.ocsRequest<T>(url, {
            method: 'DELETE',
        });
    }

    protected async request<T>(url: string, options: RequestOptions = {}): Promise<T> {
        // 1) Basis-Header zusammenbauen
        const headers = {
            ...(this.clientOptions.proxyTo ? { proxyTo: this.clientOptions.proxyTo } : {}),
            ...(options.headers || {}),
        };

        // 2) Basic Auth mitgeben, falls vorhanden
        let auth = undefined;
        if (this.username && this.password) {
            auth = { username: this.username, password: this.password };
        }

        // 3) Helper-Funktion: Request ausführen
        const doRequest = () =>
            request<T>(`${this.baseUrl}${url}`, {
                ...options,
                headers,
                basicAuth: auth,
                mapError: this.buildErrorObject,
            });

        try {
            // erster Versuch
            return await doRequest();
        } catch (err: unknown) {
            const apiErr = err as ApiError;

            // nur 401 abfangen, wenn wir eine Refresh-Funktion haben
            if (apiErr.statusCode === 401 && this.tokenRefreshFunction) {
                const newToken = await this.tokenRefreshFunction();

                if (!newToken) {
                    // keinen neuen Token bekommen? Dann echten 401 werfen
                    throw new ApiError({
                        code: 401,
                        message: 'Unauthorized – no new token available',
                        url: `${this.baseUrl}${url}`,
                        timestamp: new Date().toISOString(),
                        details: apiErr.errorDetails,
                    });
                }

                // (Optional) neuen Token intern speichern
                // this.token = newToken;

                if (auth) {
                    auth.password = newToken;
                }
                // erneuter Versuch
                return await doRequest();
            }

            // alle anderen Fehler durchreichen
            throw apiErr;
        }
    }

    protected async ocsRequest<T>(url: string, options: RequestOptions = {}): Promise<T> {
        // 1) Basis-Header zusammenbauen
        const ocsHeaders = {
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json",
            "OCS-APIRequest": "true"
        }
        const headers = {
            ...ocsHeaders,
            ...(this.clientOptions.proxyTo ? { proxyTo: this.clientOptions.proxyTo } : {}),
            ...(options.headers || {}),
        };

        // 2) Basic Auth mitgeben, falls vorhanden
        let auth = undefined;
        if (this.username && this.password) {
            auth = { username: this.username, password: this.password };
        }

        // 3) Helper-Funktion: Request ausführen
        const doRequest = () =>
            request<T>(`${this.baseUrl}${url}`, {
                ...options,
                headers,
                basicAuth: auth,
                mapError: this.buildOcsErrorObject,
            });

        try {
            // erster Versuch
            return await doRequest();
        } catch (err: unknown) {
            const apiErr = err as ApiError;

            // nur 401 abfangen, wenn wir eine Refresh-Funktion haben
            if (apiErr.statusCode === 401 && this.tokenRefreshFunction) {
                const newToken = await this.tokenRefreshFunction();

                if (!newToken) {
                    // keinen neuen Token bekommen? Dann echten 401 werfen
                    throw new ApiError({
                        code: 401,
                        message: 'Unauthorized – no new token available',
                        url: `${this.baseUrl}${url}`,
                        timestamp: new Date().toISOString(),
                        details: apiErr.errorDetails,
                    });
                }

                // (Optional) neuen Token intern speichern
                // this.token = newToken;

                if (auth) {
                    auth.password = newToken;
                }
                // erneuter Versuch
                return await doRequest();
            }

            // alle anderen Fehler durchreichen
            throw apiErr;
        }
    }

    public updateAppPassword(newPassword: string): void {
        this.password = newPassword;
    }

    protected async buildErrorObject(request: RequestInfo, response: FetchResponse<any>, options: ResolvedFetchOptions): Promise<ApiError> {
        return await buildErrorObject(request, response, options)
    }

    protected async buildOcsErrorObject(request: RequestInfo, response: FetchResponse<any>, options: ResolvedFetchOptions): Promise<ApiError> {
        return await buildOcsErrorObject(request, response, options)
    }
}