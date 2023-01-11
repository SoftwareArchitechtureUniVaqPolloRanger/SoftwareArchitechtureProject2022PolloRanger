import React from "react";
import { Navigate } from "react-router-dom";

export function ProtectedComponent({children}: {children: JSX.Element}) {
    const authInfo = localStorage.getItem('authInfo');
    console.log(authInfo)
    if (!authInfo) {
        return <Navigate to="/signin" />
    }
    return children;
}