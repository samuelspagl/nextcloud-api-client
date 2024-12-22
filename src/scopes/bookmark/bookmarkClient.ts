import { FetchResponse, ResolvedFetchOptions } from "ofetch"
import { BaseApiClient } from "../../util/baseClient"
import { ApiError } from "../../util/error"
import { pathBookmark, pathBookmarkById, pathBookmarkClicked, pathBookmarkFavicon, pathBookmarkImage, pathClientLock, pathFolder, pathFolderBookmark, pathFolderById, pathFolderByIdHash, pathFolderChildOrder, pathFolderContent, pathFolderContentCount, pathFolderShare, pathShareById, pathTag, pathTagByName } from "./bookmarkPaths"
import { Bookmark, BookmarkFolder, BookmarkResponse, BookmarkSearchParams, BookmarksResponse, BookmarkStatus, CreateBookmarkPayload, CreateFolderPayload, CreateFolderSharePayload, EmptyBookmarkResponse, FolderContentCountResponse, FolderContentOrderResponse, FolderContentResponse, FolderHashResponse, FolderResponse, FolderSearchParams, FolderShare, FolderShareResponse, FolderSharesResponse, FolderTree, FolderTreeResponse, SetFolderContentOrderPayload, SimpleBookmark, SimpleBookmarkFolder, SimpleBookmarkOrderNode, TagsResponse, UpdateBookmarkPayload, UpdateFolderPayload, UpdateFolderSharePayload } from "../../types/bookmarkTypes"


export class BookmarkClient extends BaseApiClient{

    // ------------------------------
    //          Bookmarks
    // ------------------------------

    async queryBookmarks(query?: BookmarkSearchParams): Promise<Bookmark[]>{
        return (await this.get<BookmarksResponse, BookmarkSearchParams>(pathBookmark, query)).data
    }

    async createBookmark(body: CreateBookmarkPayload): Promise<Bookmark>{
        return (await this.post<CreateBookmarkPayload, BookmarkResponse>(pathBookmark, body)).item
    }

    async updateBookmark(bookmarkId: number, body: UpdateBookmarkPayload): Promise<Bookmark>{
        return (await this.put<UpdateBookmarkPayload, BookmarkResponse>(pathBookmarkById(bookmarkId),body)).item
    }

    async getBookmark(bookmarkId: number): Promise<Bookmark>{
        return (await this.get<BookmarkResponse, null>(pathBookmarkById(bookmarkId))).item
    }

    async deleteBookmark(bookmarkId: number): Promise<BookmarkStatus>{
        return (await this.delete<EmptyBookmarkResponse>(pathBookmarkById(bookmarkId))).status
    }

    async getBookmarkImage(bookmarkId: number): Promise<Blob>{
        return await this.getBlob(pathBookmarkImage(bookmarkId))
    }

    async getBookmarkFavicon(bookmarkId: number): Promise<Blob>{
        return await this.getBlob(pathBookmarkFavicon(bookmarkId))
    }

    async clickBookmark(bookmarkUrl: string): Promise<BookmarkStatus>{
        return (await this.post<{url: string}, EmptyBookmarkResponse>(pathBookmarkClicked, {url: bookmarkUrl})).status
    }

    // ------------------------------
    //          Tags
    // ------------------------------

    async getTags(): Promise<string[]>{
        return await this.get<TagsResponse, null>(pathTag)
    }

    async renameTag(tagName: string, newTagName: string): Promise<BookmarkStatus>{
        return (await this.put<{name: string}, EmptyBookmarkResponse>(pathTagByName(tagName), {name: newTagName})).status
    }

    async deleteTag(tagName: string): Promise<BookmarkStatus>{
        return (await this.delete<EmptyBookmarkResponse>(pathTagByName(tagName))).status
    }

    // ------------------------------
    //          Folder
    // ------------------------------

    async getFolderTree(query?: FolderSearchParams): Promise<FolderTree>{
        return (await this.get<FolderTreeResponse, FolderSearchParams>(pathFolder, query)).data
    }

