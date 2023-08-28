import React, { useEffect } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { getAuthors } from "../reducers/authorReducer";
import AuthorCard from "../components/AuthorCard";

const Authors = () => {
    const authors = useAppSelector(state => state.authorReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        console.log("getting authors");
        dispatch(getAuthors());
    }, [dispatch])

    const authorCards = authors.authors.map((author) => 
        <AuthorCard key={author.id} {...author} />
    );

    return (
        <div className="centered-wrapper">
            <div className="items-grid">
                {authorCards}
            </div>
        </div>
    )
}

export default Authors;