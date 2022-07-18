import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Author } from "../../Models/Author";
import { Book } from "../../Models/Book";
import { authorDownloadedAction } from "../../Redux/AuthorAppState";
import { BooksAddedAction, BooksUpdatedAction } from "../../Redux/BookAppState";
import store from "../../Redux/Store";
import { getAuthors } from "../../Utils/ApiArea/AuthorApi";
import { addBook, updateBook } from "../../Utils/ApiArea/BookApi";
import notify, { ErrMsg, SccMsg } from "../../Utils/Notification/Notify";
import * as yup from "yup";
import { useFormState, useForm } from "react-hook-form";

function UpdateBook() {
  const params = useParams();
  const id = +(params.id || "");

  const navigate = useNavigate();

  const [book, setBook] = useState<Book>(
    store.getState().books.Books.filter((b) => b.id === id)[0]
  );
  const [authors, setAuthors] = useState<Author[]>(
    store.getState().authors.authors
  );

  useEffect(() => {
    if (!store.getState().authors.isRead) {
      getAuthors().then((res) => {
        setAuthors(res.data);
        store.dispatch(authorDownloadedAction(res.data));
      });
    }
  }, []);

  const bookSchema = yup.object().shape({
    name: yup.string().required("Please insert a name"),
    year: yup
      .number()
      .min(0)
      .typeError("Insert a number")
      .required("Please insert a year"),
    author: yup.string().required("Please insert a author"),
  });

  let defaultValuesObj = { ...book };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<Book>({
    defaultValues: defaultValuesObj,
    mode: "all",
    resolver: yupResolver(bookSchema),
  });

  const { dirtyFields } = useFormState({
    control,
  });

  const sendToRemote = (book: any) => {
    let bookToRemote: Book = new Book(
      id,
      book.name,
      book.year,
      authors.filter((a) => a.name === book.author)[0]
    );

    console.log(bookToRemote);

    updateBook(bookToRemote)
      .then((response) => {
        store.dispatch(BooksUpdatedAction(response.data));
        notify.success(SccMsg.UPDATED_BOOK);
        navigate("/books");
      })
      .catch(() => {
        notify.error(ErrMsg.FAIL_UPDATED_BOOK);
      });
  };

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
          {authors.map((author) => (
            <option key={author.id}>{author.name}</option>
          ))}
        </select>
        <input type="submit" placeholder="Add Book" disabled={!isDirty} />
      </form>
    </div>
  );
}

export default UpdateBook;
