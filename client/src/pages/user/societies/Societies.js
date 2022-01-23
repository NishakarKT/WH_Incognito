import React, { lazy, Suspense, useState, useEffect } from "react";
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import axios from "axios";
import "./Societies.css";
// constants
import { USER_SOCIETIES_HOME_ROUTE, USER_SOCIETIES_SOCIAL_AND_CULTURE_ROUTE, USER_SOCIETIES_SPORTS_AND_GAMES_ROUTE, USER_SOCIETIES_STUDENTS_WELFARE_ROUTE, USER_SOCIETIES_TECHNOLOGY_ROUTE } from "../../../constants/routes";
import { SOCIETES_LOGO_PNG } from "../../../constants/images";
import { SOCIETIES_GET_ENDPOINT } from "../../../constants/endpoints";
// contexts
import SocietiesContext from "../../../contexts/societiesContext";
// components
import MediaSlider from "../../../components/mediaSlider/MediaSlider";
import Loader from "../../../components/loader/Loader";
// mui
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ComputerRoundedIcon from "@mui/icons-material/ComputerRounded";
import TheaterComedyRoundedIcon from "@mui/icons-material/TheaterComedyRounded";
import SportsCricketRoundedIcon from "@mui/icons-material/SportsCricketRounded";
import SentimentVerySatisfiedRoundedIcon from "@mui/icons-material/SentimentVerySatisfiedRounded";
// sub-pages
const SocietiesHome = lazy(() => import("./societiesHome/SocietiesHome"));
const SocietiesTechnology = lazy(() => import("./societiesTechnology/SocietiesTechnology"));
const SocietiesSocialAndCulture = lazy(() => import("./societiesSocialAndCulture/SocietiesSocialAndCulture"));
const SocietiesSportsAndGames = lazy(() => import("./societiesSportsAndGames/SocietiesSportsAndGames"));
const SocietiesStudentsWelfare = lazy(() => import("./societiesStudentsWelfare/SocietiesStudentsWelfare"));

const Societies = () => {
    const [eventsList, setEventsList] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        try {
            axios.get(SOCIETIES_GET_ENDPOINT)
                .then(res => setEventsList(res.data))
                .catch(err => { })
        } catch (err) { };
    }, []);

    return (
        <div className="societies">
            <MediaSlider mediaFiles={eventsList.slice(0, 5).map(post => post.fileURLs[0])} isBgFixed isCarousel style={{ height: "70vh" }} canDefault />
            <div className="societies__shapeDivider">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 0L0 0 598.97 114.72 1200 0z" className="shape-fill"></path>
                </svg>
            </div>
            <div className="societies__logo">
                <img src={SOCIETES_LOGO_PNG} alt="" />
                <h1>Societies Point</h1>
                <p>Scroll, Explore & Stay Updated!</p>
                <p>One place where you get the latest updates over all the Societies' Gymkhana's events around the campus.</p>
            </div>
            <div className="societies__navLinks">
                <NavLink exact to={USER_SOCIETIES_HOME_ROUTE} className="societies__navLink" activeClassName="societies__activeNavLink"><HomeRoundedIcon />Home</NavLink>
                <NavLink exact to={USER_SOCIETIES_TECHNOLOGY_ROUTE} className="societies__navLink" activeClassName="societies__activeNavLink"><ComputerRoundedIcon />Technology</NavLink>
                <NavLink exact to={USER_SOCIETIES_SOCIAL_AND_CULTURE_ROUTE} className="societies__navLink" activeClassName="societies__activeNavLink"><TheaterComedyRoundedIcon />Social And Culture</NavLink>
                <NavLink exact to={USER_SOCIETIES_SPORTS_AND_GAMES_ROUTE} className="societies__navLink" activeClassName="societies__activeNavLink"><SportsCricketRoundedIcon />Sports And Games</NavLink>
                <NavLink exact to={USER_SOCIETIES_STUDENTS_WELFARE_ROUTE} className="societies__navLink" activeClassName="societies__activeNavLink"><SentimentVerySatisfiedRoundedIcon />Students' Welfare</NavLink>
            </div>
            <Suspense fallback={<Loader />}>
                <SocietiesContext.Provider value={{ eventsList }}>
                    <Switch>
                        <Route exact path={USER_SOCIETIES_HOME_ROUTE} component={SocietiesHome} />
                        <Route exact path={USER_SOCIETIES_TECHNOLOGY_ROUTE} component={SocietiesTechnology} />
                        <Route exact path={USER_SOCIETIES_SOCIAL_AND_CULTURE_ROUTE} component={SocietiesSocialAndCulture} />
                        <Route exact path={USER_SOCIETIES_SPORTS_AND_GAMES_ROUTE} component={SocietiesSportsAndGames} />
                        <Route exact path={USER_SOCIETIES_STUDENTS_WELFARE_ROUTE} component={SocietiesStudentsWelfare} />
                        <Redirect to={USER_SOCIETIES_HOME_ROUTE} />
                    </Switch>
                </SocietiesContext.Provider>
            </Suspense>
        </div>
    );
};

export default Societies;
