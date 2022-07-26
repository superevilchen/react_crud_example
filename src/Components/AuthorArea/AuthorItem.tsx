import moment from "moment";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Author } from "../../Models/Author";
import { User } from "../../Models/User";
import { FavoriteAuthorAddedAction } from "../../Redux/FavoritesAppState";
import store from "../../Redux/Store";
import { addFavoriteAuthor } from "../../Utils/ApiArea/AuthorApi";
import notify, { ErrMsg, SccMsg } from "../../Utils/Notification/Notify";

interface AuthorItemProps {
  author: Author;
}

function AuthorItem(props: AuthorItemProps) {

  const [user, setUser] = useState<User>(store.getState().auth.user);
  
  const location = useLocation();

  const navigate = useNavigate();

  const addToFavorite = () => {
    addFavoriteAuthor(props.author.id)
      .then(() => {
        store.dispatch(FavoriteAuthorAddedAction(props.author))
        notify.success(SccMsg.ADDED_AUTHOR)
        navigate("/favorite-authors")
      })
    .catch(() => notify.error(ErrMsg.FAIL_ADDED_AUTHOR))
  }

  const userFunctions = (role: string) => {
    switch (role) {

      case "ADMIN":
        return (
          <>
          <Link to={`/update-author/${props.author.id}`}>Update</Link>
       <Link to={`/delete-author/${props.author.id}`}>Delete</Link>
         </>
        )
      
      case "USER":
        return (
          <>
              {store.getState().favorites.favoriteAuthors.filter(a => a.id === props.author.id)[0] ?
                <>
                
                {!location.pathname.includes("favorite-authors") ?
                <h4>Already in your favorites!</h4>
                :
                <></>}
                  
                </>
                :
                <>
                <button onClick={addToFavorite}>Add to Favorites</button>
                </>}
            </>
        )

      default:
        return (<></>)

    }
  }

  return (
    <div>
      <p>ID: {props.author.id}</p>
      <p>Name: {props.author.name}</p>
      <p>Birthday: {moment(props.author.birthday).format("LL")}</p>

      {!location.pathname.includes("books-by-author") ? (
        <>
          <button>
            <Link to={`/books-by-author/${props.author.id}`}>
              Click to view books by {props.author.name}
            </Link>
          </button>

          {userFunctions(user.role)}

        </>
      ) : (
        <></>
      )}
    </div>
  );
}
export default AuthorItem;
