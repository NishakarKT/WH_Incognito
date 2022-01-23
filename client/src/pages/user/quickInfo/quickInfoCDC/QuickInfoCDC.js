import React, { useContext, useEffect } from "react";
import "./QuickInfoCDC.css";
// components
import CardsList from "../../../../components/cardsList/CardsList";
// contexts
import QuickInfoContext from "../../../../contexts/quickInfoContext";

const QuickInfoCDC = () => {
    const cdcList = useContext(QuickInfoContext).data.filter(data => data.category === "cdc");

    useEffect(() => {
        if (window.scrollY > 10)
            window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="quickInfoCDC">
            <div className="quickInfoCDC__intro">
                <h1>CDC Statistics</h1>
                <p>Here you get all the latest updates over CDC statistcs.</p>
            </div>
            <CardsList list={cdcList} />
        </div>
    );
};

export default QuickInfoCDC;
