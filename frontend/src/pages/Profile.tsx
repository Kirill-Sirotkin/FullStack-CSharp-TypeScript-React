import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import avatar from "./../media/avatar_placeholder.png";
import { getUserById, logOutUser } from "../reducers/userReducer";
import UserRoles from "../types/UserRoles";
import { clearCart } from "../reducers/cartReducer";

const Profile = () => {
    const {id} = useParams();
    const user = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        const token = localStorage.getItem("token");
        dispatch(getUserById({token, id}));
    }, [dispatch, id])
    
    const logOut = async () => {
        await dispatch(logOutUser());
        dispatch(clearCart());
        navigate("/");
    }

    return (
        <div>
            <img alt="avatar" src={avatar} style={{width: "80px", height: "80px"}} />
            {user.currentUser.firstName} {user.currentUser.lastName}
            <br/>
            Role: {UserRoles[user.currentUser.role]}
            <br/>
            {user.currentUser.role === 0 ? 
                <div>
                    <Link className="button-highlight" style={{backgroundColor: "inherit"}} to={"/users"}>Manage users</Link>
                    <br/>
                    <Link className="button-highlight" style={{backgroundColor: "inherit"}} to={"/loans"}>Manage loans</Link>
                </div>
            : null}
            {(user.currentUser.role === 0 || user.currentUser.role === 1) ? 
                <div>
                    <br/>
                    <Link className="button-highlight" style={{backgroundColor: "inherit"}} to={"/create/book"}>Create book</Link>
                    <br/>
                    <Link className="button-highlight" style={{backgroundColor: "inherit"}} to={"/create/author"}>Create author</Link>
                </div>
            : null}
            {user.currentUser.id === id ? 
                <button style={{ padding: "10px 20px" }} onClick={logOut}>Log out</button>
            :null}
        </div>
    )
}

export default Profile;