import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthAppState";
import { authorReducer } from "./AuthorAppState";
import { bookReducer } from "./BookAppState";

// Single Reducer
//const store = createStore(catsReducer);

// For getting data
//const xys = store.getState().cats;

//Multiple catsReducer
const reducers = combineReducers({
  authors: authorReducer,
  books: bookReducer,
  auth: authReducer,
});
const store = createStore(reducers);

// For getting data
//const xyz = store.getState().catState.cats;

export default store;
