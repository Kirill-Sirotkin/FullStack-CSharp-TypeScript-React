import React, { useState } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import { loginUser } from "../reducers/userReducer";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router";
import useAppSelector from "../hooks/useAppSelector";
import { Link } from "react-router-dom";

const Authentication = () => {
    const user = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [loginEmail, setLoginEmail] = useState<string>("");
    const [loginPassword, setLoginPassword] = useState<string>("");

    const submitClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log("submit log in");
        await dispatch(loginUser({email: loginEmail, password: loginPassword}))
        const token = localStorage.getItem("token");
        if (!token) return;
        const info: any = jwtDecode(token);
        navigate(`/profile/${info.nameid}`);
    }
    
    return (
        <div className="centered-wrapper">
            <form className="centered-wrapper auth-wrapper">
                LOG IN 
                <label style={{ backgroundColor: "inherit" }} >
                    Email: <input onChange={(e) => setLoginEmail(e.target.value)} className="input-field" />
                </label>
                <label style={{ backgroundColor: "inherit" }} >
                    Password: <input type="password" onChange={(e) => setLoginPassword(e.target.value)} className="input-field" />
                </label>
                <div style={{ color: "red" }}>{user.errorMessageLogin}</div>
                <button type="submit" style={{ padding: "10px 20px" }} onClick={(e) => submitClick(e)}>SUBMIT</button>
                <div style={{backgroundColor: "inherit"}}>
                    Don't have an account?&nbsp;
                    <Link className="button-highlight" style={{backgroundColor: "inherit"}} to={"/register"} >register</Link>
                </div>
            </form>
        </div>
    )
}

export default Authentication;