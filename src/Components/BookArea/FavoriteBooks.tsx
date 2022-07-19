import React, { useEffect, useState } from 'react'
import { Author } from '../../Models/Author'
import { Book } from '../../Models/Book';
import { FavoriteBooksDownloadedAction } from '../../Redux/FavoritesAppState';
import store from '../../Redux/Store'
import { getFavoriteBooks } from '../../Utils/ApiArea/BookApi';
import EmptyView from '../SharedArea/EmptyView';
import BookItem from './BookItem';

function FavoriteBooks() {

    const [books, setBooks] = useState<Book[]>(store.getState().favorites.favoriteBooks);

    useEffect(() => {

        if (!store.getState().favorites.favoriteBooksRead) {
            getFavoriteBooks()
            .then(response => {
                setBooks(response.data)
                store.dispatch(FavoriteBooksDownloadedAction(response.data))
                
            })
        .catch(() => {})
        }
    }, [])

  return (
      <div>
          {books.length > 0 ? books.map(b => <BookItem key={b.id} book={b}/>) : <EmptyView/>}
    </div>
  )
}

export default FavoriteBooks