import React, { useEffect } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import { getBooks } from "../reducers/bookReducer";
import useAppSelector from "../hooks/useAppSelector";

const Books = () => {
    const books = useAppSelector(state => state.bookReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        console.log("getting books");
        dispatch(getBooks());
    }, [dispatch])

    return (
        <div>
            {books.books.map(book => (
                <div>
                    {book.id} - {book.title}
                    <br></br>
                </div>
            ))}
        </div>
    )
}

export default Books;