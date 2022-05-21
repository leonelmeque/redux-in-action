import { ReceveiEntitiesAction, SchemaActions } from "../actions/schema-actions";

export const receiveEntities = (entities:any):ReceveiEntitiesAction => (
    {
        type: SchemaActions.RECEIVE_ENTITIES,
        payload: entities
    }
)