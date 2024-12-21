// src/utils/request.ts

import { FetchOptions, FetchResponse, ofetch, ResolvedFetchOptions } from 'ofetch';
import { ApiError } from './error';

// Define the type for Basic Authentication credentials
interface BasicAuth {
  username: string;
  password: string;
}

// Extend RequestInit to include basicAuth and custom error handler
export interface RequestOptions extends FetchOptions {
  basicAuth?: BasicAuth;  // Now basicAuth is optional
  // Optional callback to modify error handling
  mapError?: (request: RequestInfo, response: FetchResponse<any>, options: ResolvedFetchOptions) => Promise<ApiError>;
}

// Helper function to make API requests with optional Basic Authentication using ofetch
export async function request<T>(url: string, options: RequestOptions): Promise<T> {
  const { basicAuth, mapError, ...fetchOptions } = options;

  // Create the Basic Authentication header if basicAuth is provided
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  if(basicAuth) {
    const authHeader = 'Basic ' + Buffer.from(`${basicAuth.username}:${basicAuth.password}`).toString('base64');
    headers['Authorization'] = authHeader;
  }
  // Make the request using ofetch
  const response = await ofetch(url, {
    ...fetchOptions,
    headers,
    timeout: 30000, // 5 seconds timeout (you can adjust as needed),
    async onResponseError({ request, response, options }){
      if (mapError) {
        throw await mapError(request, response, options)
      }else{
        throw new ApiError({
          code: response.status,
          message: response.statusText,
          url: request.toString(),
          timestamp: new Date().toISOString(),
          details: response._data
        })
      }
    }
  })
  // Assuming the response is JSON
  return response
}
