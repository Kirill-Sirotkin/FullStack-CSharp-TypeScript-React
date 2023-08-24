import React, { useEffect } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import { getBooks } from "../reducers/bookReducer";
import useAppSelector from "../hooks/useAppSelector";
import BookCard from "../components/BookCard";

const Books = () => {
    const books = useAppSelector(state => state.bookReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        console.log("getting books");
        dispatch(getBooks());
    }, [dispatch])

    const bookCards = books.books.map((book) => 
        <BookCard {...book} />
    );

    return (
        <div className="books">
            <div className="book-grid">
                {bookCards}
            </div>
        </div>
    )
}

export default Books;