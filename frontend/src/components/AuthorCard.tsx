import React, { useState } from "react";
import Author from "../types/Author";
import avatar from "./../media/avatar_placeholder.png"
import { Link } from "react-router-dom";
import AdminButtons from "./AdminButtons";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { deleteAuthor, getAuthors, updateAuthor } from "../reducers/authorReducer";
import AuthorCreateUpdateInfo from "../types/AuthorCreateUpdateInfo";

const AuthorCard = (author: Author) => {
  const user = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();
  const [updateContextActive, setUpdateContextActive] = useState(false);
  const [inputFirstname, setInputFirstname] = useState("");
  const [inputLastname, setInputLastname] = useState("");

  const updateAuthorClick = (id: string) => {
    setInputFirstname(author.firstName);
    setInputLastname(author.lastName);
    setUpdateContextActive(true);
  }

  const deleteAuthorClick = async (id: string) => {
    const token = localStorage.getItem("token");
    await dispatch(deleteAuthor({id, token}));
    dispatch(getAuthors("PageNumber=1&PerPage=6"));
  }

  const updateSave = async () => {
    const authorUpdate: AuthorCreateUpdateInfo = {
      firstName: inputFirstname,
      lastName: inputLastname,
      biography: author.biography,
      bookIds: []
    }
    const token = localStorage.getItem("token");
    await dispatch(updateAuthor({author: authorUpdate, idAndToken: {id: author.id, token }}));
    dispatch(getAuthors("PageNumber=1&PerPage=6"));
    setUpdateContextActive(false);
  }

  const updateCancel = () => {
    setUpdateContextActive(false);
  }
  
  if (!updateContextActive) return (
    <div key={author.id} className="items-grid-element">
      <img alt="author avatar" src={avatar} style={{width: "80px", height: "80px"}} />
      <div style={{backgroundColor: "inherit"}}>
          <Link className="button-highlight" style={{backgroundColor: "inherit"}} to={`/authors/${author.id}`}>
            {author.firstName} {author.lastName}
          </Link>
      </div>
      <AdminButtons {...{user: user.currentUser, updateFunction: updateAuthorClick, deleteFunction: deleteAuthorClick, itemId: author.id}} />
    </div>
  )

  return (
    <div key={author.id} className="items-grid-element">
      <img alt="author avatar" src={avatar} style={{width: "80px", height: "80px"}} />
      <div style={{backgroundColor: "inherit"}}>
        <input className="edit-input" defaultValue={author.firstName} onChange={(e) => setInputFirstname(e.target.value)}></input>
        <input className="edit-input" defaultValue={author.lastName} onChange={(e) => setInputLastname(e.target.value)}></input>
      </div>
      <div className="edit-buttons">
        <button style={{backgroundColor: "red"}} onClick={updateCancel}>CANCEL</button>
        <button style={{backgroundColor: "green"}} onClick={updateSave}>SAVE</button>
      </div>
    </div>
  )
}

export default AuthorCard;