import React, { useEffect, useContext } from "react";
import "./NewsTechnology.css";
// contexts
import NewsContext from "../../../../contexts/newsContext";
// components
import CardsList from "../../../../components/cardsList/CardsList";

const NewsTechnology = () => {
    const newsList = useContext(NewsContext).newsList.filter(news => news.category === "Technology");

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="newsTechnology">
            <div className="newsTechnology__intro">
                <h1>Technology</h1>
                <p>Here you get all the latest updates over happenings around the campus in the domain of Technology!</p>
            </div>
            <CardsList list={newsList} />
        </div>
    );
};

export default NewsTechnology;
