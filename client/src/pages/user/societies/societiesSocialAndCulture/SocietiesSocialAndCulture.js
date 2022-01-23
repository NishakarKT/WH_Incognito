import React, { useEffect, useContext } from "react";
import "./SocietiesSocialAndCulture.css";
// contexts
import SocietiesContext from "../../../../contexts/societiesContext";
// components
import CardsList from "../../../../components/cardsList/CardsList";

const SocietiesSocialAndCulture = () => {
    const eventsList = useContext(SocietiesContext).eventsList.filter(event => event.category === "Social And Culture");

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="societiesSocialAndCulture">
            <div className="societiesSocialAndCulture__intro">
                <h1>Social And Culture</h1>
                <p>Here you get all the latest updates over Technology Students' Gymkhana Events around the campus in the domain of Social And Culture!</p>
            </div>
            <CardsList list={eventsList} />
        </div>
    );
};

export default SocietiesSocialAndCulture;
