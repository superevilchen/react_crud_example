import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Author } from '../../Models/Author';
import store from '../../Redux/Store';
import { getAuthors } from '../../Utils/ApiArea/AuthorApi';
import { authorDownloadedAction } from '../../Redux/AuthorAppState';
import { Book } from '../../Models/Book';
import { addBook } from '../../Utils/ApiArea/BookApi';
import { BooksAddedAction } from '../../Redux/BookAppState';
import notify, { ErrMsg, SccMsg } from '../../Utils/Notification/Notify';
import { useNavigate } from 'react-router-dom';


function AddBook() {

    const [authors, setAuthors] = useState<Author[]>(store.getState().authors.authors);

    const navigate = useNavigate();

    useEffect(() => {
       
        if (!store.getState().authors.isRead) {
            getAuthors()
                .then((res) => {
                    setAuthors(res.data)
                    store.dispatch(authorDownloadedAction(res.data))
                })
        }
        
    }, [])

    const bookSchema = yup.object().shape({
        name: yup.string().required("Please insert a name"),
        year: yup.number().min(0).typeError("Insert a number").required("Please insert a year"),
        author: yup.string().required("Please insert a author"),
      })

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<any>({
        resolver: yupResolver(bookSchema),
        mode: "all",
    });

    const sendToRemote = (book: any) => {

        let bookToRemote: Book = new Book(0, book.name, book.year, authors.filter(a => a.name === book.author)[0])
        
        console.log(bookToRemote)

        addBook(bookToRemote)
            .then((response) => {
                store.dispatch(BooksAddedAction(response.data))
                notify.success(SccMsg.ADDED_BOOK)
                navigate("/books")
            })
            .catch(() => {
                notify.error(ErrMsg.FAIL_ADDED_BOOK)
            })

    }

    return (
        <div>
            <form onSubmit={handleSubmit(sendToRemote)}>
                <span>Name of Book: </span>
                <input type="text" {...register("name")} />
                {/* <span>{ errors.name?.message}</span> */}
                <span>Year of Release: </span>
                <input type="number" {...register("year")} />
                {/* <span>{errors.year?.message}</span> */}
                <span>Author: </span>
                <select {...register("author")}>
                    {authors.map(author => <option key={author.id}>{ author.name }</option>)}
                </select>
                <input type="submit" placeholder="Add Book"/>
            </form>
        </div>
  )
}

export default AddBook