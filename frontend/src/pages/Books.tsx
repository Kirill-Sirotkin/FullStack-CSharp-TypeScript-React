import React, { useEffect } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import { getBooks } from "../reducers/bookReducer";
import useAppSelector from "../hooks/useAppSelector";
import BookCard from "../components/BookCard";
import { useSearchParams } from "react-router-dom";

const Books = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const books = useAppSelector(state => state.bookReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("getting books");
        dispatch(getBooks(searchParams.toString()));
    }, [dispatch, searchParams])

    const updatePage = (delta: number) => {
        const newQueryParameters = searchParams;
        let newPage = parseInt(searchParams.get("PageNumber")??"1");
        newPage = newPage + delta <= 0 ? 1 : newPage + delta;
        newQueryParameters.set("PageNumber", newPage.toString());
        setSearchParams(newQueryParameters);
    }

    const bookCards = books.books.map((book) => 
        <BookCard key={book.id} {...book} />
    );

    return (
        <div className="centered-wrapper">
            <div className="items-grid">
                {bookCards}
            </div>
            <div>
                <button className="pagination-button" style={{bottom: "20px", left: "40%"}} onClick={() => updatePage(-1)}>BACK</button>
                <button className="pagination-button" style={{bottom: "20px", right: "40%"}} onClick={() => updatePage(1)}>NEXT</button>
            </div>
        </div>
    )
}

export default Books;