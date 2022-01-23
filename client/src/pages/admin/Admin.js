import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./Admin.css";
// constants
import { ADMIN_TSG_ROUTE, ADMIN_SOCIETIES_ROUTE, ADMIN_NEWS_ROUTE, ADMIN_ACHIEVEMENTS_ROUTE } from "../../constants/routes";
// components
import Loader from "../../components/loader/Loader";
// sub pages
const AdminTsg = lazy(() => import("./adminTsg/AdminTsg"));
const AdminSocieties = lazy(() => import("./adminSocieties/AdminSocieties"));
const AdminNews = lazy(() => import("./adminNews/AdminNews"));
const AdminAchievements = lazy(() => import("./adminAchievements/AdminAchievements"));

const Admin = () => {
    return (
        <div className="admin">
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route exact path={ADMIN_TSG_ROUTE} component={AdminTsg} />
                    <Route exact path={ADMIN_SOCIETIES_ROUTE} component={AdminSocieties} />
                    <Route exact path={ADMIN_NEWS_ROUTE} component={AdminNews} />
                    <Route exact path={ADMIN_ACHIEVEMENTS_ROUTE} component={AdminAchievements} />
                    <Redirect to={ADMIN_TSG_ROUTE} />
                </Switch>
            </Suspense>
        </div>
    );
};

export default Admin;
