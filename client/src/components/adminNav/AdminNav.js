import React, { useState, useEffect, useContext, useRef } from "react";
import { useHistory, NavLink } from "react-router-dom";
import "./AdminNav.css";
// constants
import { TSG_LOGO_WHITE_PNG, DOTS_BG_WHITE_PNG, ADMIN_PNG } from "../../constants/images";
import { ADMIN_TSG_ROUTE, ADMIN_SOCIETIES_ROUTE, ADMIN_NEWS_ROUTE, ADMIN_ACHIEVEMENTS_ROUTE, AUTH_ADMIN_PORTAL_ROUTE } from "../../constants/routes";
// contexts
import UserContext from "../../contexts/userContext";
// mui
import { Menu, IconButton } from "@mui/material";
import RowingRoundedIcon from "@mui/icons-material/RowingRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

const AdminNav = () => {
    const scrollToTopRef = useRef(null);
    const history = useHistory();
    const { admin } = useContext(UserContext);
    const [avatarAnchor, setAvatarAnchor] = useState(null);
    const [menuAnchor, setMenuAnchor] = useState(null);

    useEffect(() => {
        window.addEventListener("scroll", handleScrollEvents);
        return () => window.removeEventListener("scroll", handleScrollEvents);
    }, []);

    const handleSignOut = () => {
        const currData = JSON.parse(localStorage.getItem("hackathon"));
        delete currData["adminToken"];
        const newData = currData;
        localStorage.setItem("hackathon", JSON.stringify(newData));
        history.push(AUTH_ADMIN_PORTAL_ROUTE);
        window.location.reload();
    };

    const handleScrollEvents = () => {
        if (window.scrollY > 10)
            scrollToTopRef.current.style.transform = "scale(1)";
        else
            scrollToTopRef.current.style.transform = "scale(0)";
    };

    return (
        <div className="adminNav__container">
            <IconButton ref={scrollToTopRef} onClick={() => window.scrollTo(0, 0)}><ArrowUpwardRoundedIcon /></IconButton>
            <div className="adminNav">
                <div className="adminNav__bg" style={{ backgroundImage: `url("${DOTS_BG_WHITE_PNG}")` }}></div>
                <div className="adminNav__left" onClick={() => history.push(ADMIN_TSG_ROUTE)}>
                    <img className="adminNav__logo" src={TSG_LOGO_WHITE_PNG} alt="" />
                    <div className="adminNav__title">
                        <p>Technology Students' Gymkhana <sup style={{ color: "lime", fontSize: "15px" }}>Admin</sup></p>
                        <p>Indian Institute Of Technology, Kharagpur</p>
                    </div>
                </div>
                <div className="adminNav__right">
                    <NavLink to={ADMIN_TSG_ROUTE} className="adminNav__link" activeClassName="adminNav__activeLink"><RowingRoundedIcon />TSG</NavLink>
                    <NavLink to={ADMIN_SOCIETIES_ROUTE} className="adminNav__link" activeClassName="adminNav__activeLink"><GroupsRoundedIcon />Societies</NavLink>
                    <NavLink to={ADMIN_NEWS_ROUTE} className="adminNav__link" activeClassName="adminNav__activeLink"><NewspaperRoundedIcon />News</NavLink>
                    <NavLink to={ADMIN_ACHIEVEMENTS_ROUTE} className="adminNav__link" activeClassName="adminNav__activeLink"><HelpRoundedIcon />Achievements</NavLink>
                    <img className="adminNav__avatar" src={ADMIN_PNG} alt="" onClick={e => setAvatarAnchor(e.currentTarget)} style={{ marginLeft: "15px" }} />
                    <Menu className="adminNav__basicMenu" anchorEl={avatarAnchor} open={Boolean(avatarAnchor)} onClose={() => setAvatarAnchor(null)}>
                        <div className="adminNav__menu">
                            <div className="adminNav__menuInfo">
                                <img className="adminNav__avatar" src={ADMIN_PNG} alt="" onClick={() => setAvatarAnchor(null)} />
                                <div className="adminNav__userInfo" >
                                    <p>{admin.name}</p>
                                    <p>{admin.roll}</p>
                                </div>
                            </div>
                            <div className="adminNav__menuLinks" onClick={() => setAvatarAnchor(null)}>
                                <div onClick={() => handleSignOut()} className="adminNav__link"><ExitToAppRoundedIcon />Sign Out</div>
                            </div>
                        </div>
                    </Menu>
                </div>
                <IconButton className="adminNav__menuToggle" onClick={e => setMenuAnchor(e.currentTarget)}><MenuRoundedIcon /></IconButton>
                <Menu className="adminNav__basicMenu adminNav__resMenu" anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
                    <div className="adminNav__menu">
                        <div className="adminNav__menuInfo">
                            <img className="adminNav__avatar" src={ADMIN_PNG} alt="" onClick={() => setMenuAnchor(null)} />
                            <div className="adminNav__userInfo">
                                <p>{admin.name}</p>
                                <p>{admin.roll}</p>
                            </div>
                        </div>
                        <div className="adminNav__menuLinks" onClick={() => setMenuAnchor(null)}>
                            <NavLink to={ADMIN_TSG_ROUTE} className="adminNav__link" activeClassName="adminNav__activeLink"><RowingRoundedIcon />TSG</NavLink>
                            <NavLink to={ADMIN_SOCIETIES_ROUTE} className="adminNav__link" activeClassName="adminNav__activeLink"><GroupsRoundedIcon />Societies</NavLink>
                            <NavLink to={ADMIN_NEWS_ROUTE} className="adminNav__link" activeClassName="adminNav__activeLink"><NewspaperRoundedIcon />News</NavLink>
                            <NavLink to={ADMIN_ACHIEVEMENTS_ROUTE} className="adminNav__link" activeClassName="adminNav__activeLink"><HelpRoundedIcon />Achievements</NavLink>
                            <div onClick={() => handleSignOut()} className="adminNav__link"><ExitToAppRoundedIcon />Sign Out</div>
                        </div>
                    </div>
                </Menu>
            </div>
        </div>
    );
};

export default AdminNav;
