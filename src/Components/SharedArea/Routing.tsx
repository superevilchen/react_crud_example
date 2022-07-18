import React from "react";
import { Route, Routes } from "react-router-dom";
import AddAuthor from "../AuthorArea/AddAuthor";
import AuthorList from "../AuthorArea/AuthorList";
import DeleteAuthor from "../AuthorArea/DeleteAuthor";
import UpdateAuthor from "../AuthorArea/UpdateAuthor";
import AddBook from "../BookArea/AddBook";
import BookList from "../BookArea/BookList";
import DeleteBook from "../BookArea/DeleteBook";
import UpdateBook from "../BookArea/UpdateBook";
import Home from "./Home";

function Routing() {
  return (
    <Routes>
      {/* home & index - must be in this order */}
      <Route path="/" element={<Home />} />
      <Route index element={<Home />} />

      {/* generic components */}
      {/* <Route path="/about" element={<About />} /> */}

      {/* auth */}
      {/* <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} /> */}

            {/* author related components */}
      <Route path="/authors" element={<AuthorList />} />
      <Route path="/add-author" element={<AddAuthor />} />
      <Route path="/update-author/:id" element={<UpdateAuthor />} />
          <Route path="/delete-author/:id" element={<DeleteAuthor />} /> 

            {/* book related components */}
      <Route path="/books" element={<BookList />} />
      <Route path="/add-book" element={<AddBook />} />
    <Route path="/delete-book/:id" element={<DeleteBook />} /> 
          <Route path="/update-book/:id" element={<UpdateBook />} />

      {/* 404 - must be last */}
      {/* <Route path="*" element={<Page404/>}/> */}
    </Routes>
  );
}

export default Routing;

// Route path="/" element={<App/>}/>
//                 <Route path="home" element={<Home />}/>
//                 <Route index element={<Home />}/>
//                 <Route path="cats" element={<CatList/>}/>
//                 <Route path="about" element={<About/>}/>
//                 <Route path="donate" element={<Donate/>}/>
//                 <Route path="*" element={<Page404/>}/>