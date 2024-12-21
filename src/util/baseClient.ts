// src/apiClient.ts

import { FetchResponse, ResolvedFetchOptions } from 'ofetch';
import { request } from './request';
import { RequestOptions } from './request';
import { ApiError } from './error';

// API Client Class
export class BaseApiClient {
  private baseUrl: string;
  private username: string;
  private password: string;

  constructor(baseUrl: string ,username: string, password: string) {
    this.username = username;
    this.password = password;
    this.baseUrl = baseUrl;
  }

  protected async request<T>(url: string, options: RequestOptions): Promise<T> {
    return await request<T>(`${this.baseUrl}${url}`, {
      basicAuth: {
        username: this.username,
        password: this.password,
      },
      mapError: this.buildErrorObject,
      ...options,
    })
  }

  protected async ocsRequest<T>(url: string, options: RequestOptions): Promise<T> {
    return await request<T>(`${this.baseUrl}${url}`, {
      basicAuth: {
        username: this.username,
        password: this.password,
      },
      headers:{
        "Content-Type": "application/json;charset=utf-8",
        "Accept": "application/json",
        "OCS-APIRequest": "true"
      },
      mapError: this.buildOcsErrorObject,
      ...options,
    })
  }

  protected async get<T, Q>(url: string, query?:Q): Promise<T> {
    return await this.request<T>(url, {
      method: 'GET',
      query: query as Record<string, any>,
    });
  }

  protected async getBlob(url: string): Promise<Blob>{
    return await this.request<Blob>(url, {
      method: 'GET',
      responseType: 'blob'});
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

  protected async ocsGet<T, Q>(url: string, query?:Q): Promise<T> {
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

  protected async buildErrorObject(request: RequestInfo, response: FetchResponse<any>, options: ResolvedFetchOptions): Promise<ApiError>{
    return new ApiError({
      code: response.status,
      message: response.statusText,
      url: request.toString(),
      timestamp: new Date().toISOString(),
      details: response._data
    })
  }

  protected async buildOcsErrorObject(request: RequestInfo, response: FetchResponse<any>, options: ResolvedFetchOptions): Promise<ApiError>{
    return new ApiError({
      code: response.status,
      message: response.statusText,
      url: request.toString(),
      timestamp: new Date().toISOString(),
      details: response._data
    })
  }
} 
