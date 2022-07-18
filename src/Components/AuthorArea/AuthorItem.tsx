import moment from "moment";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Author } from "../../Models/Author";

interface AuthorItemProps {
  author: Author;
}

function AuthorItem(props: AuthorItemProps) {
  const location = useLocation();

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

          <Link to={`/update-author/${props.author.id}`}>Update</Link>
          <Link to={`/delete-author/${props.author.id}`}>Delete</Link>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AuthorItem;
