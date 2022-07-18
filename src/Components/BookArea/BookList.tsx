import React, { useEffect, useState } from "react";
import { Book } from "../../Models/Book";
import { BookDownloadedAction } from "../../Redux/BookAppState";
import store from "../../Redux/Store";
import { getBooks } from "../../Utils/ApiArea/BookApi";
import notify, { ErrMsg, SccMsg } from "../../Utils/Notification/Notify";
import EmptyView from "../SharedArea/EmptyView";
import BookItem from "./BookItem";

function BookList() {
  const [books, setBooks] = useState<Book[]>(store.getState().books.Books);

  useEffect(() => {
    if (!store.getState().books.isRead) {
      getBooks()
        .then((res) => {
          setBooks(res.data);
          store.dispatch(BookDownloadedAction(res.data));
          notify.success(SccMsg.GOT_BOOK);
        })
        .catch(() => notify.error(ErrMsg.FAIL_GOT_BOOK));
    }

    return store.subscribe(() => {
      setBooks(store.getState().books.Books);
    });

  }, []);

    

  return (
    <div>
      {books.length > 0 ? (
        books.map((book) => <BookItem key={book.id} book={book} />)
      ) : (
        <EmptyView />
      )}
    </div>
  );
}

export default BookList;
