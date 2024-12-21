import { FetchResponse, ResolvedFetchOptions } from "ofetch";
import { AclRuleResponse, AssignUserResponse, Attachment, Board, Card, CreateAclRulePayload, CreateBoardPayload, CreateCardPayload, CreateLabelPayload, CreateStackPayload, DeckSettings, Label, ReorderCardPayload, Stack, UpdateBoardPayload, UpdateCardPayload, UpdateLabelPayload, UpdateStackPayload } from "../../types/deckTypes";
import { BaseApiClient } from "../../util/baseClient";
import { ApiError } from "../../util/error";
import { pathBoardAcl, pathBoardAclById, pathBoardById, pathBoards, pathBoardUndoDelete, pathCardAssignLabel, pathCardAttachements, pathCardAttachementsById, pathCardById, pathCardRestoreAttachementsById, pathCards, pathLabelById, pathLabels, pathStacks, pathStacksArchived, pathStacksById } from "./deckPaths";
import { DeckError } from "./deckError";

export class DeckClient extends BaseApiClient{

    // ------------------------------
    //             Boards
    // ------------------------------

    async getBoards(details: boolean): Promise<Board[]>{
        return await this.get<Board[], {details: boolean}>(pathBoards, {details: details})
    }

    async createBoard(payload: CreateBoardPayload): Promise<Board>{
        return await this.post<CreateBoardPayload, Board>(pathBoards, payload)
    }

    async getBoard(boardId: number): Promise<Board>{
        return await this.get<Board, null>(pathBoardById(boardId))
    }

    async updateBoard(boardId: number, payload: UpdateBoardPayload): Promise<Board>{
        return await this.put<UpdateBoardPayload, Board>(pathBoardById(boardId), payload)
    }

    async deleteBoard(boardId: number): Promise<void>{
        return await this.delete<void>(pathBoardById(boardId))
    }

    async undoDeleteBoard(boardId: number): Promise<void>{
        return await this.post<null, void>(pathBoardUndoDelete(boardId), null)
    }

    async createShare(boardId: number, payload: CreateAclRulePayload): Promise<AclRuleResponse>{
        return await this.post<CreateAclRulePayload, AclRuleResponse>(pathBoardAcl(boardId), payload)
    }

    async updateShare(boardId: number, aclId: number, payload: CreateAclRulePayload): Promise<AclRuleResponse>{
        return await this.put<CreateAclRulePayload, AclRuleResponse>(pathBoardAclById(boardId, aclId), payload)
    }

    async deleteShare(boardId: number, aclId: number): Promise<void>{
        return await this.delete<void>(pathBoardAclById(boardId, aclId))
    }

    // ------------------------------
    //             Stacks
    // ------------------------------

    async getStacks(boardId: number): Promise<Stack[]>{
        return await this.get<Stack[], null>(pathStacks(boardId))
    }

    async getArchivedStacks(boardId: number): Promise<Stack[]>{
        return await this.get<Stack[], null>(pathStacksArchived(boardId))
    }

    async createStack(boardId: number, payload: CreateStackPayload): Promise<Stack>{
        return await this.post<CreateStackPayload, Stack>(pathStacks(boardId), payload)
    }

    async getStack(boardId: number, stackId: number): Promise<Stack>{
        return await this.get<Stack, null>(pathStacksById(boardId, stackId))
    }

    async updateStack(boardId: number, stackId: number, payload: UpdateStackPayload): Promise<Stack>{
        return await this.put<UpdateStackPayload, Stack>(pathStacksById(boardId, stackId), payload)
    }

    async deleteStack(boardId: number, stackId: number): Promise<void>{
        return await this.delete<void>(pathStacksById(boardId, stackId))
    }

    // ------------------------------
    //              Cards
    // ------------------------------

    async createCard(boardId: number, stackId: number, payload: CreateCardPayload): Promise<Card>{
        return await this.post<CreateCardPayload, Card>(pathCards(boardId, stackId), payload)
    }

    async getCard(boardId: number, stackId: number, cardId: number): Promise<Card>{
        return await this.get<Card, null>(pathCardById(boardId, stackId, cardId))
    }
     
    async updateCard(boardId: number, stackId: number, cardId: number, payload: UpdateCardPayload): Promise<Card>{      
        return await this.put<UpdateCardPayload, Card>(pathCardById(boardId, stackId, cardId), payload)
    }

