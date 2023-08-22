import React from "react";

import { Outlet } from "react-router";

import AppBarCustom from "../components/AppBarCustom";

const Navigation = () => {
    return (
        <div>
            <AppBarCustom />
            <Outlet />
        </div>
    )
}

export default Navigation;