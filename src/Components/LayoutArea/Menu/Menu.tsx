import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../../Models/User";
import store from "../../../Redux/Store";
import { useAuthorizedUser } from "../../../Utils/CustomHooks/useAuthorizedUser";

function Menu() {
  const [user, setUser] = useState<User>(store.getState().auth.user);
  useAuthorizedUser();

  useEffect(() => {
    return store.subscribe(() => {
      setUser(store.getState().auth.user);
    });
  });

  return (
    <div className="Menu">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>

      <Link to="/authors">All Authors</Link>
      <Link to="/books">All Books</Link>

      {user.role === "ADMIN" ? (
        <>
          <Link to="/add-author">Add New Author</Link>
          <Link to="/add-book">Add New Book</Link>
        </>
      ) : (
        <></>
      )}

      {user.role === 'USER' ?
        <>
        <Link to="/favorite-authors">Favorite Authors</Link>
      <Link to="/favorite-books">Favorite Books</Link>
        </>
        : <></>}
      
    </div>
  );
}

export default Menu;
