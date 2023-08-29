import React, { useState } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import AuthorCreateUpdateInfo from "../types/AuthorCreateUpdateInfo";
import { createAuthor } from "../reducers/authorReducer";

const Registration = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [biography, setBiography] = useState<string>("");
    const [bookIds, setBookIds] = useState<string>("");

    const submitClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log("submit new author");
        const author: AuthorCreateUpdateInfo = {
            firstName,
            lastName,
            biography,
            bookIds: bookIds.split(","),
        }
        const token = localStorage.getItem("token");
        if (!token) return;
        await dispatch(createAuthor({author, token}));
        navigate("/authors");
    }
    
    return (
        <div className="centered-wrapper">
            <form className="centered-wrapper auth-wrapper">
                CREATE AUTHOR 
                <label style={{ backgroundColor: "inherit" }} >
                    First Name: <input onChange={(e) => setFirstName(e.target.value)} className="input-field" />
                </label>
                <label style={{ backgroundColor: "inherit" }} >
                    Last Name: <input onChange={(e) => setLastName(e.target.value)} className="input-field" />
                </label>
                <label style={{ backgroundColor: "inherit" }} >
                    Biography: <textarea onChange={(e) => setBiography(e.target.value)} className="input-field" />
                </label>
                <label style={{ backgroundColor: "inherit" }} >
                    Book ID / IDs: <input onChange={(e) => setBookIds(e.target.value)} className="input-field" />
                </label>
                <button type="submit" style={{ padding: "10px 20px" }} onClick={(e) => submitClick(e)}>SUBMIT</button>
            </form>
        </div>
    )
}

export default Registration;