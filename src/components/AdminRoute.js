import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function AdminRoute({ component: Component, ...rest }) {
    const userSignin = useSelector((state) => state.userSignin);
    const { user } = userSignin;
    return (
        <Route
            {...rest}
            render={(props) =>
                user && user.roles.includes("Senior Supervisor") ? (
                    <Component {...props}></Component>
                ) : (
                    <Redirect to="/signin" />
                )
            }
        ></Route>
    );
}