    async createFolder(body: CreateFolderPayload): Promise<BookmarkFolder>{
        return (await this.post<CreateFolderPayload, FolderResponse>(pathFolder, body)).item
    }

    async getFolder(folderId: number): Promise<BookmarkFolder>{
        return (await this.get<FolderResponse, null>(pathFolderById(folderId))).item
    }

    async updateFolder(folderId: number, body: UpdateFolderPayload): Promise<BookmarkFolder>{
        return (await this.put<UpdateFolderPayload, FolderResponse>(pathFolderById(folderId), body)).item
    }

    async hashFolder(folderId: number, fieldsToHash: string[] = []): Promise<string>{
        return (await this.get<FolderHashResponse, {fields: string[]}>(pathFolderByIdHash(folderId), {fields: fieldsToHash})).data
    }

    async deleteFolder(folderId: number): Promise<BookmarkStatus>{
        return (await this.delete<EmptyBookmarkResponse>(pathFolderById(folderId))).status
    }

    async addBookmarkToFolder(folderId: number, bookmarkId: number): Promise<BookmarkStatus>{
        return (await this.post<null,EmptyBookmarkResponse>(pathFolderBookmark(folderId, bookmarkId),null)).status
    }

    async deleteBookmarkFromFolder(folderId: number, bookmarkId: number): Promise<BookmarkStatus>{
        return (await this.delete<EmptyBookmarkResponse>(pathFolderBookmark(folderId, bookmarkId))).status
    }

    async getFolderContentOrder(folderId: number): Promise<SimpleBookmarkOrderNode[]>{
        return (await this.get<FolderContentOrderResponse, null>(pathFolderChildOrder(folderId))).data
    }

    async setFolderContentOrder(folderId: number, order: SetFolderContentOrderPayload): Promise<BookmarkStatus>{
        return (await this.patch<SetFolderContentOrderPayload, EmptyBookmarkResponse>(pathFolderChildOrder(folderId), order)).status
    }

    async getFolderContent(folderId: number, layers: number=1): Promise<(SimpleBookmark | SimpleBookmarkFolder)[]>{
        return (await this.get<FolderContentResponse, {layers: number}>(pathFolderContent(folderId), {layers: layers})).data
    }

    async getFolderContentCount(folderId: number): Promise<number>{
        return (await this.get<FolderContentCountResponse, null>(pathFolderContentCount(folderId))).item
    }

    // ------------------------------
    //          Folder
    // ------------------------------

    async createFolderShare(folderId: number, shareBody: CreateFolderSharePayload): Promise<FolderShare>{
        return (await this.post<CreateFolderSharePayload, FolderShareResponse>(pathFolderShare(folderId), shareBody)).item
    }

    async getShare(shareId: number): Promise<FolderShare>{
        return (await this.get<FolderShareResponse, null>(pathShareById(shareId))).item
    }

    async getFolderShares(folderId: number): Promise<FolderShare[]>{
        return (await this.get<FolderSharesResponse, null>(pathFolderShare(folderId))).data
    }

    async updateFolderShare(shareId: number, shareBody: UpdateFolderSharePayload): Promise<FolderShare>{
        return (await this.put<UpdateFolderSharePayload, FolderShareResponse>(pathShareById(shareId), shareBody)).item
    }

    async deleteFolderShare(shareId: number): Promise<BookmarkStatus>{
        return (await this.delete<EmptyBookmarkResponse>(pathShareById(shareId))).status
    }

    // ------------------------------
    //          Client Lock
    // ------------------------------

    async aquireClientLock(): Promise<BookmarkStatus>{
        return (await this.post<null, EmptyBookmarkResponse>(pathClientLock, null)).status
    }

    async deleteClientLock(): Promise<BookmarkStatus>{
        return (await this.delete<EmptyBookmarkResponse>(pathClientLock)).status
    }
}