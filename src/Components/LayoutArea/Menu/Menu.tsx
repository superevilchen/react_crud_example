import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div className="Menu">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>

      <Link to="/authors">All Authors</Link>
      <Link to="/add-author">Add New Author</Link>

      <Link to="/books">All Books</Link>
      <Link to="/add-book">Add New Book</Link>
    </div>
  );
}

export default Menu;
