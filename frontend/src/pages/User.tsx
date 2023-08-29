import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import avatar from "./../media/avatar_placeholder.png";
import { getUserViewableById } from "../reducers/userReducer";
import UserRoles from "../types/UserRoles";

const Profile = () => {
    const {id} = useParams();
    const user = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!id) return;
        const token = localStorage.getItem("token");
        dispatch(getUserViewableById({token, id}));
    }, [dispatch, id])

    return (
        <div>
            <img alt="avatar" src={avatar} style={{width: "80px", height: "80px"}} />
            {user.viewableUser.firstName} {user.viewableUser.lastName}
            <br/>
            Role: {UserRoles[user.viewableUser.role]}
        </div>
    )
}

export default Profile;