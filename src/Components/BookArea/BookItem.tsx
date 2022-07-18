import React from 'react'
import { Link } from 'react-router-dom';
import { Book } from '../../Models/Book';

interface BookItemProps{
    book: Book;
}

function BookItem(props: BookItemProps) {
  return (
      <div>
          <p>ID: {props.book.id}</p>
          <p>Name: {props.book.name}</p>
          <p>Release Year: {props.book.year}</p>

          {props.book.author ?  <p>Author: {props.book.author?.name}</p> : <></>}

          <Link to={`/update-book/${props.book.id}`}>Update</Link>
      <Link to={`/delete-book/${props.book.id}`}>Delete</Link>
    </div>
  )
}

export default BookItem