import React, { useState } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import BookCreateUpdateInfo from "../types/BookCreateUpdateInfo";
import { createBook } from "../reducers/bookReducer";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>("");
    const [isbn, setIsbn] = useState<string>("");
    const [publishedDate, setPublishedDate] = useState<Date>(new Date());
    const [authorIds, setAuthorIds] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [quantity, setQuantity] = useState(0);

    const submitClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log("submit new book");
        const book: BookCreateUpdateInfo = {
            title,
            isbn,
            description,
            publishedDate: publishedDate.toISOString(),
            authorIds: authorIds.split(","),
            quantity,
        }
        const token = localStorage.getItem("token");
        if (!token) return;
        await dispatch(createBook({book, token}));
        navigate("/books");
    }
    
    return (
        <div className="centered-wrapper">
            <form className="centered-wrapper auth-wrapper">
                CREATE BOOK 
                <label style={{ backgroundColor: "inherit" }} >
                    Title: <input onChange={(e) => setTitle(e.target.value)} className="input-field" />
                </label>
                <label style={{ backgroundColor: "inherit" }} >
                    ISBN: <input onChange={(e) => setIsbn(e.target.value)} className="input-field" />
                </label>
                <label style={{ backgroundColor: "inherit" }} >
                    Published Date: <input type="date" onChange={(e) => setPublishedDate(new Date(e.target.value))} className="input-field" />
                </label>
                <label style={{ backgroundColor: "inherit" }} >
                    Description: <textarea onChange={(e) => setDescription(e.target.value)} className="input-field" />
                </label>
                <label style={{ backgroundColor: "inherit" }} >
                    Quantity: <input onChange={(e) => setQuantity(parseInt(e.target.value))} className="input-field" />
                </label>
                <label style={{ backgroundColor: "inherit" }} >
                    Author ID / IDs: <input onChange={(e) => setAuthorIds(e.target.value)} className="input-field" />
                </label>
                <button type="submit" style={{ padding: "10px 20px" }} onClick={(e) => submitClick(e)}>SUBMIT</button>
            </form>
        </div>
    )
}

export default Registration;