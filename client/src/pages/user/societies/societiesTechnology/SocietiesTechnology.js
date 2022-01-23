import React, { useEffect, useContext } from "react";
import "./SocietiesTechnology.css";
// contexts
import SocietiesContext from "../../../../contexts/societiesContext";
// components
import CardsList from "../../../../components/cardsList/CardsList";

const SocietiesTechnology = () => {
    const eventsList = useContext(SocietiesContext).eventsList.filter(event => event.category === "Technology");

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="societiesTechnology">
            <div className="societiesTechnology__intro">
                <h1>Technology</h1>
                <p>Here you get all the latest updates over Technology Students' Gymkhana Events around the campus in the domain of Technology!</p>
            </div>
            <CardsList list={eventsList} />
        </div>
    );
};

export default SocietiesTechnology;
