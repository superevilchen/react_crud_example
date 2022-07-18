import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Author } from "../../Models/Author";
import { Book } from "../../Models/Book";
import { AuthorBooksDownloadedAction } from "../../Redux/BookAppState";
import store from "../../Redux/Store";
import { getBooksAuthor } from "../../Utils/ApiArea/BookApi";
import notify, { ErrMsg, SccMsg } from "../../Utils/Notification/Notify";
import AuthorItem from "../AuthorArea/AuthorItem";
import EmptyView from "../SharedArea/EmptyView";
import BookItem from "./BookItem";

function BooksByAuthor() {
  const params = useParams();
  const id = +(params.id || "");

  const [books, setBooks] = useState<Book[]>(
    store.getState().books.authorBooks
  );
    
    const [author, setAuthor] = useState<Author>(store.getState().authors.authors.filter(a => a.id === id)[0])

  useEffect(() => {
    if (!store.getState().books.authorBooksIsRead) {
      getBooksAuthor(id)
        .then((response) => {
          setBooks(response.data);
          store.dispatch(AuthorBooksDownloadedAction(response.data));
          notify.success(SccMsg.GOT_BOOK);
        })
        .catch(() => notify.error(ErrMsg.FAIL_GOT_BOOK));
    }
  });

    return <div>
        <h2>Books written by {author.name}:</h2>
        {books.length > 0 ? books.map(book => <BookItem key={book.id} book={book} />) : <EmptyView />}
        
        <br />
        <h2>More info about this author:</h2>
        <AuthorItem author={author}/>
  </div>
}

export default BooksByAuthor;
