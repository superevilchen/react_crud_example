import { Author } from "../Models/Author";

// Step 1 - Create AppState and manage the collection once and in a centralize place
export class AuthorAppState {
    public authors: Author[] = [];
    public isRead: boolean = false;
}

// Step 2 - Define all possible action for your application state
export enum AuthorActionType {
    AuthorsDownloaded = "AuthorsDownloaded",
    AuthorAdded = "AuthorAdded",
    AuthorUpdated = "AuthorUpdated",
    AuthorDeleted = "AuthorDeleted",
    AuthorsRead = "AuthorsRead",
    AuthorsClear = "AuthorsClear"
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface AuthorAction {
    type: AuthorActionType;
    payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function authorDownloadedAction(authors: Author[]): AuthorAction {
    return { type: AuthorActionType.AuthorsDownloaded, payload: authors };
}

export function authorsAddedAction(author: Author): AuthorAction {
    return { type: AuthorActionType.AuthorAdded, payload: author };
}

export function authorsUpdatedAction(author: Author): AuthorAction {
    return { type: AuthorActionType.AuthorUpdated, payload: author };
}

export function authorsDeletedAction(id:number): AuthorAction {
    return { type: AuthorActionType.AuthorDeleted, payload: id };
}

export function authorsReadAction(): AuthorAction {
    return { type: AuthorActionType.AuthorsRead };
}

export function AuthorsClearAction(): AuthorAction {
    return { type: AuthorActionType.AuthorsClear };
}

// Step 5 - Reducer function perform the required action
export function authorReducer(currentState: AuthorAppState = new AuthorAppState(),action:AuthorAction): AuthorAppState{
    // const newState = new CatsAppState();
    // newState.cats = currentState.cats;

    const newState = {...currentState} //Spread Operator
    switch(action.type){
        case AuthorActionType.AuthorsDownloaded:
            newState.authors = action.payload;
            newState.isRead = true;
            break;
        case AuthorActionType.AuthorAdded:
            newState.authors.push(action.payload);
            break;
        case AuthorActionType.AuthorUpdated:
         const idx = newState.authors.findIndex(author => author.id === action.payload.id);
            newState.authors[idx] = action.payload; 
            break
            case AuthorActionType.AuthorDeleted:
                newState.authors = newState.authors.filter(c=>c.id !== action.payload);
            break
        case AuthorActionType.AuthorsRead:
            newState.isRead = false;
            break;
            case AuthorActionType.AuthorsClear:
                newState.authors = [];
                break;
    }
    return newState;
    
}