import React, { useEffect, useContext } from "react";
import "./SocietiesStudentsWelfare.css";
// contexts
import SocietiesContext from "../../../../contexts/societiesContext";
// components
import CardsList from "../../../../components/cardsList/CardsList";

const SocietiesStudentsWelfare = () => {
    const eventsList = useContext(SocietiesContext).eventsList.filter(event => event.category === "Students' Welfare");

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="societiesStudentsWelfare">
            <div className="societiesStudentsWelfare__intro">
                <h1>Students' Welfare</h1>
                <p>Here you get all the latest updates over Technology Students' Gymkhana Events campus in the domain of Students' Welfare!</p>
            </div>
            <CardsList list={eventsList} />
        </div>
    );
};

export default SocietiesStudentsWelfare;
