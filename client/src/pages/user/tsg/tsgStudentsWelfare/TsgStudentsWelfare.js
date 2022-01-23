import React, { useEffect, useContext } from "react";
import "./TsgStudentsWelfare.css";
// contexts
import TsgContext from "../../../../contexts/tsgContext";
// components
import CardsList from "../../../../components/cardsList/CardsList";

const TsgStudentsWelfare = () => {
    const eventsList = useContext(TsgContext).eventsList.filter(event => event.category === "Students' Welfare");

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="tsgStudentsWelfare">
            <div className="tsgStudentsWelfare__intro">
                <h1>Students' Welfare</h1>
                <p>Here you get all the latest updates over Technology Students' Gymkhana Events campus in the domain of Students' Welfare!</p>
            </div>
            {eventsList.length ? <CardsList list={eventsList} /> : <p style={{ textAlign: "center", margin: "50px 10px", fontSize: "20px", color: "grey", fontWeight: "500" }}>No Events yet.</p>}
        </div>
    );
};

export default TsgStudentsWelfare;
