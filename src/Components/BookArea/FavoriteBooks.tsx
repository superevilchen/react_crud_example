import React, { useEffect, useState } from 'react'
import { Author } from '../../Models/Author'
import { Book } from '../../Models/Book';
import { FavoriteBooksDownloadedAction } from '../../Redux/FavoritesAppState';
import store from '../../Redux/Store'
import { getFavoriteBooks } from '../../Utils/ApiArea/BookApi';
import notify, { ErrMsg, SccMsg } from '../../Utils/Notification/Notify';
import BookItem from './BookItem';

function FavoriteBooks() {

    const [books, setBooks] = useState<Book[]>(store.getState().favorites.favoriteBooks);

    useEffect(() => {

        if (!store.getState().favorites.favoriteBooksRead) {
            getFavoriteBooks()
            .then(response => {
                setBooks(response.data)
                store.dispatch(FavoriteBooksDownloadedAction(response.data))
                notify.success(SccMsg.GOT_BOOK)
            })
        .catch(() => {notify.error(ErrMsg.FAIL_GOT_BOOK)})
        }
    }, [])

  return (
      <div>
          {books.length > 0 ? books.map(b => <BookItem key={b.id} book={b}/>) : <h3>You didn't add anything yet!!</h3>}
    </div>
  )
}

export default FavoriteBooks