import React, { useState } from "react";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface Props { sideBarActive: boolean, setSideBarActive: React.Dispatch<React.SetStateAction<boolean>> }
const SideBar = ({sideBarActive, setSideBarActive}: Props) => {
  if (sideBarActive) return (
    <div className="sideBar">
      <div style={{backgroundColor: "inherit"}}><Link className="buttonHighlight" style={{backgroundColor: "inherit"}} to={"/"} onClick={() => setSideBarActive(!sideBarActive)}>Home</Link></div>
      <div style={{backgroundColor: "inherit"}}><Link className="buttonHighlight" style={{backgroundColor: "inherit"}} to={"/books"} onClick={() => setSideBarActive(!sideBarActive)}>Books</Link></div>
    </div>
  )
  return (null)
}

const AppBarCustom = () => {
    const [sideBarActive, setSideBarActive] = useState(false);
    const props = {sideBarActive, setSideBarActive};

    return (
      <div className="appBar">
        <FontAwesomeIcon icon={faBars} className="buttonHighlight" style={{color: "#ecdfaf", backgroundColor: "inherit"}}
        onClick={() => setSideBarActive(!sideBarActive)} />
        LIBRARY
        <div className="loginButton">Log in</div>
        <SideBar {...props} />
      </div>
    )
}

export default AppBarCustom;