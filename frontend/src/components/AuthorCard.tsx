import React from "react";
import Author from "../types/Author";
import avatar from "./../media/avatar_placeholder.png"
import { Link } from "react-router-dom";
import AdminButtons from "./AdminButtons";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { deleteAuthor } from "../reducers/authorReducer";
import { getBooks } from "../reducers/bookReducer";

const AuthorCard = (author: Author) => {
  const user = useAppSelector(state => state.userReducer);
  const authors = useAppSelector(state => state.authorReducer);
  const dispatch = useAppDispatch();

  const updateAuthorClick = (id: string) => {
    
  }

  const deleteAuthorClick = async (id: string) => {
    const token = localStorage.getItem("token");
    await dispatch(deleteAuthor({id, token}));
    dispatch(getBooks());
  }
  
  return (
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
}

export default AuthorCard;