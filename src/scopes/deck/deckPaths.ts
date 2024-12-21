const apiPrefix = "/index.php/apps/deck/api/v1.0"

export const pathBoards = `${apiPrefix}/boards`
export const pathBoardById = (boardId: number) => `${apiPrefix}/boards/${boardId}`
export const pathBoardUndoDelete = (boardId: number) => `${apiPrefix}/boards/${boardId}/undo_delete` 
export const pathBoardAcl = (boardId: number) => `${apiPrefix}/boards/${boardId}/acl`
export const pathBoardAclById = (boardId: number, aclId: number) => `${apiPrefix}/boards/${boardId}/acl/${aclId}`

export const pathStacks = (boardId: number) => `${apiPrefix}/boards/${boardId}/stacks`
export const pathStacksArchived = (boardId: number) => `${apiPrefix}/boards/${boardId}/stacks/archived`
export const pathStacksById = (boardId: number, stackId: number) => `${apiPrefix}/boards/${boardId}/stacks/${stackId}`

export const pathCards = (boardId: number, stackId: number) => `${apiPrefix}/boards/${boardId}/stacks/${stackId}/cards`
export const pathCardById = (boardId: number, stackId: number, cardId: number) => `${apiPrefix}/boards/${boardId}/stacks/${stackId}/cards/${cardId}`
export const pathCardAssignLabel = (boardId: number, stackId: number, cardId: number) => `${apiPrefix}/boards/${boardId}/stacks/${stackId}/cards/${cardId}/assignLabel`
export const pathCardRemoveLabel = (boardId: number, stackId: number, cardId: number) => `${apiPrefix}/boards/${boardId}/stacks/${stackId}/cards/${cardId}/removeLabel`
export const pathCardAssignUser = (boardId: number, stackId: number, cardId: number) => `${apiPrefix}/boards/${boardId}/stacks/${stackId}/cards/${cardId}/assignUser`
export const pathCardUnassignUser = (boardId: number, stackId: number, cardId: number) => `${apiPrefix}/boards/${boardId}/stacks/${stackId}/cards/${cardId}/unassignUser`
export const pathCardReorder = (boardId: number, stackId: number, cardId: number) => `${apiPrefix}/boards/${boardId}/stacks/${stackId}/cards/${cardId}/reorder`
export const pathCardAttachements = (boardId: number, stackId: number, cardId: number) => `${apiPrefix}/boards/${boardId}/stacks/${stackId}/cards/${cardId}/attachments`
export const pathCardAttachementsById = (boardId: number, stackId: number, cardId: number, attachementId: number) => `${apiPrefix}/boards/${boardId}/stacks/${stackId}/cards/${cardId}/attachments/${attachementId}`
export const pathCardRestoreAttachementsById = (boardId: number, stackId: number, cardId: number, attachementId: number) => `${apiPrefix}/boards/${boardId}/stacks/${stackId}/cards/${cardId}/attachments/${attachementId}/restore`

export const pathLabels = (boardId: number) => `${apiPrefix}/boards/${boardId}/labels`
export const pathLabelById = (boardId: number, labelId: number) => `${apiPrefix}/boards/${boardId}/labels/${labelId}`

export const pathOcsGetConfig = "/api/v1.0/config"
export const pathOcsCardComments = (cardId: number) => `/cards/${cardId}/comments`
export const pathOcsCardCommentById = (cardId: number, commentId: number) => `/cards/${cardId}/comments/${commentId}`

export const pathOcsCreateSession = "/session/create"
export const pathOcsSyncSession = "/session/sync"
export const pathOcsCloseSession = "/session/close"