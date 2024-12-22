// ------------------------------
//             MODELS
// ------------------------------

/**
 * Represents a User within the system.
 * A User typically has a unique identifier and a display name.
 */
export interface DeckUser {
    /** Unique identifier for the user in the system */
    primaryKey: string;

    /** Universal unique identifier for the user, typically used across services */
    uid: string;

    /** The display name of the user */
    displayname: string;
}

/**
* Represents the Permissions available for a user or group on a given resource.
* Permissions are typically used to define access control levels.
*/
export interface Permissions {
    /** Permission to read the resource */
    PERMISSION_READ: boolean;

    /** Permission to edit the resource */
    PERMISSION_EDIT: boolean;

    /** Permission to manage the resource (e.g., add/remove users, configure settings) */
    PERMISSION_MANAGE: boolean;

    /** Permission to share the resource with others */
    PERMISSION_SHARE: boolean;
}

/**
* Represents the Settings for a user or board, providing customization options.
*/
export interface DeckSettings {
    /** Notification setting for due dates, 'on' or 'off' */
    "notify-due": "off" | "on";

    /** Whether the calendar feature is enabled */
    calendar: boolean;
}

/**
* Represents a Label used to categorize or tag elements on a board.
*/
export interface Label {
    /** The title or name of the label */
    title: string;

    /** The color of the label, represented as a hex color code */
    color: string;

    /** The ID of the board this label belongs to */
    boardId: number;

    /** The ID of the card this label is associated with, or null if not applicable */
    cardId: number | null;

    /** Unique identifier for the label */
    id: number;
}

/**
* Represents a Board which is a container for stacks and cards.
*/
export interface Board {
    /** The title of the board */
    title: string;

    /** The owner of the board, represented by a User object */
    owner: User;

    /** The color of the board, represented as a hex color code */
    color: string;

    /** Whether the board is archived */
    archived: boolean;

    /** List of labels associated with the board */
    labels: Label[];

    /** Access control list (ACL) of the board, containing user IDs or roles with access */
    acl: string[];

    /** The permissions associated with the board */
    permissions: Permissions;

    /** List of users associated with the board, represented by their user IDs */
    users: string[];

    /** Number of users with whom the board is shared */
    shared: number;

    /** Timestamp when the board was deleted (0 if not deleted) */
    deletedAt: number;

    /** Unique identifier for the board */
    id: number;

    /** Timestamp of the last modification made to the board */
    lastModified: number;

    /** Optional settings specific to the board, such as notification preferences */
    settings?: Settings;
}

/**
* Represents a Stack, which is a collection of cards within a board.
*/
export interface Stack {
    /** The title or name of the stack */
    title: string;

    /** The ID of the board to which this stack belongs */
    boardId: number;

    /** Timestamp when the stack was deleted (0 if not deleted) */
    deletedAt: number;

    /** Timestamp of the last modification made to the stack */
    lastModified: number;

    /** List of cards within the stack */
    cards: Card[];

    /** Order of the stack relative to others, used for sorting purposes */
    order: number;

    /** Unique identifier for the stack */
    id: number;
}

/**
* Represents a Card, which can be assigned to a stack, and may have various attributes such as title, description, and due date.
*/
export interface Card {
    /** The title or name of the card */
    title: string;

    /** The description of the card, can be null if no description is provided */
    description: string | null;

    /** The ID of the stack to which the card belongs */
    stackId: number;

    /** The type of the card, can be 'plain' or other string values for specialized types */
    type: "plain" | string;

    /** Timestamp of the last modification made to the card */
    lastModified: number;

    /** Timestamp of the card creation */
    createdAt: number;

    /** List of labels associated with the card, or null if no labels */
    labels: string[] | null;

    /** List of users assigned to the card, or null if no users are assigned */
    assignedUsers: string[] | null;

    /** List of attachments associated with the card, or null if no attachments */
    attachments: any[] | null;

    /** The number of attachments associated with the card */
    attachmentCount: number | null;

    /** The ID of the user who owns the card */
    owner: string;

    /** The order of the card within the stack, used for sorting */
    order: number;

