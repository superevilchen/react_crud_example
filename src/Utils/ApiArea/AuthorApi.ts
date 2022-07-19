import axios from "axios";
import { Author } from "../../Models/Author";
import TokenAxios from "../Interceptors/TokenAxios";
import globals from "./Globals";

export const addAuthor = async (author: Author) => {
  return await TokenAxios.post<Author>(`${globals.urls.authors}`, author);
};

export const updateAuthor = async (author: Author) => {
  return await TokenAxios.put<Author>(`${globals.urls.authors}`, author);
};

export const deleteAuthor = async (id: number) => {
  return await TokenAxios.delete<any>(`${globals.urls.authors}${id}`);
};

export const getAuthors = async () => {
  return await axios.get<Author[]>(`${globals.urls.authors}`);
};

export const addFavoriteAuthor = async (authorID: number) => {
  return await TokenAxios.post<any>(
    `${globals.urls.authors}favorite/${authorID}`
  );
};
