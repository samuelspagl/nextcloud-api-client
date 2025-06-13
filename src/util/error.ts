import { FetchResponse, ResolvedFetchOptions } from "ofetch";

// Custom Error class to store error details
export interface ErrorDetails {
  code: number;
  message: string;
  url: string;
  timestamp: string;
  body?: any;
  details?: any;
}

export async function buildErrorObject(request: RequestInfo, response: FetchResponse<any>, options: ResolvedFetchOptions): Promise<ApiError> {
  return new ApiError({
    code: response.status,
    message: response.statusText,
    url: request.toString(),
    timestamp: new Date().toISOString(),
    details: response._data
  })
}

export async function buildOcsErrorObject(request: RequestInfo, response: FetchResponse<any>, options: ResolvedFetchOptions): Promise<ApiError> {
  return new ApiError({
    code: response.status,
    message: response.statusText,
    url: request.toString(),
    timestamp: new Date().toISOString(),
    details: response._data
  })
}

export class ApiError extends Error {
  statusCode: number;
  errorDetails: ErrorDetails;

  constructor(errorDetails: ErrorDetails, name: string = "ApiError") {
    super(errorDetails.message);
    this.name = `${name}`;
    this.statusCode = errorDetails.code;
    this.errorDetails = errorDetails;
    this.message = this.toString(errorDetails)
  }

  public toString(errorDetails: ErrorDetails): string {
    return `Request returned an ${errorDetails.code} at ${errorDetails.url}\nMessage: ${errorDetails.message}\nAdditional Info: ${JSON.stringify(errorDetails.body)}`;
  }
}