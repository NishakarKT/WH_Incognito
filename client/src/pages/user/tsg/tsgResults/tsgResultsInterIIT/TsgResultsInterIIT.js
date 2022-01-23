import React, { useEffect, useContext } from "react";
import "./TsgResultsInterIIT.css";
// contexts
import TsgContext from '../../../../../contexts/tsgContext';
// components
import CardsList from "../../../../../components/cardsList/CardsList";

const TsgResultsInterIIT = () => {
    const resultsList = useContext(TsgContext).eventsList.filter(event => event.subCategory === "Inter IIT");

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="tsgResultsInterIIT">
            <div className="tsgResultsInterIIT__intro">
                <h1>Inter IIT Results</h1>
                <p>Here you get all the latest updates over Results of the Inter IIT Events!</p>
            </div>
            {resultsList.length ? <CardsList list={resultsList} /> : <p style={{ textAlign: "center", margin: "50px 10px", fontSize: "20px", color: "grey", fontWeight: "500" }}>No Results yet.</p>}
        </div>
    );
};

export default TsgResultsInterIIT;
