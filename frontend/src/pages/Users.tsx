import React, { useEffect } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import UserCard from "../components/UserCard";
import { getUsers } from "../reducers/userReducer";

const Users = () => {
    const user = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        console.log("getting users");
        const token = localStorage.getItem("token");
        dispatch(getUsers(token));
    }, [dispatch])

    const userCards = user.users.map((user) => 
        <UserCard key={user.id} {...user} />
    );

    return (
        <div className="centered-wrapper">
            <div className="items-grid">
                {userCards}
            </div>
        </div>
    )
}

export default Users;