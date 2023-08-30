import avatar from "./../media/avatar_placeholder.png";
import { Link } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import AdminButtons from "./AdminButtons";
import useAppDispatch from "../hooks/useAppDispatch";
import { useState } from "react";
import User from "../types/User";
import UserRoles from "../types/UserRoles";
import UserUpdateInfo from "../types/UserUpdateInfo";
import { deleteUser, getUsers, updateUser } from "../reducers/userReducer";

const UserCard = (userInfo: User) => {
  const user = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();
  const [updateContextActive, setUpdateContextActive] = useState(false);
  const [inputRole, setInputRole] = useState(0);

  const updateBookClick = (id: string) => {
    setInputRole(userInfo.role);
    setUpdateContextActive(true);
  }

  const deleteBookClick = async (id: string) => {
    const token = localStorage.getItem("token");
    await dispatch(deleteUser({id, token}));
    dispatch(getUsers(token));
  }

  const updateSave = async () => {
    const userUpdate: UserUpdateInfo = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      role: inputRole
    }
    const token = localStorage.getItem("token");
    await dispatch(updateUser({user: userUpdate, idAndToken: {id: userInfo.id, token }}));
    dispatch(getUsers(token));
    setUpdateContextActive(false);
  }

  const updateCancel = () => {
    setUpdateContextActive(false);
  }
  
  if (!updateContextActive) return (
    <div key={userInfo.id} className="items-grid-element">
      <img alt="avatar" src={avatar} style={{width: "80px", height: "80px"}} />
      <div style={{backgroundColor: "inherit"}}>
          <Link className="button-highlight" style={{backgroundColor: "inherit"}} to={`/users/${userInfo.id}`}>
            {userInfo.firstName} {userInfo.lastName}
          </Link>
      </div>
      <br/>
      Role: {UserRoles[userInfo.role]}
      <AdminButtons {...{user: user.currentUser, updateFunction: updateBookClick, deleteFunction: deleteBookClick, itemId: userInfo.id}} />
    </div>
  )

  return (
    <div key={userInfo.id} className="items-grid-element">
      <img alt="avatar" src={avatar} style={{width: "80px", height: "80px"}} />
      <div style={{backgroundColor: "inherit"}}>
          <Link className="button-highlight" style={{backgroundColor: "inherit"}} to={`/profile/${userInfo.id}`}>
            {userInfo.firstName} {userInfo.lastName}
          </Link>
      </div>
      <br/>
      Role: 
        <select defaultValue={userInfo.role} onChange={(e) => setInputRole(parseInt(e.target.value))}>
          <option value="0" >{UserRoles[0]}</option>
          <option value="1">{UserRoles[1]}</option>
          <option value="2">{UserRoles[2]}</option>
        </select>
      <div className="edit-buttons">
        <button style={{backgroundColor: "red"}} onClick={updateCancel}>CANCEL</button>
        <button style={{backgroundColor: "green"}} onClick={updateSave}>SAVE</button>
      </div>
    </div>
  )
}

export default UserCard;