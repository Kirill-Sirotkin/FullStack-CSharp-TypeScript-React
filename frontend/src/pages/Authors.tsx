import React, { useEffect } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { getAuthors } from "../reducers/authorReducer";
import AuthorCard from "../components/AuthorCard";
import { useSearchParams } from "react-router-dom";

const Authors = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const authors = useAppSelector(state => state.authorReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        console.log("getting authors");
        dispatch(getAuthors(searchParams.toString()));
    }, [dispatch, searchParams])

    const updatePage = (delta: number) => {
        const newQueryParameters = searchParams;
        let newPage = parseInt(searchParams.get("PageNumber")??"1");
        newPage = newPage + delta <= 0 ? 1 : newPage + delta;
        newQueryParameters.set("PageNumber", newPage.toString());
        setSearchParams(newQueryParameters);
    }

    const authorCards = authors.authors.map((author) => 
        <AuthorCard key={author.id} {...author} />
    );

    return (
        <div className="centered-wrapper">
            <div className="items-grid">
                {authorCards}
            </div>
            <div>
                <button className="pagination-button" style={{bottom: "20px", left: "40%"}} onClick={() => updatePage(-1)}>BACK</button>
                <button className="pagination-button" style={{bottom: "20px", right: "40%"}} onClick={() => updatePage(1)}>NEXT</button>
            </div>
        </div>
    )
}

export default Authors;