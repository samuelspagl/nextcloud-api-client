// ------------------------------
//             Models
// ------------------------------

interface CardCommentMention {
    mentionId: string;
    mentionType: "user" | "team" | "role"; // Adjust based on possible mention types
    mentionDisplayName: string;
}

interface CardComment extends CardCommentChild {
    replyTo: CardCommentBase
}

interface CardCommentBase {
    id: number;
    objectId: number;
    message: string;
    actorId: string;
    actorType: "users" | "teams"; // Adjust based on actual actor types
    actorDisplayName: string;
    creationDateTime: string; // ISO 8601 date format
    mentions: Mention[];
}

interface DeckSession {
    token: string
}

// ------------------------------
//             Requests
// ------------------------------

interface OcsCardCreateCommentPayload{
    message: string;
    parentId?: number | null 
}

interface OcsCardUpdateCommentPayload{
    message: string;
}

interface OcsStartDeckSessionPayload {
    boardId: number
}

interface OcsSyncDeckSessionPayload{
    boardId: number;
    token: string;
}

interface OcsCloseDeckSessionPayload{
    boardId: number;
    token: string;
}

// ------------------------------
//             Responses
// ------------------------------


type OcsCardCommentsResponse = OcsBaseResponse<CardComment[]>
type OcsCardCommentResponse = OcsBaseResponse<CardComment>

type OcsDeckSessionResponse = OcsBaseResponse<DeckSession>