import React, { useEffect, useContext } from "react";
import "./NewsSportsAndGames.css";
// contexts
import NewsContext from "../../../../contexts/newsContext";
// components
import CardsList from "../../../../components/cardsList/CardsList";

const NewsSportsAndGames = () => {
    const newsList = useContext(NewsContext).newsList.filter(news => news.category === "Sports And Games");

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="newsSportsAndGames">
            <div className="newsSportsAndGames__intro">
                <h1>Sports And Games</h1>
                <p>Here you get all the latest updates over happenings around the campus in the domain of Sports And Games!</p>
            </div>
            <CardsList list={newsList} />
        </div>
    );
};

export default NewsSportsAndGames;
