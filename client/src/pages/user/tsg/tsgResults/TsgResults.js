import React, { lazy, Suspense, useEffect } from "react";
import { Switch, Route, Redirect, NavLink } from "react-router-dom";
import "./TsgResults.css";
// constants
import { USER_TSG_STUDENTS_RESULTS_INTER_IIT_ROUTE, USER_TSG_STUDENTS_RESULTS_GC_ROUTE, USER_TSG_STUDENTS_RESULTS_EVENTS_ROUTE } from "../../../../constants/routes";
// components
import Loader from "../../../../components/loader/Loader";
// mui
import SportsKabaddiRoundedIcon from "@mui/icons-material/SportsKabaddiRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import RowingRoundedIcon from "@mui/icons-material/RowingRounded";
// sub pages
const TsgResultsInterIIT = lazy(() => import("./tsgResultsInterIIT/TsgResultsInterIIT"));
const TsgResultsGC = lazy(() => import("./tsgResultsGC/TsgResultsGC"));
const TsgResultsEvents = lazy(() => import("./tsgResultsEvents/TsgResultsEvents"));

const TsgResults = () => {

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="tsgResults">
            <div className="tsgResults__navLinks">
                <NavLink exact to={USER_TSG_STUDENTS_RESULTS_INTER_IIT_ROUTE} className="tsgResults__navLink" activeClassName="tsgResults__activeNavLink"><SportsKabaddiRoundedIcon style={{ marginRight: "7.5px" }} />Inter IIT</NavLink>
                <NavLink exact to={USER_TSG_STUDENTS_RESULTS_GC_ROUTE} className="tsgResults__navLink" activeClassName="tsgResults__activeNavLink"><EmojiEventsRoundedIcon />General Championships</NavLink>
                <NavLink exact to={USER_TSG_STUDENTS_RESULTS_EVENTS_ROUTE} className="tsgResults__navLink" activeClassName="tsgResults__activeNavLink"><RowingRoundedIcon />Events</NavLink>
            </div>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route exact path={USER_TSG_STUDENTS_RESULTS_INTER_IIT_ROUTE} component={TsgResultsInterIIT} />
                    <Route exact path={USER_TSG_STUDENTS_RESULTS_GC_ROUTE} component={TsgResultsGC} />
                    <Route exact path={USER_TSG_STUDENTS_RESULTS_EVENTS_ROUTE} component={TsgResultsEvents} />
                    <Redirect to={USER_TSG_STUDENTS_RESULTS_INTER_IIT_ROUTE} />
                </Switch>
            </Suspense>
        </div>
    );
};

export default TsgResults;
