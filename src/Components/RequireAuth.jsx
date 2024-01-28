import {  Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

function RequireAuth() {

    const {auth} = useContext(AuthContext);
    const location = useLocation();
  return (
    auth?.userId?<Outlet/> : <Navigate to= "/login" state={{from:location}} replace/>
  )
}

export default RequireAuth