    /** Whether the card is archived */
    archived: boolean;

    /** The due date of the card in ISO 8601 format, or null if no due date is set */
    duedate: string | null;

    /** Timestamp when the card was deleted (0 if not deleted) */
    deletedAt: number;

    /** The number of unread comments on the card */
    commentsUnread: number;

    /** Unique identifier for the card */
    id: number;

    /** Flag indicating whether the card is overdue (1 if overdue, 0 if not) */
    overdue: number;
}

/**
* Represents an Attachment associated with a card.
* Attachments can be files or other resources linked to the card.
*/
export interface Attachment {
    /** The ID of the card this attachment belongs to */
    cardId: number;

    /** The type of attachment (e.g., file, deck file, or custom type) */
    type: 'deck_file' | 'file' | string;

    /** The filename or path of the attachment */
    data: string;

    /** Timestamp when the attachment was last modified */
    lastModified: number;

    /** Timestamp when the attachment was created */
    createdAt: number;

    /** The ID of the user who created the attachment */
    createdBy: string;

    /** Timestamp when the attachment was deleted (0 if not deleted) */
    deletedAt: number;

    /** Additional metadata about the attachment */
    extendedData: {
        /** Size of the attachment in bytes */
        filesize: number;

        /** MIME type of the attachment (e.g., 'image/jpeg', 'application/pdf') */
        mimetype: string;

        /** Information about the file path and name */
        info: {
            /** Directory path of the attachment */
            dirname: string;

            /** Base filename (name + extension) */
            basename: string;

            /** The file extension (e.g., '.jpg', '.pdf') */
            extension: string;

            /** The filename without extension */
            filename: string;
        };
    };

    /** Unique identifier for the attachment */
    id: number;
}



// ------------------------------
//            REQUESTS
// ------------------------------

export interface CreateBoardPayload{
    title: string;
    color: string
}

export interface UpdateBoardPayload{
    title?: string;
    color?: string;
    archived?: false;
}

export interface CreateAclRulePayload {
    type: string; // Type of the participant, [0: User, 1: Group, 7: Circle]
    participant: string; // The uid of the participant
    permissionEdit: boolean; // Setting if the participant has edit permissions
    permissionShare: boolean; // Setting if the participant has sharing permissions
    permissionManage: boolean; // Setting if the participant has management permissions
}

export interface UpdateAclRulePayload {
    permissionEdit: boolean; // Setting if the participant has edit permissions
    permissionShare: boolean; // Setting if the participant has sharing permissions
    permissionManage: boolean; // Setting if the participant has management permissions
}

export interface CreateStackPayload{
    title: string;
    order: number | 999;
}

export interface UpdateStackPayload{
    title?: string;
    order?: number;
}

export interface CreateCardPayload {
    title: string;
    type?: string | "plain";
    order?: number;
    description?: string;
    duedate?: string | null;
}

export interface UpdateCardPayload {
    title: string;
    type: "plain";
    owner: string;
    order?: number;
    description?: string;
    duedate?: string | null;
}

export interface ReorderCardPayload {
    order: number;
    stackId: number;
}
export interface CreateLabelPayload {
    title: string;
    color: string; // Assuming color is a hex string (e.g., "31CC7C")
}

export interface UpdateLabelPayload {
    title?: string;
    color?: string; // Assuming color is a hex string (e.g., "31CC7C")
}


// ------------------------------
//            RESPONSES
// ------------------------------

export interface AclRuleResponse {
    participant: DeckUser; // The participant is a User object
    type: number; // Type of participant (likely an enum or a numeric identifier)
    boardId: number; // The ID of the board the participant is associated with
    permissionEdit: boolean; // Whether the participant has edit permissions
    permissionShare: boolean; // Whether the participant has share permissions
    permissionManage: boolean; // Whether the participant has manage permissions
    owner: boolean; // Whether the participant is the owner of the board
    id: number; // Unique identifier for the participant
}

export interface AssignUserResponse{
    id: number;
    participant: {
      primaryKey: string;
      uid: string;
      displayname: string;
    }
    cardId: number;
}