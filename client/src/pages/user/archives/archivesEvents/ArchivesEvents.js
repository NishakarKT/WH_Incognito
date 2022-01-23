import React, { useEffect, useContext } from "react";
import "./ArchivesEvents.css";
// contexts
import ArchivesContext from "../../../../contexts/archivesContext";
// components
import CardsList from "../../../../components/cardsList/CardsList";

const ArchivesEvents = () => {
    const archivesList = useContext(ArchivesContext).archivesList.filter(archive => archive.category === "Events");

    useEffect(() => {
        if (window.scrollY > 10)
            window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="archivesEvents">
            <div className="archivesEvents__intro">
                <h1>Events</h1>
                <p>Here you get access to the archives of the Technology Students' Gymkhana events!</p>
            </div>
            <CardsList list={archivesList} />
        </div>
    );
};

export default ArchivesEvents;
