/**
 * *******************************************
 *                  MODELS
 * *******************************************    
 */

/**
 * Represents a bookmark within Nextcloud.
 */
interface Bookmark {
    /**
     * Unique identifier for the bookmark.
     */
    id: number;

    /**
     * The URL that this bookmark points to. Can be HTTP, FTP, file, or javascript link.
     */
    url: string;

    /**
     * Target URL for the bookmark. Can be HTTP, FTP, file, or javascript link.
     */
    target: string;

    /**
     * Human-readable title of the bookmark.
     */
    title: string;

    /**
     * Detailed description or note about the bookmark.
     */
    description: string;

    /**
     * UNIX timestamp of when the bookmark was created.
     */
    added: number;

    /**
     * ID of the user who owns the bookmark.
     */
    userId: string;

    /**
     * List of tags associated with the bookmark for classification.
     */
    tags: string[];

    /**
     * List of folders this bookmark belongs to.
     */
    folders: string[];

    /**
     * Number of times this bookmark has been clicked or accessed.
     */
    clickCount: number;

    /**
     * Boolean indicating if the bookmark's URL is reachable.
     */
    available: boolean;

    /**
     * HTML content of the bookmarked web page, if available (since v4.2.0).
     * `null` if the content is unavailable or not scraped.
     */
    htmlContent: string | null;

    /**
     * Plain text content of the bookmarked web page, if available (since v4.2.0).
     * `null` if the content is unavailable or not scraped.
     */
    textContent: string | null;

    /**
     * If the bookmark links to a non-HTML file, this is the Nextcloud file ID (since v3.4.0).
     * `null` if no file is associated.
     */
    archivedFile: number | null;
}

/**
 * Represents a folder within the Nextcloud bookmark system.
 */
interface BookmarkFolder {
    /**
     * Unique identifier for the folder.
     */
    id: number;

    /**
     * Human-readable title of the folder.
     */
    title: string;

    /**
     * ID of the parent folder. `0` indicates this is a root folder.
     */
    parentFolderId: number;

    /**
     * ID of the user who owns the folder.
     */
    userId: string;

    /**
     * Display name of the user who owns the folder.
     */
    userDisplayName: string;
}

type FolderTree = FolderTreeNode[]

/**
 * A stripped-down version of a folder, used for displaying folder hierarchies.
 */
interface FolderTreeNode {
    /**
     * Unique identifier for the folder.
     */
    id: number;

    /**
     * Title of the folder.
     */
    title: string;

    /**
     * ID of the parent folder. `0` indicates this is a root folder.
     */
    parentFolderId: number;

    /**
     * List of child folders.
     */
    children: FolderTreeNode[];
}

/**
 * Represents a simplified bookmark used in folder or bookmark APIs.
 */
interface SimpleBookmark {
    /**
     * Type of content, always "bookmark" for this interface.
     */
    type: 'bookmark';

    /**
     * The unique identifier of the bookmark.
     */
    id: number;

    /**
     * The title of the bookmark.
     */
    title: string;

    /**
     * The URL the bookmark points to.
     */
    url: string;
}

/**
 * Represents a simplified folder used in folder or bookmark APIs.
 */
interface SimpleBookmarkFolder {
    /**
     * Type of content, always "folder" for this interface.
     */
    type: 'folder';

    /**
     * The unique identifier of the folder.
     */
    id: number;

    /**
     * The title of the folder.
     */
    title: string;

    /**
     * The user ID of the folder's owner.
     */
    userId: string;
}

interface SimpleBookmarkOrderNode{
    type: 'folder' | 'bookmark';
    id: number
    children?: SimpleBookmarkOrderNode[]
}

interface FolderShare{
    id: number,
    folderId: number,
    participant: string,
    type: number,
    canWrite: boolean,
    canShare: boolean
  }


/**
 * *******************************************
 *             REQUEST BODYS
 * *******************************************    
 */

/**
 * Interface representing the query parameters for fetching bookmarks.
 */
interface BookmarkSearchParams {

    /**
     * An array of tags that bookmarks should have.
     * If provided, only bookmarks with these tags will be returned.
     */
    tags?: string[];

    /**
     * The page number for paginated results.
     * If non-negative, results will be paginated by the `limit` per page.
     * Default is 0 (first page).
     */
    page?: number;

    /**
     * The number of bookmarks to return per page.
     * Default is 10.
     */
    limit?: number;

    /**
     * The column to sort the results by.
     * One of: 'url', 'title', 'description', 'public', 'lastmodified', 'clickcount'.
     * Default is 'lastmodified'.
     */
    sortby?: 'url' | 'title' | 'description' | 'public' | 'lastmodified' | 'clickcount';

    /**
     * An array of words to search for in the following columns:
     * 'url', 'title', 'description', and 'tags'.
     * Only bookmarks that match any of the provided search terms will be returned.
     */
    search?: string[];

    /**
     * Defines whether all search terms must be present ('and') or if one match is sufficient ('or').
     * Default is 'or'.
     */
    conjunction?: 'and' | 'or';

    /**
     * The ID of the folder to filter bookmarks by.
     * Only bookmarks that are direct children of the folder with the provided ID will be returned.
     * The root folder has ID `-1`.
     */
    folder?: number;

    /**
     * The specific URL to filter bookmarks by.
     * Use this to test whether a URL exists in the user's bookmarks.
     * This feature was added in version 1.0.0.
     */
    url?: string;

    /**
     * If set to true, only dead links (404 or similar status codes) will be returned.
     * This feature was added in version 3.4.0.
     */
    unavailable?: boolean;

