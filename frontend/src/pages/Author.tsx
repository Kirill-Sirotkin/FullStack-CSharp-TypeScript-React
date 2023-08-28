import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import avatar from "./../media/avatar_placeholder.png";
import { getAuthorById } from "../reducers/authorReducer";

const Author = () => {
    const {id} = useParams();
    const authors = useAppSelector(state => state.authorReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!id) return;
        dispatch(getAuthorById(id))
    }, [dispatch, id])
    
    return (
        <div>
            <img alt="author avatar" src={avatar} style={{width: "80px", height: "80px"}} />
            {authors.authorById.firstName} {authors.authorById.lastName}
            <br></br>
            Biography: {authors.authorById.biography}
            <br></br>
            Books by this author: {authors.authorById.bookTitles.map((title, index) => 
                <div key={authors.authorById.bookIds[index]} style={{backgroundColor: "inherit"}}>
                    <Link className="button-highlight" style={{backgroundColor: "inherit"}} to={`/books/${authors.authorById.bookIds[index]}`}>
                        {title}
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Author;