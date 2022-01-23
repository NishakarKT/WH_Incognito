import React, { useEffect, useContext } from "react";
import "./NewsStudentsWelfare.css";
// contexts
import NewsContext from "../../../../contexts/newsContext";
// components
import CardsList from "../../../../components/cardsList/CardsList";

const NewsStudentsWelfare = () => {
    const newsList = useContext(NewsContext).newsList.filter(news => news.category === "Students' Welfare");

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="newsStudentsWelfare">
            <div className="newsStudentsWelfare__intro">
                <h1>Students' Welfare</h1>
                <p>Here you get all the latest updates over happenings around the campus in the domain of Students' Welfare!</p>
            </div>
            <CardsList list={newsList} />
        </div>
    );
};

export default NewsStudentsWelfare;
