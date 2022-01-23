import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { AUTH_PORTAL_ROUTE, AUTH_ADMIN_PORTAL_ROUTE } from "../constants/routes";
// components
import Loader from "../components/loader/Loader";
// pages
const Portal = lazy(() => import("../pages/auth/portal/Portal"));
const AdminPortal = lazy(() => import("../pages/auth/adminPortal/AdminPortal"));

const Auth = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Switch>
                <Route exact path={AUTH_PORTAL_ROUTE} component={Portal} />
                <Route exact path={AUTH_ADMIN_PORTAL_ROUTE} component={AdminPortal} />
                <Redirect to={AUTH_PORTAL_ROUTE} />
            </Switch>
        </Suspense>
    );
};

export default Auth;
