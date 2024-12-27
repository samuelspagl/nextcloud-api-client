import { ApiError, ErrorDetails } from "../../util/error";

export class DeckError extends ApiError{
    constructor(errorDetails: ErrorDetails){
        super(errorDetails, "DeckError")
    }
}