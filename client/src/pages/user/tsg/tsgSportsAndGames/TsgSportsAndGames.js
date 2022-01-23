import React, { useEffect, useContext } from "react";
import "./TsgSportsAndGames.css";
// contexts
import TsgContext from "../../../../contexts/tsgContext";
// components
import CardsList from "../../../../components/cardsList/CardsList";

const TsgSportsAndGames = () => {
    const eventsList = useContext(TsgContext).eventsList.filter(event => event.category === "Sports And Games");

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="tsgSportsAndGames">
            <div className="tsgSportsAndGames__intro">
                <h1>Sports And Games</h1>
                <p>Here you get all the latest updates over Technology Students' Gymkhana Events campus in the domain of Sports And Games!</p>
            </div>
            {eventsList.length ? <CardsList list={eventsList} /> : <p style={{ textAlign: "center", margin: "50px 10px", fontSize: "20px", color: "grey", fontWeight: "500" }}>No Events yet.</p>}
        </div>
    );
};

export default TsgSportsAndGames;
