import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import avatar from "./../media/avatar_placeholder.png";
import { getUserById, logOutUser } from "../reducers/userReducer";

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
        navigate("/");
    }

    return (
        <div>
            <img alt="avatar" src={avatar} style={{width: "80px", height: "80px"}} />
            {user.currentUser.firstName} {user.currentUser.lastName}
            <br></br>
            Role: {user.currentUser.role}
            <button style={{ padding: "10px 20px" }} onClick={logOut}>Log out</button>
        </div>
    )
}

export default Profile;