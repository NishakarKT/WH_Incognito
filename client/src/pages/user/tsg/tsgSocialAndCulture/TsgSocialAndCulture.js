import React, { useEffect, useContext } from "react";
import "./TsgSocialAndCulture.css";
// contexts
import TsgContext from "../../../../contexts/tsgContext";
// components
import CardsList from "../../../../components/cardsList/CardsList";

const TsgSocialAndCulture = () => {
    const eventsList = useContext(TsgContext).eventsList.filter(event => event.category === "Social And Culture");

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="tsgSocialAndCulture">
            <div className="tsgSocialAndCulture__intro">
                <h1>Social And Culture</h1>
                <p>Here you get all the latest updates over Technology Students' Gymkhana Events around the campus in the domain of Social And Culture!</p>
            </div>
            {eventsList.length ? <CardsList list={eventsList} /> : <p style={{ textAlign: "center", margin: "50px 10px", fontSize: "20px", color: "grey", fontWeight: "500" }}>No Events yet.</p>}
        </div>
    );
};

export default TsgSocialAndCulture;
