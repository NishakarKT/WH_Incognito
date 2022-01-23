import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./NewsHome.css";
// constants
import { USER_NEWS_SOCIAL_AND_CULTURE_ROUTE, USER_NEWS_SPORTS_AND_GAMES_ROUTE, USER_NEWS_STUDENTS_WELFARE_ROUTE, USER_NEWS_TECHNOLOGY_ROUTE, USER_PROFILE_NOTIFICATIONS_ROUTE } from "../../../../constants/routes";
// contexts
import NewsContext from "../../../../contexts/newsContext";
import MainCard from "../../../../components/mainCard/MainCard";
import GridCard from "../../../../components/gridCard/GridCard";
import SideCard from "../../../../components/sideCard/SideCard";
import MediaSlider from "../../../../components/mediaSlider/MediaSlider";
// mui
import { Button } from "@mui/material";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import DoNotTouchRoundedIcon from "@mui/icons-material/DoNotTouchRounded";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";

const NewsHome = () => {
    const history = useHistory();
    const { newsList } = useContext(NewsContext);
    const technologyList = newsList.filter(news => news.category === "Technology");
    const socialAndCultureList = newsList.filter(news => news.category === "Social And Culture");
    const sportsAndGamesList = newsList.filter(news => news.category === "Sports And Games");
    const studentsWelfareList = newsList.filter(news => news.category === "Students' Welfare");

    useEffect(() => {
        if (window.scrollY > 10)
            window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="newsHome">
            <MediaSlider mediaFiles={newsList.map(news => news.fileURLs[0])} isBgFixed isCarousel canDefault style={{ height: "70vh" }} />
            <div className="newsHome__heading">
                <h1>Top Stories</h1>
                <p>Here are the top stories of the day! Scroll, Explore & Stay Updated!</p>
                <p>By covering Technology, Social & Culture, Sports & Game and Students' Welfare, we, the TSG TV, bring you the news from every corner!</p>
                <div className="newsHome__buttons">
                    <Button onClick={() => window.scrollBy(0, window.innerHeight)}><TravelExploreRoundedIcon />Most Recent</Button>
                    <Button onClick={() => history.push(USER_PROFILE_NOTIFICATIONS_ROUTE)}><NotificationsActiveRoundedIcon />Notifications</Button>
                </div>
            </div>
            {newsList.length >= 3 ? <div className="newsHome__topStories">
                <GridCard data={newsList[0]} />
                <GridCard data={newsList[1]} />
                <GridCard data={newsList[2]} />
            </div> : null}
            <div className="newsHome__list">
                <h1>Technology</h1>
                <p>Here you get all the latest updates over happenings around the campus in the domain of Technology!</p>
                <div className="newsHome__buttons">
                    <Button onClick={() => history.push(USER_NEWS_TECHNOLOGY_ROUTE)}><ExploreRoundedIcon />Exlore now!</Button>
                    <Button onClick={() => window.scrollBy(0, window.innerHeight)}><DoNotTouchRoundedIcon />Not interested!</Button>
                </div>
                <div className="newsHome__group" style={{ flexDirection: "row" }}>
                    <MainCard data={technologyList[0]} style={{ flex: "1", height: "400px", margin: "0 10px 0 0" }} />
                    <div className="newsHome__subGroup" style={{ width: "100%" }}>
                        {technologyList[1] ? <SideCard data={technologyList[1]} style={{ height: "195px", margin: "0 10px 10px 0" }} /> : null}
                        {technologyList[2] ? <SideCard data={technologyList[2]} style={{ height: "195px", margin: "0 10px 0 0" }} /> : null}
                    </div>
                </div>
            </div>
            <div className="newsHome__list">
                <h1>Social And Culture</h1>
                <p>Here you get all the latest updates over happenings around the campus in the domain of Social And Culture!</p>
                <div className="newsHome__buttons">
                    <Button onClick={() => history.push(USER_NEWS_SOCIAL_AND_CULTURE_ROUTE)}><ExploreRoundedIcon />Exlore now!</Button>
                    <Button onClick={() => window.scrollBy(0, window.innerHeight)}><DoNotTouchRoundedIcon />Not interested!</Button>
                </div>
                <div className="newsHome__group" style={{ flexDirection: "row-reverse" }}>
                    <MainCard data={socialAndCultureList[0]} style={{ flex: "1", height: "400px", margin: "0 0 0 10px" }} />
                    <div className="newsHome__subGroup" style={{ width: "100%" }}>
                        {socialAndCultureList[1] ? <SideCard data={socialAndCultureList[1]} style={{ height: "195px", margin: "0 0 10px 0" }} /> : null}
                        {socialAndCultureList[2] ? <SideCard data={socialAndCultureList[2]} style={{ height: "195px", margin: "0 0 0 0" }} /> : null}
                    </div>
                </div>
            </div>
            <div className="newsHome__list">
                <h1>Sports And Games</h1>
                <p>Here you get all the latest updates over happenings around the campus in the domain of Sports And Games!</p>
                <div className="newsHome__buttons">
                    <Button onClick={() => history.push(USER_NEWS_SPORTS_AND_GAMES_ROUTE)}><ExploreRoundedIcon />Exlore now!</Button>
                    <Button onClick={() => window.scrollBy(0, window.innerHeight)}><DoNotTouchRoundedIcon />Not interested!</Button>
                </div>
                <div className="newsHome__group" style={{ flexDirection: "row" }}>
                    <MainCard data={sportsAndGamesList[0]} style={{ flex: "1", height: "400px", margin: "0 10px 0 0" }} />
                    <div className="newsHome__subGroup" style={{ width: "100%" }}>
                        {sportsAndGamesList[1] ? <SideCard data={sportsAndGamesList[1]} style={{ height: "195px", margin: "0 10px 10px 0" }} /> : null}
                        {sportsAndGamesList[2] ? <SideCard data={sportsAndGamesList[2]} style={{ height: "195px", margin: "0 10px 0 0" }} /> : null}
                    </div>
                </div>
            </div>
            <div className="newsHome__list">
                <h1>Students' Welfare</h1>
                <p>Here you get all the latest updates over happenings around the campus in the domain of Students' Welfare!</p>
                <div className="newsHome__buttons">
                    <Button onClick={() => history.push(USER_NEWS_STUDENTS_WELFARE_ROUTE)}><ExploreRoundedIcon />Exlore now!</Button>
                    <Button onClick={() => window.scrollBy(0, window.innerHeight)}><DoNotTouchRoundedIcon />Not interested!</Button>
                </div>
                <div className="newsHome__group" style={{ flexDirection: "row-reverse" }}>
                    <MainCard data={studentsWelfareList[0]} style={{ flex: "1", height: "400px", margin: "0 0 0 10px" }} />
                    <div className="newsHome__subGroup" style={{ width: "100%" }}>
                        {studentsWelfareList[1] ? <SideCard data={studentsWelfareList[1]} style={{ height: "195px", margin: "0 0 10px 0" }} /> : null}
                        {studentsWelfareList[2] ? <SideCard data={studentsWelfareList[2]} style={{ height: "195px", margin: "0 0 0 0" }} /> : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsHome;
