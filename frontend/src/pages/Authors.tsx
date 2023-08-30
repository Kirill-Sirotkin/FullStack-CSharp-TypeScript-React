import React, { useEffect, useState } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { getAuthors } from "../reducers/authorReducer";
import AuthorCard from "../components/AuthorCard";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

enum OrderByTypes {
    "UpdatedAt",
    "CreatedAt",
    "Id",
  }

const Authors = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    let [searchWord, setSearchWord] = useState("");
    let [orderBy, setOrderBy] = useState("");
    let [orderDesc, setOrderDesc] = useState(false);
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

    const applyFilters = () => {
        const newQueryParameters = searchParams;
        if (searchWord !== "") newQueryParameters.set("SearchWord", searchWord);
        if (orderBy !== "") newQueryParameters.set("Order", orderBy);
        newQueryParameters.set("OrderByDescending", orderDesc.toString());
        setSearchParams(newQueryParameters);
        }

    const resetFilters = () => {
        const newQueryParameters : URLSearchParams = new URLSearchParams();
        newQueryParameters.set("PageNumber", "1");
        setSearchParams(newQueryParameters);
    }

    const authorCards = authors.authors.map((author) => 
        <AuthorCard key={author.id} {...author} />
    );

    return (
        <div className="centered-wrapper">
        <div style={{display: "flex", position: "absolute", gap: "15px", alignItems: "center"}}>
            <label style={{ backgroundColor: "inherit" }} >
                Search: <input placeholder="Type a book title..." 
                                onChange={(e) => setSearchWord(e.target.value)} 
                                style={{width: "150px"}}
                                className="input-field" />
            </label>
            Order by: 
                <select onChange={(e) => setOrderBy(OrderByTypes[parseInt(e.target.value)])}>
                <option value="0" >{OrderByTypes[0]}</option>
                <option value="1">{OrderByTypes[1]}</option>
                <option value="2">{OrderByTypes[2]}</option>
                </select>
            <label style={{ backgroundColor: "inherit" }} >
                Descending?: <input type="checkbox" 
                                style={{width: "15px", height: "15px"}}
                                checked={orderDesc}
                                onChange={() => setOrderDesc(!orderDesc)} 
                                />
            </label>
            <button style={{fontSize: "1.2em"}} onClick={applyFilters}>
                Apply filters&nbsp;
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#b1c4b7",}} />
            </button>
            <button style={{fontSize: "1.2em"}} onClick={resetFilters}>
                Reset filters&nbsp;
                <FontAwesomeIcon icon={faArrowRotateLeft} style={{color: "#b1c4b7",}} />
            </button>
        </div>
            <div className="items-grid" style={{marginTop: "50px"}}>
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