import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./ProfileNotifications.css";
// constants
import { USER_PROFILE_ROUTE, USER_PROFILE_POSTS_ROUTE, USER_NEWS_HOME_ROUTE } from "../../../../constants/routes";
import { NEWS_LOGO_PNG } from "../../../../constants/images";
// components
import Notification from "./notification/Notification";
// contexts
import UserContext from "../../../../contexts/userContext";
import ProfileContext from "../../../../contexts/profileContext";
// mui
import { Button, Pagination } from "@mui/material";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";

const ProfileNotifications = () => {
    const history = useHistory();
    const { user, notifications } = useContext(UserContext);
    const { profile, itsMe } = useContext(ProfileContext);
    const [page, setPage] = useState(1);

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
        if (!itsMe)
            history.push(USER_PROFILE_ROUTE + "/" + profile.email)
    }, [history, itsMe, profile]);

    const handlePage = (e, value) => {
        setPage(value);
        window.scrollTo(0, window.innerHeight);
    };

    return (
        <div className="profileNotifications">
            <div className="profileNotifications__welcome">
                <div className="profileNotifications__intro">
                    <img src={user.profilePic} alt="" />
                    <div className="profileNotifications__shapeDivider">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
                        </svg>
                    </div>
                    <p>Welcome back, <Link to={USER_PROFILE_POSTS_ROUTE} className="profileNotifications__link">{user.name}</Link>!<br />Looks like you are all caught up. Try <span className="profileNotifications__link" onClick={() => window.location.reload()}>refershing</span> or come back later for new updates.</p>
                    <Button onClick={() => window.location.reload()}><RefreshRoundedIcon />Refresh</Button>
                </div>
                <div className="profileNotifications__info">
                    <InfoRoundedIcon />
                    <p>Here you get access to all the latest updates over different events and your involvements.</p>
                </div>
                <div className="profileNotifications__news">
                    <img src={NEWS_LOGO_PNG} alt="" />
                    <h1>What's new?</h1>
                    <p>Why not check out the <Link to={USER_NEWS_HOME_ROUTE} className="profileNotifications__link">News Bulletin</Link>?</p>
                    <p>One place where you get the latest updates over all the happenings around the campus.</p>
                </div>
            </div>
            <div className="profileNotifications__list">
                <div className="profileNotifications__heading">
                    <h1>Notifications</h1>
                    <p>Here you get access to all the latest updates over different events and your involvements.</p>
                </div>
                {notifications.slice(3 * (page - 1), 3 * (page - 1) + 3).map((notification, index) => <Notification key={index} notification={notification} />)}
                <Pagination count={Math.ceil(notifications.length / 3)} onChange={handlePage} />
            </div>
        </div>
    );
};

export default ProfileNotifications;
