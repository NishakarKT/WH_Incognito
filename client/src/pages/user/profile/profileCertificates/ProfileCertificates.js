import React, { lazy, Suspense, useContext } from "react";
import { Switch, Redirect, Route, NavLink } from "react-router-dom";
import "./ProfileCertificates.css";
// constants
import { USER_PROFILE_ROUTE, USER_PROFILE_CERTIFICATES_SOCIAL_AND_CULTURE_ROUTE, USER_PROFILE_CERTIFICATES_SPORTS_AND_GAMES_ROUTE, USER_PROFILE_CERTIFICATES_STUDENTS_WELFARE_ROUTE, USER_PROFILE_CERTIFICATES_TECHNOLOGY_ROUTE } from "../../../../constants/routes";
// components
import Loader from "../../../../components/loader/Loader";
// mui
import ComputerRoundedIcon from "@mui/icons-material/ComputerRounded";
import TheaterComedyRoundedIcon from "@mui/icons-material/TheaterComedyRounded";
import SportsCricketRoundedIcon from "@mui/icons-material/SportsCricketRounded";
import SentimentVerySatisfiedRoundedIcon from "@mui/icons-material/SentimentVerySatisfiedRounded";
// contexts
import ProfileContext from "../../../../contexts/profileContext";
// sub pages
const ProfileCertificatesTechnology = lazy(() => import("./profileCertificatesTechnology/ProfileCertificatesTechnology"))
const ProfileCertificatesSocialAndCulture = lazy(() => import("./profileCertificatesSocialAndCulture/ProfileCertificatesSocialAndCulture"))
const ProfileCertificatesSportsAndGames = lazy(() => import("./profileCertificatesSportsAndGames/ProfileCertificatesSportsAndGames"))
const ProfileCertificatesStudentsWelfare = lazy(() => import("./profileCertificatesStudentsWelfare/ProfileCertificatesStudentsWelfare"))

const ProfileCertificates = () => {
    const { profile } = useContext(ProfileContext);

    return (
        <div className="profileCertificates">
            <div className="profileCertificates__navLinks">
                <NavLink exact to={USER_PROFILE_ROUTE + "/" + profile.email + "/certificates/technology"} className="profileCertificates__navLink" activeClassName="profileCertificates__activeNavLink"><ComputerRoundedIcon />Technology</NavLink>
                <NavLink exact to={USER_PROFILE_ROUTE + "/" + profile.email + "/certificates/social&culture"} className="profileCertificates__navLink" activeClassName="profileCertificates__activeNavLink"><TheaterComedyRoundedIcon />Social And Culture</NavLink>
                <NavLink exact to={USER_PROFILE_ROUTE + "/" + profile.email + "/certificates/sports&games"} className="profileCertificates__navLink" activeClassName="profileCertificates__activeNavLink"><SportsCricketRoundedIcon />Sports And Games</NavLink>
                <NavLink exact to={USER_PROFILE_ROUTE + "/" + profile.email + "/certificates/welfare"} className="profileCertificates__navLink" activeClassName="profileCertificates__activeNavLink"><SentimentVerySatisfiedRoundedIcon />Students' Welfare</NavLink>
            </div>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route exact path={USER_PROFILE_CERTIFICATES_TECHNOLOGY_ROUTE} component={ProfileCertificatesTechnology} />
                    <Route exact path={USER_PROFILE_CERTIFICATES_SOCIAL_AND_CULTURE_ROUTE} component={ProfileCertificatesSocialAndCulture} />
                    <Route exact path={USER_PROFILE_CERTIFICATES_SPORTS_AND_GAMES_ROUTE} component={ProfileCertificatesSportsAndGames} />
                    <Route exact path={USER_PROFILE_CERTIFICATES_STUDENTS_WELFARE_ROUTE} component={ProfileCertificatesStudentsWelfare} />
                    <Redirect to={USER_PROFILE_CERTIFICATES_TECHNOLOGY_ROUTE} />
                </Switch>
            </Suspense>
        </div>
    );
};

export default ProfileCertificates;
