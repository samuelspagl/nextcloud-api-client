
const bookmarkPrefix = '/index.php/apps/bookmarks'

export const pathBookmark:string =                                          `${bookmarkPrefix}/public/rest/v2/bookmark
`
export const pathBookmarkById = (bookmarkId: number): string =>             `${bookmarkPrefix}/public/rest/v2/bookmark/${bookmarkId}`
export const pathBookmarkImage = (bookmarkId: number) =>                    `${bookmarkPrefix}/public/rest/v2/bookmark/${bookmarkId}/image`
export const pathBookmarkFavicon = (bookmarkId: number) =>                  `${bookmarkPrefix}/public/rest/v2/bookmark/${bookmarkId}/favicon`
export const pathBookmarkClicked =                                          `${bookmarkPrefix}/public/rest/v2/bookmark/click`

export const pathTag: string =                                              `${bookmarkPrefix}/public/rest/v2/tag`
export const pathTagByName = (tagName: string) =>                               `${bookmarkPrefix}/public/rest/v2/tag/${tagName}`

export const pathFolder =                                                   `${bookmarkPrefix}/public/rest/v2/folder`
export const pathFolderById = (folderId: number) =>                         `${bookmarkPrefix}/public/rest/v2/folder/${folderId}`
export const pathFolderByIdHash = (folderId: number) =>                     `${bookmarkPrefix}/public/rest/v2/folder/${folderId}/hash`
export const pathFolderBookmark = (folderId: number, bookmarkId: number) => `${bookmarkPrefix}/public/rest/v2/folder/${folderId}/bookmarks/${bookmarkId}`
export const pathFolderChildOrder = (folderId: number) =>                   `${bookmarkPrefix}/public/rest/v2/folder/${folderId}/childorder`
export const pathFolderContent = (folderId: number) =>                      `${bookmarkPrefix}/public/rest/v2/folder/${folderId}/children`
export const pathFolderContentCount = (folderId: number) =>                 `${bookmarkPrefix}/public/rest/v2/folder/${folderId}/count`
export const pathFolderShare = (folderId: number) =>                        `${bookmarkPrefix}/public/rest/v2/folder/${folderId}/shares`

export const pathShareById = (shareId: number) =>                           `${bookmarkPrefix}/public/rest/v2/share/${shareId}`

export const pathClientLock =                                               `${bookmarkPrefix}/public/rest/v2/lock`