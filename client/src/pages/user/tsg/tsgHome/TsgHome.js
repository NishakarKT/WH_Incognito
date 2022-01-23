import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./TsgHome.css";
// constants
import { USER_TSG_SOCIAL_AND_CULTURE_ROUTE, USER_TSG_SPORTS_AND_GAMES_ROUTE, USER_TSG_STUDENTS_RESULTS_ROUTE, USER_TSG_STUDENTS_WELFARE_ROUTE, USER_TSG_TECHNOLOGY_ROUTE } from "../../../../constants/routes";
import { OFFICIAL_TSG_URL } from "../../../../constants/urls";
// constants
import TsgContext from "../../../../contexts/tsgContext";
// components
import MediaSlider from "../../../../components/mediaSlider/MediaSlider";
import GridCard from "../../../../components/gridCard/GridCard";
import MainCard from "../../../../components/mainCard/MainCard";
import SideCard from "../../../../components/sideCard/SideCard";
// mui
import { Button } from "@mui/material";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import DoNotTouchRoundedIcon from "@mui/icons-material/DoNotTouchRounded";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";

const TsgHome = () => {
    const history = useHistory();
    const { eventsList } = useContext(TsgContext);
    const technologyList = eventsList.filter(event => event.category === "Technology");
    const socialAndCultureList = eventsList.filter(event => event.category === "Social And Culture");
    const sportsAndGamesList = eventsList.filter(event => event.category === "Sports And Games");
    const studentsWelfareList = eventsList.filter(event => event.category === "Students' Welfare");
    const resultsList = eventsList.filter(event => event.category === "Results");

    useEffect(() => {
        if (window.scrollY > 10)
            window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="tsgHome">
            <MediaSlider mediaFiles={eventsList.map(news => news.fileURLs[0])} isBgFixed isCarousel canDefault style={{ height: "70vh" }} />
            <div className="tsgHome__heading">
                <h1>Top Events</h1>
                <p>Here are the top events of the day!</p>
                <p>By covering Technology, Social & Culture, Sports & Games and Students' Welfare, we, the Technology Students' Gymkhana, bring you the events from every corner!</p>
                <div className="tsgHome__buttons">
                    <Button onClick={() => window.scrollBy(0, window.innerHeight)}><TravelExploreRoundedIcon />Most Recent</Button>
                    <Button onClick={() => window.open(OFFICIAL_TSG_URL)}><NotificationsActiveRoundedIcon />TSG Website</Button>
                </div>
            </div>
            {eventsList.length >= 3 ? <div className="tsgHome__topEvents">
                <GridCard data={eventsList[0]} />
                <GridCard data={eventsList[1]} />
                <GridCard data={eventsList[2]} />
            </div> : null}
            <div className="tsgHome__list">
                <h1>Technology</h1>
                <p>Here you get all the latest updates over Technology Students' Gymkhana Events around the campus in the domain of Technology!</p>
                <div className="tsgHome__buttons">
                    <Button onClick={() => history.push(USER_TSG_TECHNOLOGY_ROUTE)}><ExploreRoundedIcon />Exlore now!</Button>
                    <Button onClick={() => window.scrollBy(0, window.innerHeight)}><DoNotTouchRoundedIcon />Not interested!</Button>
                </div>
                <div className="tsgHome__group" style={{ flexDirection: "row" }}>
                    <MainCard data={technologyList[0]} style={{ flex: "1", height: "400px", margin: "0 10px 0 0" }} />
                    <div className="tsgHome__subGroup" style={{ width: "100%" }}>
                        {technologyList[1] ? <SideCard data={technologyList[1]} style={{ height: "195px", margin: "0 10px 10px 0" }} /> : null}
                        {technologyList[2] ? <SideCard data={technologyList[2]} style={{ height: "195px", margin: "0 10px 0 0" }} /> : null}
                    </div>
                </div>
            </div>
            <div className="tsgHome__list">
                <h1>Social And Culture</h1>
                <p>Here you get all the latest updatesover Technology Students' Gymkhana Events around the campus in the domain of Social And Culture!</p>
                <div className="tsgHome__buttons">
                    <Button onClick={() => history.push(USER_TSG_SOCIAL_AND_CULTURE_ROUTE)}><ExploreRoundedIcon />Exlore now!</Button>
                    <Button onClick={() => window.scrollBy(0, window.innerHeight)}><DoNotTouchRoundedIcon />Not interested!</Button>
                </div>
                <div className="tsgHome__group" style={{ flexDirection: "row-reverse" }}>
                    <MainCard data={socialAndCultureList[0]} style={{ flex: "1", height: "400px", margin: "0 0 0 10px" }} />
                    <div className="tsgHome__subGroup" style={{ width: "100%" }}>
                        {socialAndCultureList[1] ? <SideCard data={socialAndCultureList[1]} style={{ height: "195px", margin: "0 0 10px 0" }} /> : null}
                        {socialAndCultureList[2] ? <SideCard data={socialAndCultureList[2]} style={{ height: "195px", margin: "0 0 0 0" }} /> : null}
                    </div>
                </div>
            </div>
            <div className="tsgHome__list">
                <h1>Sports And Games</h1>
                <p>Here you get all the latest updates over Technology Students' Gymkhana Events campus in the domain of Sports And Games!</p>
                <div className="tsgHome__buttons">
                    <Button onClick={() => history.push(USER_TSG_SPORTS_AND_GAMES_ROUTE)}><ExploreRoundedIcon />Exlore now!</Button>
                    <Button onClick={() => window.scrollBy(0, window.innerHeight)}><DoNotTouchRoundedIcon />Not interested!</Button>
                </div>
                <div className="tsgHome__group" style={{ flexDirection: "row" }}>
                    <MainCard data={sportsAndGamesList[0]} style={{ flex: "1", height: "400px", margin: "0 10px 0 0" }} />
                    <div className="tsgHome__subGroup" style={{ width: "100%" }}>
                        {sportsAndGamesList[1] ? <SideCard data={sportsAndGamesList[1]} style={{ height: "195px", margin: "0 10px 10px 0" }} /> : null}
                        {sportsAndGamesList[2] ? <SideCard data={sportsAndGamesList[2]} style={{ height: "195px", margin: "0 10px 0 0" }} /> : null}
                    </div>
                </div>
            </div>
            <div className="tsgHome__list">
                <h1>Students' Welfare</h1>
                <p>Here you get all the latest updates over Technology Students' Gymkhana Events campus in the domain of Students' Welfare!</p>
                <div className="tsgHome__buttons">
                    <Button onClick={() => history.push(USER_TSG_STUDENTS_WELFARE_ROUTE)}><ExploreRoundedIcon />Exlore now!</Button>
                    <Button onClick={() => window.scrollBy(0, window.innerHeight)}><DoNotTouchRoundedIcon />Not interested!</Button>
                </div>
                <div className="tsgHome__group" style={{ flexDirection: "row-reverse" }}>
                    <MainCard data={studentsWelfareList[0]} style={{ flex: "1", height: "400px", margin: "0 0 0 10px" }} />
                    <div className="tsgHome__subGroup" style={{ width: "100%" }}>
                        {studentsWelfareList[1] ? <SideCard data={studentsWelfareList[1]} style={{ height: "195px", margin: "0 0 10px 0" }} /> : null}
                        {studentsWelfareList[2] ? <SideCard data={studentsWelfareList[2]} style={{ height: "195px", margin: "0 0 0 0" }} /> : null}
                    </div>
                </div>
            </div>
            <div className="tsgHome__list">
                <h1>Results</h1>
                <p>Here you get all the latest updates over Results of the Technology Students' Gymkhana Events around the campus!</p>
                <div className="tsgHome__buttons">
                    <Button onClick={() => history.push(USER_TSG_STUDENTS_RESULTS_ROUTE)}><ExploreRoundedIcon />Exlore now!</Button>
                    <Button onClick={() => window.scrollBy(0, window.innerHeight)}><DoNotTouchRoundedIcon />Not interested!</Button>
                </div>
                <div className="tsgHome__group" style={{ flexDirection: "row" }}>
                    <MainCard data={resultsList[0]} style={{ flex: "1", height: "400px", margin: "0 10px 0 0" }} />
                    <div className="tsgHome__subGroup" style={{ width: "100%" }}>
                        {resultsList[1] ? <SideCard data={resultsList[1]} style={{ height: "195px", margin: "0 10px 10px 0" }} /> : null}
                        {resultsList[2] ? <SideCard data={resultsList[2]} style={{ height: "195px", margin: "0 10px 0 0" }} /> : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TsgHome;
