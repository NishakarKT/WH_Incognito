import React, { lazy, Suspense, useEffect, useContext } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
// constants
import { ADMIN_ROUTE, AUTH_ADMIN_PORTAL_ROUTE } from "../constants/routes";
// contexts
import UserContext from "../contexts/userContext";
// components
import Loader from "../components/loader/Loader";
import AdminNav from "../components/adminNav/AdminNav";
// apps
const AdminHome = lazy(() => import("../pages/admin/Admin"));

const Admin = () => {
    const history = useHistory();
    const { admin } = useContext(UserContext);

    useEffect(() => {
        if (!admin.name)
            history.push(AUTH_ADMIN_PORTAL_ROUTE);
    }, [admin, history]);

    return (
        <Suspense fallback={<Loader />}>
            <AdminNav />
            <Switch>
                <Route path={ADMIN_ROUTE} component={AdminHome} />
                <Redirect to={AUTH_ADMIN_PORTAL_ROUTE} />
            </Switch>
        </Suspense>
    );
};

export default Admin;
