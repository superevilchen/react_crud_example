import { Author } from "../Models/Author";
import { Book } from "../Models/Book";

// Step 1 - Create AppState and manage the collection once and in a centralize place
export class FavoriteAppState {
  public favoriteBooks: Book[] = [];
  public favoriteAuthors: Author[] = [];
}

// Step 2 - Define all possible action for your application state
export enum FavoriteActionType {
  FavoriteBooksDownloaded = "FavoriteBooksDownloaded",
  FavoriteAuthorsDownloaded = "FavoriteAuthorsDownloaded",
  FavoriteBookAdded = "FavoriteBookAdded",
  FavoriteAuthorAdded = "FavoriteAuthorAdded",
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface FavoriteAction {
  type: FavoriteActionType;
  payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function FavoriteBooksDownloadedAction(books: Book[]): FavoriteAction {
  return { type: FavoriteActionType.FavoriteBooksDownloaded, payload: books };
}

export function FavoriteAuthorsDownloaded(authors: Author[]): FavoriteAction {
  return {
    type: FavoriteActionType.FavoriteAuthorsDownloaded,
    payload: authors,
  };
}

export function FavoriteBookAddedAction(book: Book): FavoriteAction {
  return { type: FavoriteActionType.FavoriteBookAdded, payload: book };
}

export function FavoriteAuthorAddedAction(author: Author): FavoriteAction {
  return { type: FavoriteActionType.FavoriteAuthorAdded, payload: author };
}

// Step 5 - Reducer function perform the required action
export function catsReducer(
  currentState: FavoriteAppState = new FavoriteAppState(),
  action: FavoriteAction
): FavoriteAppState {
  // const newState = new CatsAppState();
  // newState.cats = currentState.cats;

  const newState = { ...currentState }; //Spread Operator
  switch (action.type) {
    case FavoriteActionType.FavoriteBooksDownloaded:
      newState.favoriteBooks = action.payload;
      break;

    case FavoriteActionType.FavoriteAuthorsDownloaded:
      newState.favoriteAuthors = action.payload;
      break;

    case FavoriteActionType.FavoriteBookAdded:
      newState.favoriteBooks.push(action.payload);
      break;

    case FavoriteActionType.FavoriteAuthorAdded:
      newState.favoriteAuthors.push(action.payload);
      break;
  }
  return newState;
}
