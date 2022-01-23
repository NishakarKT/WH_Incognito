import React, { useEffect, useContext } from "react";
import "./NewsSocialAndCulture.css"
// components
import CardsList from "../../../../components/cardsList/CardsList";
// contexts
import NewsContext from "../../../../contexts/newsContext";

const NewsSocialAndCulture = () => {
    const newsList = useContext(NewsContext).newsList.filter(news => news.category === "Social And Culture");

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="newsSocialAndCulture">
            <div className="newsSocialAndCulture__intro">
                <h1>Social And Culture</h1>
                <p>Here you get all the latest updates over happenings around the campus in the domain of Social And Culture!</p>
            </div>
            <CardsList list={newsList} />
        </div>
    );
};

export default NewsSocialAndCulture;
