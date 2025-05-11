import React from "react";
import { Navigate, Route } from "react-router-dom";

function PrivateRouter({ element, ...rest }) {
    const token = window.localStorage.getItem("userInfo");

    return (
        <Route
            {...rest}
            element={
                token ? (
                    element
                ) : (
                    <Navigate to="/" replace />
                )
            }
        />
    );
}

export default PrivateRouter;
