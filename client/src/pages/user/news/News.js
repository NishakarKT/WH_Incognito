import React, { lazy, Suspense, useState, useEffect } from "react";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import "./News.css";
// constants
import { USER_NEWS_HOME_ROUTE, USER_NEWS_SOCIAL_AND_CULTURE_ROUTE, USER_NEWS_SPORTS_AND_GAMES_ROUTE, USER_NEWS_STUDENTS_WELFARE_ROUTE, USER_NEWS_TECHNOLOGY_ROUTE } from "../../../constants/routes";
import { NEWS_LOGO_PNG } from "../../../constants/images";
import { NEWS_GET_ENDPOINT } from "../../../constants/endpoints";
// contexts
import NewsContext from "../../../contexts/newsContext";
// components
import TsgMarquee from "../../../components/tsgMarquee/TsgMarquee";
import MediaSlider from "../../../components/mediaSlider/MediaSlider";
import Loader from "../../../components/loader/Loader";
// mui
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ComputerRoundedIcon from "@mui/icons-material/ComputerRounded";
import TheaterComedyRoundedIcon from "@mui/icons-material/TheaterComedyRounded";
import SportsCricketRoundedIcon from "@mui/icons-material/SportsCricketRounded";
import SentimentVerySatisfiedRoundedIcon from "@mui/icons-material/SentimentVerySatisfiedRounded";
// sub pages
const NewsHome = lazy(() => import("./newsHome/NewsHome"));
const NewsTechnology = lazy(() => import("./newsTechnology/NewsTechnology"));
const NewsSocialAndCulture = lazy(() => import("./newsSocialAndCulture/NewsSocialAndCulture"));
const NewsSportsAndGames = lazy(() => import("./newsSportsAndGames/NewsSportsAndGames"));
const NewsStudentsWelfare = lazy(() => import("./newsStudentsWelfare/NewsStudentsWelfare"));

const News = () => {
    const [newsList, setNewsList] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        try {
            axios.get(NEWS_GET_ENDPOINT)
                .then(res => setNewsList(res.data))
                .catch(err => { })
        } catch (err) { };
    }, []);

    return (
        <div className="news">
            <MediaSlider mediaFiles={newsList.slice(0, 5).map(news => news.fileURLs[0])} isBgFixed isCarousel style={{ height: "70vh" }} />
            <div className="news__shapeDivider">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 0L0 0 598.97 114.72 1200 0z" className="shape-fill"></path>
                </svg>
            </div>
            <div className="news__logo">
                <img src={NEWS_LOGO_PNG} alt="" />
                <h1>TSG TV</h1>
                <p>Scroll, Explore & Stay Updated!</p>
                <p>One place where you get the latest updates over all the happenings around the campus.</p>
            </div>
            <div className="news__navLinks">
                <NavLink exact to={USER_NEWS_HOME_ROUTE} className="news__navLink" activeClassName="news__activeNavLink"><HomeRoundedIcon />Home</NavLink>
                <NavLink exact to={USER_NEWS_TECHNOLOGY_ROUTE} className="news__navLink" activeClassName="news__activeNavLink"><ComputerRoundedIcon />Technology</NavLink>
                <NavLink exact to={USER_NEWS_SOCIAL_AND_CULTURE_ROUTE} className="news__navLink" activeClassName="news__activeNavLink"><TheaterComedyRoundedIcon />Social And Culture</NavLink>
                <NavLink exact to={USER_NEWS_SPORTS_AND_GAMES_ROUTE} className="news__navLink" activeClassName="news__activeNavLink"><SportsCricketRoundedIcon />Sports And Games</NavLink>
                <NavLink exact to={USER_NEWS_STUDENTS_WELFARE_ROUTE} className="news__navLink" activeClassName="news__activeNavLink"><SentimentVerySatisfiedRoundedIcon />Students' Welfare</NavLink>
            </div>
            <Suspense fallback={<Loader />}>
                <NewsContext.Provider value={{ newsList }}>
                    <Switch>
                        <Route exact path={USER_NEWS_HOME_ROUTE} component={NewsHome} />
                        <Route exact path={USER_NEWS_TECHNOLOGY_ROUTE} component={NewsTechnology} />
                        <Route exact path={USER_NEWS_SOCIAL_AND_CULTURE_ROUTE} component={NewsSocialAndCulture} />
                        <Route exact path={USER_NEWS_SPORTS_AND_GAMES_ROUTE} component={NewsSportsAndGames} />
                        <Route exact path={USER_NEWS_STUDENTS_WELFARE_ROUTE} component={NewsStudentsWelfare} />
                        <Redirect to={USER_NEWS_HOME_ROUTE} />
                    </Switch>
                </NewsContext.Provider>
            </Suspense>
            <div className="news__marquee">
                <img src={NEWS_LOGO_PNG} alt="" style={{ bottom: newsList.length ? "35px" : "15px" }} />
                <TsgMarquee dataList={newsList} />
            </div>
        </div>
    );
};

export default News;
