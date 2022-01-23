import React, { useEffect, useContext } from "react";
import "./TsgResultsGC.css";
// contexts
import TsgContext from "../../../../../contexts/tsgContext";
// components
import CardsList from "../../../../../components/cardsList/CardsList";

const TsgResultsGC = () => {
    const resultsList = useContext(TsgContext).eventsList.filter(event => event.subCategory === "General Championships");

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="tsgResultsGC">
            <div className="tsgResultsGC__intro">
                <h1>General Championships Results</h1>
                <p>Here you get all the latest updates over Results of the Genral Championships' Events!</p>
            </div>
            {resultsList.length ? <CardsList list={resultsList} /> : <p style={{ textAlign: "center", margin: "50px 10px", fontSize: "20px", color: "grey", fontWeight: "500" }}>No Results yet.</p>}
        </div>
    );
};

export default TsgResultsGC;
