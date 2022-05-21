import { ExtendsActionType } from "../types/shared";

enum SchemaActionsEnums {
    RECEIVE_ENTITIES = "RECEIVE_ENTITIES"
}

export const SchemaActions = {...SchemaActionsEnums}

export interface ReceveiEntitiesAction extends ExtendsActionType<SchemaActionsEnums>{
    payload: any
}