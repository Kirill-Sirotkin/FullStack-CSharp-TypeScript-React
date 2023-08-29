import React, { useState } from "react";

import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import User from "../types/User";
import { getTotal } from "../reducers/cartReducer";

interface Props { sideBarActive: boolean, setSideBarActive: React.Dispatch<React.SetStateAction<boolean>> }
const SideBar = ({sideBarActive, setSideBarActive}: Props) => {
  if (sideBarActive) return (
    <div className="side-bar">
      <div style={{backgroundColor: "inherit"}}><Link className="button-highlight" style={{backgroundColor: "inherit"}} to={"/"} onClick={() => setSideBarActive(!sideBarActive)}>Home</Link></div>
      <div style={{backgroundColor: "inherit"}}><Link className="button-highlight" style={{backgroundColor: "inherit"}} to={"/books"} onClick={() => setSideBarActive(!sideBarActive)}>Books</Link></div>
      <div style={{backgroundColor: "inherit"}}><Link className="button-highlight" style={{backgroundColor: "inherit"}} to={"/authors"} onClick={() => setSideBarActive(!sideBarActive)}>Authors</Link></div>
    </div>
  )
  return (null)
}

interface PropsProfile { user: User; setSideBarActive: React.Dispatch<React.SetStateAction<boolean>> }
const LoginProfile = (props: PropsProfile) => {
  if (props.user.id === "") return (
    <Link className="button-highlight" style={{backgroundColor: "inherit"}} to={"/auth"} onClick={() => {
      props.setSideBarActive(false);
      }} >Log in</Link>
  )

  return (
    <Link className="button-highlight" style={{backgroundColor: "inherit"}} to={`/profile/${props.user.id}`} onClick={() => {
      props.setSideBarActive(false);
      }} >Profile</Link>
  )
}

const AppBarCustom = () => {
    const [sideBarActive, setSideBarActive] = useState(false);
    const user = useAppSelector(state => state.userReducer);
    const cart = useAppSelector(state => state.cartReducer);
    const props = {sideBarActive, setSideBarActive};
    const propsProfile = {user: user.currentUser, setSideBarActive};

    return (
      <div className="app-bar prevent-select">
        <FontAwesomeIcon icon={faBars} className="button-highlight" style={{color: "#ecdfaf", backgroundColor: "inherit"}}
        onClick={() => setSideBarActive(!sideBarActive)} />
        LIBRARY
        {user.currentUser.id !== "" ? 
          <div className="cart-icon">
            <Link style={{backgroundColor: "inherit"}} to={"/cart"}>
              <FontAwesomeIcon icon={faCartShopping} className="button-highlight" style={{color: "#bbbfbb", backgroundColor: "inherit"}} />
            </Link>
            {getTotal(cart.products) > 0 ? getTotal(cart.products) : null}
          </div>
          :
          null
        }
        <div className="login-button">
          <LoginProfile {...propsProfile} />
        </div>
        <SideBar {...props} />
      </div>
    )
}

export default AppBarCustom;