import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Book } from "../../Models/Book";
import { User } from "../../Models/User";
import { FavoriteBookAddedAction } from "../../Redux/FavoritesAppState";
import store from "../../Redux/Store";
import { addFavoriteBook } from "../../Utils/ApiArea/BookApi";
import notify, { ErrMsg, SccMsg } from "../../Utils/Notification/Notify";

interface BookItemProps {
  book: Book;
}

function BookItem(props: BookItemProps) {
  const [user, setUser] = useState<User>(store.getState().auth.user);

  const location = useLocation();

  const navigate = useNavigate();

  const addToFavorite = () => {
    addFavoriteBook(props.book.id)
      .then(() => {
        store.dispatch(FavoriteBookAddedAction(props.book));
        notify.success(SccMsg.ADDED_BOOK);
        navigate("/favorite-books");
      })
      .catch(() => notify.error(ErrMsg.FAIL_ADDED_BOOK));
  };

  return (
    <div>
      <p>ID: {props.book.id}</p>
      <p>Name: {props.book.name}</p>
      <p>Release Year: {props.book.year}</p>

      {props.book.author ? <p>Author: {props.book.author?.name}</p> : <></>}

      <>
        {user.role === "ADMIN" ? (
          <>
            <Link to={`/update-book/${props.book.id}`}>Update</Link>
            <Link to={`/delete-book/${props.book.id}`}>Delete</Link>
          </>
        ) : (
          <>
            {store
              .getState()
              .favorites.favoriteBooks.filter(
                (b) => b.id === props.book.id
              )[0] ? (
              <>
                {!location.pathname.includes("favorite-books") ? (
                  <h4>Already in your favorites!</h4>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <button onClick={addToFavorite}>Add to Favorites</button>
            )}
          </>
        )}
      </>
    </div>
  );
}

export default BookItem;
