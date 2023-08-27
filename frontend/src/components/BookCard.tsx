import React from "react";
import Book from "../types/Book";
import bookCover from "./../media/cover_unavailable.png"
import { Link } from "react-router-dom";

const BookCard = (book: Book) => {
    return (
      <div key={book.id} className="items-grid-element">
        <img alt="book cover" src={bookCover} style={{width: "80px", height: "80px"}} />
        <div style={{backgroundColor: "inherit"}}>
            <Link className="button-highlight" style={{backgroundColor: "inherit"}} to={`/books/${book.id}`}>
              {book.title}
            </Link>
        </div>
        <br></br>
        ISBN: {book.isbn}
        <br></br>
        By {book.authorNames[0]}
        <br></br>
        Available to borrow: {book.quantity}
      </div>
    )
}

export default BookCard;