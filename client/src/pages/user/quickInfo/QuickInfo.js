import React, { lazy, Suspense, useState, useEffect } from "react";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import "./QuickInfo.css";
// constants
import { USER_QUICK_INFO_CDC_ROUTE, USER_QUICK_INFO_LINKS_ROUTE, USER_QUICK_INFO_CONTACTS_ROUTE, USER_QUICK_INFO_HALLS_ROUTE, USER_QUICK_INFO_SOCIETIES_ROUTE, USER_QUICK_INFO_FACULTY_ROUTE } from "../../../constants/routes";
import { QUICK_INFO_LOGO_PNG } from "../../../constants/images";
// contexts
import QuickInfoContext from "../../../contexts/quickInfoContext";
import MediaSlider from "../../../components/mediaSlider/MediaSlider";
import Loader from "../../../components/loader/Loader";
// mui
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import ContactPhoneRoundedIcon from "@mui/icons-material/ContactPhoneRounded";
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
// data
import data from "./data.json";
// sub pages
const QuickInfoCDC = lazy(() => import("./quickInfoCDC/QuickInfoCDC"));
const QuickInfoLinks = lazy(() => import("./quickInfoLinks/QuickInfoLinks"));
const QuickInfoContacts = lazy(() => import("./quickInfoContacts/QuickInfoContacts"));
const QuickInfoHalls = lazy(() => import("./quickInfoHalls/QuickInfoHalls"));
const QuickInfoSocieties = lazy(() => import("./quickInfoSocieties/QuickInfoSocieties"));
const QuickInfoFaculty = lazy(() => import("./quickInfoFaculty/QuickInfoFaculty.js"));

const QuickInfo = () => {
    return (
        <div className="quickInfo">
            <MediaSlider mediaFiles={data.slice(0, 5).map(data => data.fileURLs[0])} isBgFixed isCarousel style={{ height: "70vh" }} />
            <div className="quickInfo__shapeDivider">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 0L0 0 598.97 114.72 1200 0z" className="shape-fill"></path>
                </svg>
            </div>
            <div className="quickInfo__logo">
                <img src={QUICK_INFO_LOGO_PNG} alt="" />
                <h1>Quick Info</h1>
                <p>Scroll, Explore & Stay Updated!</p>
                <p>One place where you get access to all the information about cdc, quick links, contacts, halls, societies and faculty.</p>
            </div>
            <div className="quickInfo__navLinks">
                <NavLink exact to={USER_QUICK_INFO_CDC_ROUTE} className="quickInfo__navLink" activeClassName="quickInfo__activeNavLink"><PaidRoundedIcon />CDC</NavLink>
                <NavLink exact to={USER_QUICK_INFO_LINKS_ROUTE} className="quickInfo__navLink" activeClassName="quickInfo__activeNavLink"><LanguageRoundedIcon />Links</NavLink>
                <NavLink to={USER_QUICK_INFO_CONTACTS_ROUTE} className="quickInfo__navLink" activeClassName="quickInfo__activeNavLink"><ContactPhoneRoundedIcon />Contacts</NavLink>
                <NavLink exact to={USER_QUICK_INFO_HALLS_ROUTE} className="quickInfo__navLink" activeClassName="quickInfo__activeNavLink"><HomeWorkRoundedIcon />Halls</NavLink>
                <NavLink exact to={USER_QUICK_INFO_SOCIETIES_ROUTE} className="quickInfo__navLink" activeClassName="quickInfo__activeNavLink"><GroupRoundedIcon />Societies</NavLink>
                <NavLink exact to={USER_QUICK_INFO_FACULTY_ROUTE} className="quickInfo__navLink" activeClassName="quickInfo__activeNavLink"><AccountCircleRoundedIcon />Faculty</NavLink>
            </div>
            <Suspense fallback={<Loader />}>
                <QuickInfoContext.Provider value={{ data }}>
                    <Switch>
                        <Route path={USER_QUICK_INFO_CONTACTS_ROUTE} component={QuickInfoContacts} />
                        <Route exact path={USER_QUICK_INFO_CDC_ROUTE} component={QuickInfoCDC} />
                        <Route exact path={USER_QUICK_INFO_LINKS_ROUTE} component={QuickInfoLinks} />
                        <Route exact path={USER_QUICK_INFO_HALLS_ROUTE} component={QuickInfoHalls} />
                        <Route exact path={USER_QUICK_INFO_SOCIETIES_ROUTE} component={QuickInfoSocieties} />
                        <Route exact path={USER_QUICK_INFO_FACULTY_ROUTE} component={QuickInfoFaculty} />
                        <Redirect to={USER_QUICK_INFO_CDC_ROUTE} />
                    </Switch>
                </QuickInfoContext.Provider>
            </Suspense>
        </div>
    );
};

export default QuickInfo;
