import React, { useEffect, useContext } from "react";
import "./QuickInfoSocieties.css";
// contexts
import QuickInfoContext from "../../../../contexts/quickInfoContext";
// components
import CardsList from "../../../../components/cardsList/CardsList";

const QuickInfoSocieties = () => {
    const societiesList = useContext(QuickInfoContext).data.filter(data => data.category === "societies");

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="quickInfoSocieties">
            <div className="quickInfoSocieties__intro">
                <h1>Societies</h1>
                <p>Here you get access to the details of IIT Kharagpur's cells and societes.</p>
            </div>
            <CardsList list={societiesList} />
        </div>
    );
};

export default QuickInfoSocieties;
