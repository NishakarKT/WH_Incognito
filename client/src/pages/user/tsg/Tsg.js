import React, { lazy, Suspense, useState, useEffect } from "react";
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import axios from "axios";
import "./Tsg.css";
// constants
import { USER_TSG_HOME_ROUTE, USER_TSG_SOCIAL_AND_CULTURE_ROUTE, USER_TSG_SPORTS_AND_GAMES_ROUTE, USER_TSG_STUDENTS_RESULTS_ROUTE, USER_TSG_STUDENTS_WELFARE_ROUTE, USER_TSG_TECHNOLOGY_ROUTE } from "../../../constants/routes";
import { TSG_LOGO_WHITE_PNG } from "../../../constants/images";
// contexts
import TsgContext from "../../../contexts/tsgContext";
// components
import MediaSlider from "../../../components/mediaSlider/MediaSlider";
import Loader from "../../../components/loader/Loader";
// mui
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ComputerRoundedIcon from "@mui/icons-material/ComputerRounded";
import TheaterComedyRoundedIcon from "@mui/icons-material/TheaterComedyRounded";
import SportsCricketRoundedIcon from "@mui/icons-material/SportsCricketRounded";
import SentimentVerySatisfiedRoundedIcon from "@mui/icons-material/SentimentVerySatisfiedRounded";
import SsidChartRoundedIcon from "@mui/icons-material/SsidChartRounded";
import { TSG_GET_ENDPOINT } from "../../../constants/endpoints";
// sub-pages
const TsgHome = lazy(() => import("./tsgHome/TsgHome"));
const TsgTechnology = lazy(() => import("./tsgTechnology/TsgTechnology"));
const TsgSocialAndCulture = lazy(() => import("./tsgSocialAndCulture/TsgSocialAndCulture"));
const TsgSportsAndGames = lazy(() => import("./tsgSportsAndGames/TsgSportsAndGames"));
const TsgStudentsWelfare = lazy(() => import("./tsgStudentsWelfare/TsgStudentsWelfare"));
const TsgResults = lazy(() => import("./tsgResults/TsgResults"));

const Tsg = () => {
    const [eventsList, setEventsList] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        try {
            axios.get(TSG_GET_ENDPOINT)
                .then(res => setEventsList(res.data))
                .catch(err => { })
        } catch (err) { };
    }, []);

    return (
        <div className="tsg">
            <MediaSlider mediaFiles={eventsList.slice(0, 5).map(post => post.fileURLs[0])} isBgFixed isCarousel style={{ height: "70vh" }} canDefault />
            <div className="tsg__shapeDivider">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 0L0 0 598.97 114.72 1200 0z" className="shape-fill"></path>
                </svg>
            </div>
            <div className="tsg__logo">
                <img src={TSG_LOGO_WHITE_PNG} alt="" />
                <h1>TSG - Events</h1>
                <p>Scroll, Explore & Stay Updated!</p>
                <p>One place where you get the latest updates over all the Technology Students' Gymkhana's events around the campus.</p>
            </div>
            <div className="tsg__navLinks">
                <NavLink exact to={USER_TSG_HOME_ROUTE} className="tsg__navLink" activeClassName="tsg__activeNavLink"><HomeRoundedIcon />Home</NavLink>
                <NavLink exact to={USER_TSG_TECHNOLOGY_ROUTE} className="tsg__navLink" activeClassName="tsg__activeNavLink"><ComputerRoundedIcon />Technology</NavLink>
                <NavLink exact to={USER_TSG_SOCIAL_AND_CULTURE_ROUTE} className="tsg__navLink" activeClassName="tsg__activeNavLink"><TheaterComedyRoundedIcon />Social And Culture</NavLink>
                <NavLink exact to={USER_TSG_SPORTS_AND_GAMES_ROUTE} className="tsg__navLink" activeClassName="tsg__activeNavLink"><SportsCricketRoundedIcon />Sports And Games</NavLink>
                <NavLink exact to={USER_TSG_STUDENTS_WELFARE_ROUTE} className="tsg__navLink" activeClassName="tsg__activeNavLink"><SentimentVerySatisfiedRoundedIcon />Students' Welfare</NavLink>
                <NavLink to={USER_TSG_STUDENTS_RESULTS_ROUTE} className="tsg__navLink" activeClassName="tsg__activeNavLink"><SsidChartRoundedIcon />Results</NavLink>
            </div>
            <Suspense fallback={<Loader />}>
                <TsgContext.Provider value={{ eventsList }}>
                    <Switch>
                        <Route exact path={USER_TSG_HOME_ROUTE} component={TsgHome} />
                        <Route exact path={USER_TSG_TECHNOLOGY_ROUTE} component={TsgTechnology} />
                        <Route exact path={USER_TSG_SOCIAL_AND_CULTURE_ROUTE} component={TsgSocialAndCulture} />
                        <Route exact path={USER_TSG_SPORTS_AND_GAMES_ROUTE} component={TsgSportsAndGames} />
                        <Route exact path={USER_TSG_STUDENTS_WELFARE_ROUTE} component={TsgStudentsWelfare} />
                        <Route path={USER_TSG_STUDENTS_RESULTS_ROUTE} component={TsgResults} />
                        <Redirect to={USER_TSG_HOME_ROUTE} />
                    </Switch>
                </TsgContext.Provider>
            </Suspense>
        </div>
    );
};

export default Tsg;
