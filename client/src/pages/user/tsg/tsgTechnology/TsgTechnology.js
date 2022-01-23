import React, { useEffect, useContext } from "react";
import "./TsgTechnology.css";
// contexts
import TsgContext from "../../../../contexts/tsgContext";
// components
import CardsList from "../../../../components/cardsList/CardsList";

const TsgTechnology = () => {
    const eventsList = useContext(TsgContext).eventsList.filter(event => event.category === "Technology");

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="tsgTechnology">
            <div className="tsgTechnology__intro">
                <h1>Technology</h1>
                <p>Here you get all the latest updates over Technology Students' Gymkhana Events around the campus in the domain of Technology!</p>
            </div>
            {eventsList.length ? <CardsList list={eventsList} /> : <p style={{ textAlign: "center", margin: "50px 10px", fontSize: "20px", color: "grey", fontWeight: "500" }}>No Events yet.</p>}
        </div>
    );
};

export default TsgTechnology;
