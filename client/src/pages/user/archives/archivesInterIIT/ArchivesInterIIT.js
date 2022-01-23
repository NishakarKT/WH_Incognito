import React, { useEffect, useContext } from "react";
import "./ArchivesInterIIT.css";
// contexts
import ArchivesContext from "../../../../contexts/archivesContext";
// components
import CardsList from "../../../../components/cardsList/CardsList";

const ArchivesInterIIT = () => {
    const archivesList = useContext(ArchivesContext).archivesList.filter(archive => archive.category === "Inter IIT");

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="archivesInterIIT">
            <div className="archivesInterIIT__intro">
                <h1>Inter IIT</h1>
                <p>Here you get access to the archives of the Inter IIT Events!</p>
            </div>
            <CardsList list={archivesList} />
        </div>
    );
};

export default ArchivesInterIIT;
