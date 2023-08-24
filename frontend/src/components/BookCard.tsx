import React from "react";
import Book from "../types/Book";
import { Link } from "react-router-dom";

const BookCard = (book: Book) => {
    return (
      <div className="book-grid-element">
        <div style={{backgroundColor: "inherit"}}>
            <Link className="button-highlight" style={{backgroundColor: "inherit"}} to={`/books/${book.id}`}>
              {book.title}
            </Link>
        </div>
        <br></br>
        ISBN: {book.isbn}
        <br></br>
        Available to borrow: {book.quantity}
        <br></br>
        By {book.authorNames[0]}
      </div>
    )
}

export default BookCard;