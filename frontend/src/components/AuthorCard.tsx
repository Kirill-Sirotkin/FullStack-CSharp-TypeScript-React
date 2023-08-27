import React from "react";
import Author from "../types/Author";
import avatar from "./../media/avatar_placeholder.png"
import { Link } from "react-router-dom";

const AuthorCard = (author: Author) => {
    return (
      <div key={author.id} className="items-grid-element">
        <img alt="author avatar" src={avatar} style={{width: "80px", height: "80px"}} />
        <div style={{backgroundColor: "inherit"}}>
            <Link className="button-highlight" style={{backgroundColor: "inherit"}} to={`/authors/${author.id}`}>
              {author.firstName} {author.lastName}
            </Link>
        </div>
      </div>
    )
}

export default AuthorCard;