    /**
     * If set to true, only bookmarks whose contents have been archived will be returned.
     * This feature was added in version 3.4.0.
     */
    archived?: boolean;

    /**
     * If set to true, only bookmarks that have no tags will be returned.
     * This feature was added in version 0.12.0.
     */
    untagged?: boolean;

    /**
     * If set to true, only bookmarks that exist in multiple folders will be returned.
     * This feature was added in version 10.2.0.
     */
    duplicated?: boolean;
}

/**
 * Represents the query parameters for fetching folders.
 */
interface FolderSearchParams {
    /**
    * The id of the folder whose contents to retrieve (Default: -1, which is the root folder)
    */
    root?: number;

    /**
    * How many layers of folders to return at max. By default, all layers are returned.
    */
    layers?: number;
}

/**
* Represents the request body for creating a new bookmark.
*/
interface CreateBookmarkPayload {
    /**
     * The URL the bookmark points to.
     * Can be an HTTP, FTP, file, or JavaScript link.
     * @required
     */
    url: string;

    /**
     * The title of the bookmark.
     * This should be a short, human-readable label for the bookmark.
     * @optional If absent the title of the html site referenced by url is used
     */
    title?: string;

    /**
     * A detailed description or note for the bookmark.
     * This helps to provide more context about the bookmark.
     * @optional
     */
    description?: string;

    /**
     * Tags associated with the bookmark.
     * Array of tags for this bookmark (these needn’t exist and are created on-the-fly)
     * @optional
     */
    tags?: string[];

    /**
   * Folders associated with the bookmark.
   * An array of IDs of the folders this bookmark should reside in.
   * @optional if absent the new bookmark will be put in the root folder
   */
    folders?: string[];
}

/**
  * Represents the request body for updating an existing bookmark.
  */
interface UpdateBookmarkPayload {
    /**
     * The URL the bookmark points to.
     * Optional field, can be updated if the bookmark URL changes.
     */
    url?: string;

    /**
     * List of tags to be associated with the bookmark.
     * Optional field, used to update the tags of the bookmark.
     */
    tags?: string[];

    /**
     * The title of the bookmark.
     * Optional field, can be updated if the title changes.
     */
    title?: string;

    /**
     * A detailed description of the bookmark.
     * Optional field, can be updated if the description changes.
     */
    description?: string;

    /**
     * A list of folder IDs the bookmark is part of.
     * Optional field, used to update the folders the bookmark is categorized under.
     */
    folders?: number[];
}

/**
* Represents the request body for creating a new bookmark.
*/
interface CreateFolderPayload {
    /**
     * The title of the bookmark.
     * This should be a short, human-readable label for the folder.
     */
    title: string;

    /**
     * The id of the parent folder for the new folder.
     * The root folder is defined by -1.
     */
    parentFolder: number | -1
}

/**
* Represents the request body for creating a new bookmark.
*/
interface CreateFolderPayload {
    /**
     * The title of the bookmark.
     * This should be a short, human-readable label for the folder.
     */
    title: string;

    /**
     * The id of the parent folder for the new folder.
     * The root folder is defined by -1.
     */
    parentFolder?: number | -1
}

/**
* Represents the request body for creating a new bookmark.
*/
interface UpdateFolderPayload {
    /**
     * The title of the bookmark.
     * This should be a short, human-readable label for the folder.
     */
    title?: string;

    /**
     * The id of the parent folder for the new folder.
     * The root folder is defined by -1.
     */
    parentFolder?: number | -1
}

/**
* Represents the request body for creating a Share of a folder.
*/
interface CreateFolderSharePayload{
    /**
     * The id of whom to share.
     */
    participant: string;

    /**
     * The type of sharee.
     * Currently either 1 if it’s a group, or 0 if it’s a single user;
     */
    type: 0 | 1;

    /**
     * Defines the write access.
     */
    canWrite?: boolean;

    /**
     * Defines the weather this person / group can reshare the resource.
     */
    canShare?: boolean;
}

/**
* Represents the request body for creating a Share of a folder.
*/
interface UpdateFolderSharePayload{
    /**
     * Defines the write access.
     */
    canWrite: boolean;

    /**
     * Defines the weather this person / group can reshare the resource.
     */
    canShare: boolean;
}

/**
* Represents the request body for setting a new order of elements.
*/
interface SetFolderContentOrderPayload {
    data: SimpleBookmarkOrderNode[]
}

/**
 * *******************************************
 *             RESPONSE BODYS
 * *******************************************    
 */

type BookmarkStatus = 'success' | 'error';

interface EmptyBookmarkResponse {
    status: BookmarkStatus
}

interface BaseBookmarkItemResponse<T> {
    status: BookmarkStatus
    item: T

}
interface BaseBookmarkDataResponse<T> {
    status: BookmarkStatus
    data: T
}

type BookmarksResponse = BaseBookmarkDataResponse<Bookmark[]>

type BookmarkResponse = BaseBookmarkItemResponse<Bookmark>

type TagsResponse = string[]

type FolderTreeResponse = BaseBookmarkDataResponse<FolderTree>

type FolderResponse = BaseBookmarkItemResponse<BookmarkFolder>

type FolderHashResponse = BaseBookmarkDataResponse<strin>

type FolderContentOrderResponse = BaseBookmarkDataResponse<SimpleBookmarkOrderNode[]>

type FolderContentResponse = BaseBookmarkDataResponse<(SimpleBookmark | SimpleBookmarkFolder)[]>

type FolderContentCountResponse = BaseBookmarkItemResponse<number>

type FolderShareResponse = BaseBookmarkItemResponse<FolderShare>

type FolderSharesResponse = BaseBookmarkDataResponse<FolderShare[]>



