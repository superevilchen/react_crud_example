import axios from "axios"
import { Author } from "../../Models/Author"
import globals from "./Globals"

export const addAuthor = async (author: Author) => {
    return await axios.post<Author>(`${globals.urls.authors}`, author)
}

export const updateAuthor = async (author: Author) => {
    return await axios.put<Author>(`${globals.urls.authors}`, author)
}

export const deleteAuthor = async (id: number) => {
    return await axios.delete<any>(`${globals.urls.authors}${id}`)
}

export const getAuthors = async () => {
    return await axios.get<Author[]>(`${globals.urls.authors}`)
}