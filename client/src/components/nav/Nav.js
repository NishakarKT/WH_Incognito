import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory, NavLink } from "react-router-dom";
import "./Nav.css";
// constants
import { USER_HOME_ROUTE, USER_TSG_ROUTE, USER_SOCIETIES_ROUTE, USER_NEWS_ROUTE, USER_STUDENTS_ROUTE, USER_QUICK_INFO_ROUTE, USER_ARCHIVES_ROUTE, USER_PROFILE_ROUTE, AUTH_PORTAL_ROUTE } from "../../constants/routes";
import { TSG_LOGO_WHITE_PNG, DOTS_BG_WHITE_PNG } from "../../constants/images";
// contexts
import UserContext from "../../contexts/userContext";
// mui icons
import { Menu, IconButton } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import RowingRoundedIcon from "@mui/icons-material/RowingRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import ArchiveRoundedIcon from "@mui/icons-material/ArchiveRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import DynamicFeedRoundedIcon from "@mui/icons-material/DynamicFeedRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";

const Nav = () => {
    const scrollToTopRef = useRef(null);
    const history = useHistory();
    const { user } = useContext(UserContext);
    const [avatarPic, setAvatarPic] = useState("")
    const [avatarAnchor, setAvatarAnchor] = useState(null)
    const [menuAnchor, setMenuAnchor] = useState(null)

    useEffect(() => {
        setAvatarPic(`https://avatars.dicebear.com/api/avataaars/${Math.floor(Math.random() * 10000)}.svg`);
        window.addEventListener("scroll", handleScrollEvents);
        return () => window.removeEventListener("scroll", handleScrollEvents);
    }, []);

    const handleSignOut = () => {
        const currData = JSON.parse(localStorage.getItem("hackathon"));
        delete currData["token"];
        const newData = currData;
        localStorage.setItem("hackathon", JSON.stringify(newData));
        history.push(AUTH_PORTAL_ROUTE);
        window.location.reload();
    };

    const handleScrollEvents = () => {
        if (window.scrollY > 10)
            scrollToTopRef.current.style.transform = "scale(1)";
        else
            scrollToTopRef.current.style.transform = "scale(0)";
    };

    return (
        <div className="nav__container">
            <IconButton ref={scrollToTopRef} onClick={() => window.scrollTo(0, 0)}><ArrowUpwardRoundedIcon /></IconButton>
            <div className="nav">
                <div className="nav__bg" style={{ backgroundImage: `url("${DOTS_BG_WHITE_PNG}")` }}></div>
                <div className="nav__left" onClick={() => history.push(USER_HOME_ROUTE)}>
                    <img className="nav__logo" src={TSG_LOGO_WHITE_PNG} alt="" />
                    <div className="nav__title">
                        <p>Technology Students' Gymkhana</p>
                        <p>Indian Institute Of Technology, Kharagpur</p>
                    </div>
                </div>
                <div className="nav__right">
                    <NavLink exact to={USER_HOME_ROUTE} className="nav__link" activeClassName="nav__activeLink"><HomeRoundedIcon />Home</NavLink>
                    <NavLink to={USER_TSG_ROUTE} className="nav__link" activeClassName="nav__activeLink"><RowingRoundedIcon />TSG</NavLink>
                    <NavLink to={USER_SOCIETIES_ROUTE} className="nav__link" activeClassName="nav__activeLink"><GroupsRoundedIcon />Societies</NavLink>
                    <NavLink to={USER_STUDENTS_ROUTE} className="nav__link" activeClassName="nav__activeLink"><AssignmentIndRoundedIcon />Students</NavLink>
                    <NavLink to={USER_NEWS_ROUTE} className="nav__link" activeClassName="nav__activeLink"><NewspaperRoundedIcon />News</NavLink>
                    <NavLink to={USER_QUICK_INFO_ROUTE} className="nav__link" activeClassName="nav__activeLink"><HelpRoundedIcon />Quick Info</NavLink>
                    <NavLink to={USER_ARCHIVES_ROUTE} className="nav__link" activeClassName="nav__activeLink"><ArchiveRoundedIcon />Archives</NavLink>
                    <img className="nav__avatar" src={user.profilePic || avatarPic} alt="" onClick={e => setAvatarAnchor(e.currentTarget)} style={{ marginLeft: "10px" }} />
                    <Menu className="nav__basicMenu" anchorEl={avatarAnchor} open={Boolean(avatarAnchor)} onClose={() => setAvatarAnchor(null)}>
                        <div className="nav__menu">
                            <div className="nav__menuInfo">
                                <img className="nav__avatar" src={user.profilePic || avatarPic} alt="" onClick={() => { setAvatarAnchor(null); history.push(USER_PROFILE_ROUTE + "/" + user.email); }} />
                                <div className="nav__userInfo">
                                    <p>{user.name || "Anonymous"}</p>
                                    <p>{user.roll || "Why not sign in?"}</p>
                                </div>
                            </div>
                            <div className="nav__menuLinks" onClick={() => setAvatarAnchor(null)}>
                                <NavLink to={"/profile/" + user.email + "/posts"} className="nav__link" activeClassName="nav__activeLink"><DynamicFeedRoundedIcon />Posts</NavLink>
                                <NavLink to={"/profile/" + user.email + "/friends"} className="nav__link" activeClassName="nav__activeLink"><PeopleAltRoundedIcon />Friends</NavLink>
                                <NavLink to={"/profile/" + user.email + "/messages"} className="nav__link" activeClassName="nav__activeLink"><ForumRoundedIcon />Messages</NavLink>
                                <NavLink to={"/profile/" + user.email + "/certificates"} className="nav__link" activeClassName="nav__activeLink"><EmojiEventsRoundedIcon />Certificates</NavLink>
                                <NavLink to={"/profile/" + user.email + "/notifications"} className="nav__link" activeClassName="nav__activeLink"><NotificationsActiveRoundedIcon />Notifications</NavLink>
                                <NavLink to={"/profile/" + user.email + "/settings"} className="nav__link" activeClassName="nav__activeLink"><SettingsRoundedIcon />Settings</NavLink>
                                <div onClick={() => user.name ? handleSignOut() : history.push(AUTH_PORTAL_ROUTE)} className="nav__link"><ExitToAppRoundedIcon />{user.name ? "Sign Out" : "Sign In"}</div>
                            </div>
                        </div>
                    </Menu>
                </div>

                <IconButton className="nav__menuToggle" onClick={e => setMenuAnchor(e.currentTarget)}><MenuRoundedIcon /></IconButton>
                <Menu className="nav__basicMenu nav__resMenu" anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
                    <div className="nav__menu">
                        <div className="nav__menuInfo">
                            <img className="nav__avatar" src={user.profilePic || avatarPic} alt="" onClick={() => { setMenuAnchor(null); history.push(USER_PROFILE_ROUTE + "/" + user.email); }} />
                            <div className="nav__userInfo">
                                <p>{user.name || "Anonymous"}</p>
                                <p>{user.roll || "Why not sign in?"}</p>
                            </div>
                        </div>
                        <div className="nav__menuLinks" onClick={() => setMenuAnchor(null)}>
                            <NavLink exact to={USER_HOME_ROUTE} className="nav__link" activeClassName="nav__activeLink"><HomeRoundedIcon />Home</NavLink>
                            <NavLink to={USER_TSG_ROUTE} className="nav__link" activeClassName="nav__activeLink"><RowingRoundedIcon />TSG</NavLink>
                            <NavLink to={USER_SOCIETIES_ROUTE} className="nav__link" activeClassName="nav__activeLink"><GroupsRoundedIcon />Societies</NavLink>
                            <NavLink to={USER_STUDENTS_ROUTE} className="nav__link" activeClassName="nav__activeLink"><AssignmentIndRoundedIcon />Students</NavLink>
                            <NavLink to={USER_NEWS_ROUTE} className="nav__link" activeClassName="nav__activeLink"><NewspaperRoundedIcon />News</NavLink>
                            <NavLink to={USER_QUICK_INFO_ROUTE} className="nav__link" activeClassName="nav__activeLink"><HelpRoundedIcon />Quick</NavLink>
                            <NavLink to={USER_ARCHIVES_ROUTE} className="nav__link" activeClassName="nav__activeLink"><ArchiveRoundedIcon />Archives</NavLink>
                            <NavLink to={"/profile/" + user.email + "/notifications"} className="nav__link" activeClassName="nav__activeLink"><NotificationsActiveRoundedIcon />Notifications</NavLink>
                            <NavLink to={"/profile/" + user.email + "/settings"} className="nav__link" activeClassName="nav__activeLink"><SettingsRoundedIcon />Settings</NavLink>
                            <div onClick={() => user.name ? handleSignOut() : history.push(AUTH_PORTAL_ROUTE)} className="nav__link"><ExitToAppRoundedIcon />{user.name ? "Sign Out" : "Sign In"}</div>
                        </div>
                    </div>
                </Menu>
            </div>
        </div>
    );
};

export default Nav;
