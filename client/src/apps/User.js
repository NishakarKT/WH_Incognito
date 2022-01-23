import React, { lazy, Suspense, Fragment, useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// components
import Nav from "../components/nav/Nav";
import Footer from "../components/footer/Footer";
import Loader from "../components/loader/Loader";
// constants
import { USER_HOME_ROUTE, USER_PROFILE_ROUTE, USER_TSG_ROUTE, USER_SOCIETIES_ROUTE, USER_NEWS_ROUTE, USER_STUDENTS_ROUTE, USER_QUICK_INFO_ROUTE, USER_ARCHIVES_ROUTE } from "../constants/routes";
import PostDrawer from "../components/postDrawer/PostDrawer";
import UserContext from "../contexts/userContext";
// mui
import { Drawer } from "@mui/material";
// apps
const Home = lazy(() => import("../pages/user/home/Home"));
const Profile = lazy(() => import('../pages/user/profile/Profile'));
const Tsg = lazy(() => import("../pages/user/tsg/Tsg"));
const Societies = lazy(() => import("../pages/user/societies/Societies"));
const News = lazy(() => import('../pages/user/news/News'));
const Students = lazy(() => import("../pages/user/students/Students"));
const QuickInfo = lazy(() => import("../pages/user/quickInfo/QuickInfo"));
const Archives = lazy(() => import("../pages/user/archives/Archives"));

const User = () => {
    const { post, setPost } = useContext(UserContext);

    return (
        <Fragment>
            <Nav />
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route path={USER_PROFILE_ROUTE + "/:email"} component={Profile} />
                    <Route path={USER_NEWS_ROUTE} component={News} />
                    <Route path={USER_STUDENTS_ROUTE} component={Students} />
                    <Route path={USER_TSG_ROUTE} component={Tsg} />
                    <Route path={USER_SOCIETIES_ROUTE} component={Societies} />
                    <Route path={USER_QUICK_INFO_ROUTE} component={QuickInfo} />
                    <Route path={USER_ARCHIVES_ROUTE} component={Archives} />
                    <Route exact path={USER_HOME_ROUTE} component={Home} />
                    <Redirect to={USER_HOME_ROUTE} />
                </Switch>
            </Suspense>
            <Footer />
            <Drawer anchor="bottom" open={Boolean(post)} onClose={() => setPost(null)}><PostDrawer post={post} setPost={setPost} /></Drawer>
        </Fragment>
    );
};

export default User;
