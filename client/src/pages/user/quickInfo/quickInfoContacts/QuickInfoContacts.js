import React, { lazy, Suspense, useEffect } from "react";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import "./QuickInfoContacts.css";
// constants
import { USER_QUICK_INFO_CONTACTS_CURRENT_OFFICE_BEARERS_ROUTE, USER_QUICK_INFO_CONTACTS_OFFICE_STAFF_ROUTE, USER_QUICK_INFO_CONTACTS_SECRETARIES_ROUTE } from "../../../../constants/routes";
// components
import Loader from "../../../../components/loader/Loader";
// mui
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
// sub pages
const QuickInfoContactsCurrentOfficeBearers = lazy(() => import("./quickInfoContactsCurrentOfficeBearers/QuickInfoContactsCurrentOfficeBearers"))
const QuickInfoContactsOfficeStaff = lazy(() => import("./quickInfoContactsOfficeStaff/QuickInfoContactsOfficeStaff"))
const QuickInfoContactsSecretaries = lazy(() => import("./quickInfoContactsSecretaries/QuickInfoContactsSecretaries"))

const QuickInfoContacts = () => {

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="quickInfoContacts">
            <div className="quickInfoContacts__intro">
                <h1>Contacts</h1>
                <p>Here you get access to the contacts of Current Office Bearers, Office Staff and Secretaries.</p>
            </div>
            <div className="quickInfoContacts__navLinks">
                <NavLink exact to={USER_QUICK_INFO_CONTACTS_CURRENT_OFFICE_BEARERS_ROUTE} className="quickInfoContacts__navLink" activeClassName="quickInfoContacts__activeNavLink"><GroupsRoundedIcon />Current Office Bearers</NavLink>
                <NavLink exact to={USER_QUICK_INFO_CONTACTS_OFFICE_STAFF_ROUTE} className="quickInfoContacts__navLink" activeClassName="quickInfoContacts__activeNavLink"><HomeWorkRoundedIcon />Office Staff</NavLink>
                <NavLink exact to={USER_QUICK_INFO_CONTACTS_SECRETARIES_ROUTE} className="quickInfoContacts__navLink" activeClassName="quickInfoContacts__activeNavLink"><PeopleAltRoundedIcon />Secretaries</NavLink>
            </div>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route exact path={USER_QUICK_INFO_CONTACTS_CURRENT_OFFICE_BEARERS_ROUTE} component={QuickInfoContactsCurrentOfficeBearers} />
                    <Route exact path={USER_QUICK_INFO_CONTACTS_OFFICE_STAFF_ROUTE} component={QuickInfoContactsOfficeStaff} />
                    <Route exact path={USER_QUICK_INFO_CONTACTS_SECRETARIES_ROUTE} component={QuickInfoContactsSecretaries} />
                    <Redirect to={USER_QUICK_INFO_CONTACTS_CURRENT_OFFICE_BEARERS_ROUTE} />
                </Switch>
            </Suspense>
        </div>
    );
};

export default QuickInfoContacts;
