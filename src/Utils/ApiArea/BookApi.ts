import axios from "axios"
import { Book } from "../../Models/Book"
import globals from "./Globals"

export const addBook = async (book: Book) => {
    return await axios.post<Book>(`${globals.urls.books}`, book)
}

export const updateBook = async (book: Book) => {
    return await axios.put<Book>(`${globals.urls.books}`, book)
}

export const deleteBook = async (id: number) => {
    return await axios.delete<any>(`${globals.urls.books}${id}`)
}

export const getBooks = async () => {
    return await axios.get<Book[]>(`${globals.urls.books}`)
}

export const getBooksAuthor = async (id: number) => {
    return await axios.get<Book[]>(`${globals.urls.books}${id}`)
}