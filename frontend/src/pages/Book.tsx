import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { getBookById } from "../reducers/bookReducer";
import bookCover from "./../media/cover_unavailable.png"

const Product = () => {
    const {id} = useParams();
    const books = useAppSelector(state => state.bookReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!id) return;
        dispatch(getBookById(id))
    }, [dispatch, id])
    
    return (
        <div>
            <img alt="book cover" src={bookCover} style={{width: "80px", height: "80px"}} />
            {books.bookById.title}
            <br></br>
            ISBN: {books.bookById.isbn}
            <br></br>
            By {books.bookById.authorNames.map((author, index) => 
                <div key={books.bookById.authorIds[index]} style={{backgroundColor: "inherit"}}>
                    <Link className="button-highlight" style={{backgroundColor: "inherit"}} to={`/authors/${books.bookById.authorIds[index]}`}>
                        {author}
                    </Link>
                </div>
            )}
            <br></br>
            {books.bookById.description}
            <br></br>
            Available to borrow: {books.bookById.quantity}
        </div>
    )
}

export default Product;