    async deleteCard(boardId: number, stackId: number, cardId: number): Promise<void>{
        return await this.delete<void>(pathCardById(boardId, stackId, cardId))
    }

    async assignLabelToCard(boardId: number, stackId: number, cardId: number, labelId: number): Promise<void>{
        return await this.put<{labelId: number}, void>(pathCardAssignLabel(boardId, stackId, cardId), {labelId})
    }

    async removeLabelFromCard(boardId: number, stackId: number, cardId: number, labelId: number): Promise<void>{
        return await this.put<{labelId: number}, void>(pathCardAssignLabel(boardId, stackId, cardId), {labelId})
    }

    async assignUserToCard(boardId: number, stackId: number, cardId: number, userId: string): Promise<AssignUserResponse>{
        return await this.put<{userId: string}, AssignUserResponse>(pathCardAssignLabel(boardId, stackId, cardId), {userId})
    }

    async removeUserFromCard(boardId: number, stackId: number, cardId: number, userId: string): Promise<void>{
        return await this.put<{userId: string}, void>(pathCardAssignLabel(boardId, stackId, cardId), {userId})
    }

    async reorderCard(boardId: number, stackId: number, cardId: number, payload: ReorderCardPayload): Promise<void>{
        return await this.put<{order: number}, void>(pathCardAssignLabel(boardId, stackId, cardId), payload)
    }

    // ------------------------------
    //             Labels
    // ------------------------------

    async getLabel(boardId: number, labelId: number): Promise<Label>{
        return await this.get<Label, null>(pathLabelById(boardId, labelId))
    }

    async createLabel(boardId: number, payload: CreateLabelPayload): Promise<Label>{
        return await this.post<CreateLabelPayload, Label>(pathLabels(boardId), payload)
    }

    async updateLabel(boardId: number, labelId: number, payload: UpdateLabelPayload): Promise<Label>{
        return await this.put<UpdateLabelPayload, Label>(pathLabelById(boardId, labelId), payload)
    }

    async deleteLabel(boardId: number, labelId: number): Promise<void>{
        return await this.delete<void>(pathLabelById(boardId, labelId))
    }

    // ------------------------------
    //          Attachements
    // ------------------------------

    async getCardAttachements(boardId: number, stackId: number, cardId: number): Promise<Attachment[]>{
        return await this.get<Attachment[], null>(pathCardAttachements(boardId, stackId, cardId))
    }

    async getCardAttachement(boardId: number, stackId: number, cardId: number, attachementId: number): Promise<Attachment>{
        return await this.get<Attachment, null>(pathCardAttachementsById(boardId, stackId, cardId, attachementId))
    }

    async uploadCardAttachement(boardId: number, stackId: number, cardId: number, file: Blob): Promise<void>{
        return await this.post<{type: 'file', file: Blob}, void>(pathCardAttachements(boardId, stackId, cardId), {type: 'file', file: file})
    }

    async updateCardAttachement(boardId: number, stackId: number, cardId: number, attachementId: number, file: Blob): Promise<void>{
        return await this.put<{type: 'file', file: Blob}, void>(pathCardAttachementsById(boardId, stackId, cardId, attachementId), {type: 'file', file: file})
    }

    async deleteCardAttachement(boardId: number, stackId: number, cardId: number, attachementId: number): Promise<void>{
        return await this.delete<void>(pathCardAttachementsById(boardId, stackId, cardId, attachementId))
    }

    async restoreCardAttachement(boardId: number, stackId: number, cardId: number, attachementId: number): Promise<void>{
        return await this.put<null, void>(pathCardRestoreAttachementsById(boardId, stackId, cardId, attachementId), null)
    }

    // ------------------------------
    //          OCS Config
    // ------------------------------

    async getConfig(): Promise<DeckSettings>{
        return await this.ocsGet<DeckSettings, null>('/api/v1.0/config')
    }

    async updateConfigKey(configId: string, key: string, value: string): Promise<void>{
        // TODO: Implement this method
        throw Error("Not implemented")
    }

    override async buildOcsErrorObject(request: RequestInfo, response: FetchResponse<any>, options: ResolvedFetchOptions): Promise<ApiError>{
        console.log("DeckClient.buildOcsErrorObject", request, response, options)
        console.log(await response.text())
        return new DeckError({
          code: response.status,
          message: response._data.message,
          url: request.toString(),
          timestamp: new Date().toISOString(),
          details: response._data
        })
      }
}