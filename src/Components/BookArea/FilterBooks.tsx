import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Book } from '../../Models/Book';
import store from '../../Redux/Store';
import BookItem from './BookItem';

function FilterBooks() {

    const params = useParams();
    const action = params.action || ""; // get the starting price from url

    const [filter, setFilter] = useState<string>(action)
    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        let filterToNum = +filter; // convert filter to num
        setBooks(store.getState().books.Books.filter(b => b.year === filterToNum))
    }, [filter])

  return (
      <div>
          <h2>Books from the same year!</h2>
          <input value={filter} onChange={e => setFilter(e.target.value)}  placeholder="search by year"/>
          
          {books.map(b => <BookItem key={b.id} book={b}/>)}
    </div>
  )
}

export default FilterBooks