import axios from "axios";
import { Book } from "../../Models/Book";
import TokenAxios from "../Interceptors/TokenAxios";
import globals from "./Globals";

export const addBook = async (book: Book) => {
  return await TokenAxios.post<Book>(`${globals.urls.books}`, book);
};

export const updateBook = async (book: Book) => {
  return await TokenAxios.put<Book>(`${globals.urls.books}`, book);
};

export const deleteBook = async (id: number) => {
  return await TokenAxios.delete<any>(`${globals.urls.books}${id}`);
};

export const getBooks = async () => {
  return await axios.get<Book[]>(`${globals.urls.books}`);
};

export const getBooksAuthor = async (id: number) => {
  return await axios.get<Book[]>(`${globals.urls.books}${id}`);
};

export const addFavoriteBook = async (bookID: number) => {
  return await TokenAxios.post<any>(`${globals.urls.books}favorite/${bookID}`);
};

export const getFavoriteBooks = async () => {
  return await TokenAxios.get<Book[]>(`${globals.urls.books}all-favorites)`);
}