import Book from "../types/Book";
import bookCover from "./../media/cover_unavailable.png"
import { Link } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import AdminButtons from "./AdminButtons";
import useAppDispatch from "../hooks/useAppDispatch";
import { deleteBook, getBooks, updateBook } from "../reducers/bookReducer";
import { useState } from "react";
import BookCreateUpdateInfo from "../types/BookCreateUpdateInfo";

const BookCard = (book: Book) => {
  const user = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();
  const [updateContextActive, setUpdateContextActive] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [inputIsbn, setInputIsbn] = useState("");
  const [inputQuantity, setInputQuantity] = useState(0);

  const updateBookClick = (id: string) => {
    setInputTitle(book.title);
    setInputIsbn(book.isbn);
    setInputQuantity(book.quantity);
    setUpdateContextActive(true);
  }

  const deleteBookClick = async (id: string) => {
    const token = localStorage.getItem("token");
    await dispatch(deleteBook({id, token}));
    dispatch(getBooks());
  }

  const updateSave = async () => {
    const bookUpdate: BookCreateUpdateInfo = {
      title: inputTitle,
      isbn: inputIsbn,
      description: book.description,
      publishedDate: book.publishedDate,
      authorIds: [],
      quantity: inputQuantity
    }
    const token = localStorage.getItem("token");
    await dispatch(updateBook({book: bookUpdate, idAndToken: {id: book.id, token }}));
    dispatch(getBooks());
  }

  const updateCancel = () => {
    setUpdateContextActive(false);
  }
  
  if (!updateContextActive) return (
    <div key={book.id} className="items-grid-element">
      <img alt="book cover" src={bookCover} style={{width: "80px", height: "80px"}} />
      <div style={{backgroundColor: "inherit"}}>
          <Link className="button-highlight" style={{backgroundColor: "inherit"}} to={`/books/${book.id}`}>
            {book.title}
          </Link>
      </div>
      <br/>
      ISBN: {book.isbn}
      <br/>
      By {book.authorNames[0]}{book.authorNames.length > 1 ? <span style={{backgroundColor: "inherit"}}>, et al</span> : null}
      <br/>
      Available to borrow: {book.quantity}
      <AdminButtons {...{user: user.currentUser, updateFunction: updateBookClick, deleteFunction: deleteBookClick, itemId: book.id}} />
    </div>
  )

  return (
    <div key={book.id} className="items-grid-element">
      <img alt="book cover" src={bookCover} style={{width: "80px", height: "80px"}} />
      <div style={{backgroundColor: "inherit"}}>
          <input className="edit-input" defaultValue={book.title} onChange={(e) => setInputTitle(e.target.value)}></input>
      </div>
      <input className="edit-input" defaultValue={book.isbn} onChange={(e) => setInputIsbn(e.target.value)}></input>
      <br/>
      By {book.authorNames[0]}{book.authorNames.length > 1 ? <span style={{backgroundColor: "inherit"}}>, et al</span> : null}
      <br/>
      <input className="edit-input" defaultValue={book.quantity} onChange={(e) => setInputQuantity(parseInt(e.target.value))}></input>
      <div className="edit-buttons">
        <button style={{backgroundColor: "red"}} onClick={updateCancel}>CANCEL</button>
        <button style={{backgroundColor: "green"}} onClick={updateSave}>SAVE</button>
      </div>
    </div>
  )
}

export default BookCard;