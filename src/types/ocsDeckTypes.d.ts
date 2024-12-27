// ------------------------------
//             Models
// ------------------------------

export interface CardCommentMention {
    mentionId: string;
    mentionType: "user" | "team" | "role"; // Adjust based on possible mention types
    mentionDisplayName: string;
}

export interface CardComment extends CardCommentChild {
    replyTo: CardCommentBase
}

export interface CardCommentBase {
    id: number;
    objectId: number;
    message: string;
    actorId: string;
    actorType: "users" | "teams"; // Adjust based on actual actor types
    actorDisplayName: string;
    creationDateTime: string; // ISO 8601 date format
    mentions: Mention[];
}

export interface DeckSession {
    token: string
}

// ------------------------------
//             Requests
// ------------------------------

export interface OcsCardCreateCommentPayload{
    message: string;
    parentId?: number | null 
}

export interface OcsCardUpdateCommentPayload{
    message: string;
}

export interface OcsStartDeckSessionPayload {
    boardId: number
}

export interface OcsSyncDeckSessionPayload{
    boardId: number;
    token: string;
}

export interface OcsCloseDeckSessionPayload{
    boardId: number;
    token: string;
}

// ------------------------------
//             Responses
// ------------------------------


export type OcsCardCommentsResponse = OcsBaseResponse<CardComment[]>
export type OcsCardCommentResponse = OcsBaseResponse<CardComment>

export type OcsDeckSessionResponse = OcsBaseResponse<DeckSession>