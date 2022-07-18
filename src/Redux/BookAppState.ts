import { Book } from "../Models/Book";

// Step 1 - Create AppState and manage the collection once and in a centralize place
export class BookAppState {
    public Books: Book[] = [];
    public isRead: boolean = false;
}

// Step 2 - Define all possible action for your application state
export enum BookActionType {
    BooksDownloaded = "BooksDownloaded",
    BookAdded = "BookAdded",
    BookUpdated = "BookUpdated",
    BookDeleted = "BookDeleted",
    BooksRead = "BooksRead",
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface BookAction {
    type: BookActionType;
    payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function BookDownloadedAction(Books: Book[]): BookAction {
    return { type: BookActionType.BooksDownloaded, payload: Books };
}

export function BooksAddedAction(Book: Book): BookAction {
    return { type: BookActionType.BookAdded, payload: Book };
}

export function BooksUpdatedAction(Book: Book): BookAction {
    return { type: BookActionType.BookUpdated, payload: Book };
}

export function BooksDeletedAction(id:number): BookAction {
    return { type: BookActionType.BookDeleted, payload: id };
}

export function BooksReadAction(): BookAction {
    return { type: BookActionType.BooksRead };
}

// Step 5 - Reducer function perform the required action
export function bookReducer(currentState: BookAppState = new BookAppState(),action:BookAction): BookAppState{
    // const newState = new CatsAppState();
    // newState.cats = currentState.cats;

    const newState = {...currentState} //Spread Operator
    switch(action.type){
        case BookActionType.BooksDownloaded:
            newState.Books = action.payload;
            newState.isRead = true;
            break;
        case BookActionType.BookAdded:
            newState.Books.push(action.payload);
            break;
        case BookActionType.BookUpdated:
         const idx = newState.Books.findIndex(book => book.id === action.payload.id);
            newState.Books[idx] = action.payload; 
            break
            case BookActionType.BookDeleted:
                newState.Books = newState.Books.filter(c=>c.id !== action.payload);
            break
        case BookActionType.BooksRead:
            newState.isRead = false;
            break;
    }
    return newState;
    
}