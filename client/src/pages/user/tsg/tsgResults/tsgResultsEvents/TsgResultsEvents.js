import React, { useEffect, useContext } from "react";
import "./TsgResultsEvents.css";
// contexts
import TsgContext from "../../../../../contexts/tsgContext";
// components
import CardsList from "../../../../../components/cardsList/CardsList";

const TsgResultsEvents = () => {
    const resultsList = useContext(TsgContext).eventsList.filter(event => event.subCategory === "Events");

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="tsgResultsEvents">
            <div className="tsgResultsEvents__intro">
                <h1>TSG - Events Results</h1>
                <p>Here you get all the latest updates over Results of the Technology Students' Gymkhana's Events!</p>
            </div>
            {resultsList.length ? <CardsList list={resultsList} /> : <p style={{ textAlign: "center", margin: "50px 10px", fontSize: "20px", color: "grey", fontWeight: "500" }}>No Results yet.</p>}
        </div>
    );
};

export default TsgResultsEvents;
