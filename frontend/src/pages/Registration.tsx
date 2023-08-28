import React, { useState } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import { loginUser, registerUser } from "../reducers/userReducer";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router";
import useAppSelector from "../hooks/useAppSelector";
import { Link } from "react-router-dom";
import UserCreateInfo from "../types/UserCreateInfo";

const Registration = () => {
    const user = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [loginEmail, setLoginEmail] = useState<string>("");
    const [loginPassword, setLoginPassword] = useState<string>("");
    const [registerFirstName, setRegisterFirstName] = useState<string>("");
    const [registerLastName, setRegisterLastName] = useState<string>("");

    const submitClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log("submit register");
        const user: UserCreateInfo = {
            firstName: registerFirstName,
            lastName: registerLastName,
            email: loginEmail,
            password: loginPassword,
            role: 2
        }
        await dispatch(registerUser(user));
        await dispatch(loginUser({email: loginEmail, password: loginPassword}));
        const token = localStorage.getItem("token");
        if (!token) return;
        const info: any = jwtDecode(token);
        navigate(`/profile/${info.nameid}`);
    }
    
    return (
        <div className="centered-wrapper">
            <form className="centered-wrapper auth-wrapper">
                CREATE ACCOUNT 
                <label style={{ backgroundColor: "inherit" }} >
                    First name: <input onChange={(e) => setRegisterFirstName(e.target.value)} className="input-field" />
                </label>
                <label style={{ backgroundColor: "inherit" }} >
                    Last name: <input onChange={(e) => setRegisterLastName(e.target.value)} className="input-field" />
                </label>
                <label style={{ backgroundColor: "inherit" }} >
                    Email: <input onChange={(e) => setLoginEmail(e.target.value)} className="input-field" />
                </label>
                <label style={{ backgroundColor: "inherit" }} >
                    Password: <input type="password" onChange={(e) => setLoginPassword(e.target.value)} className="input-field" />
                </label>
                <div style={{ color: "red" }}>{user.errorMessageRegister}</div>
                <button type="submit" style={{ padding: "10px 20px" }} onClick={(e) => submitClick(e)}>SUBMIT</button>
                <div style={{backgroundColor: "inherit"}}>
                    Already registered?&nbsp;
                    <Link className="button-highlight" style={{backgroundColor: "inherit"}} to={"/auth"} >log in</Link>
                </div>
            </form>
        </div>
    )
}

export default Registration;