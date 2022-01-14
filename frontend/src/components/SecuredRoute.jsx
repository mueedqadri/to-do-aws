import React from 'react';
import {Navigate, Outlet} from "react-router-dom";

function SecuredRoute() {
    const auth = localStorage.getItem('accessToken');
    console.log(auth)
    return auth ? <Outlet/> : <Navigate to={"/login"}/>
}

export default SecuredRoute;