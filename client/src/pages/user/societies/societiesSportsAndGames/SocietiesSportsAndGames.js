import React, { useEffect, useContext } from "react";
import "./SocietiesSportsAndGames.css";
// contexts
import SocietiesContext from "../../../../contexts/societiesContext";
// components
import CardsList from "../../../../components/cardsList/CardsList";

const SocietiesSportsAndGames = () => {
    const eventsList = useContext(SocietiesContext).eventsList.filter(event => event.category === "Sports And Games");

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="societiesSportsAndGames">
            <div className="societiesSportsAndGames__intro">
                <h1>Sports And Games</h1>
                <p>Here you get all the latest updates over Technology Students' Gymkhana Events campus in the domain of Sports And Games!</p>
            </div>
            <CardsList list={eventsList} />
        </div>
    );
};

export default SocietiesSportsAndGames;
