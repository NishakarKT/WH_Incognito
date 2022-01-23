import React, { useEffect, useContext } from "react";
import "./QuickInfoHalls.css";
// contexts
import QuickInfoContext from "../../../../contexts/quickInfoContext";
// components
import CardsList from "../../../../components/cardsList/CardsList";

const QuickInfoHalls = () => {
    const hallsList = useContext(QuickInfoContext).data.filter(data => data.category === "halls");

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="quickInfoHalls">
            <div className="quickInfoHalls__intro">
                <h1>Halls of Residence</h1>
                <p>Here you get access to the details of IIT Kharagpur's halls of residence.</p>
            </div>
            <CardsList list={hallsList} />
        </div>
    );
};

export default QuickInfoHalls;
