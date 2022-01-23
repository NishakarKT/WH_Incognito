import React, { useEffect, useContext } from "react";
import "./ArchivesGC.css";
// contexts
import ArchivesContext from "../../../../contexts/archivesContext";
// components
import CardsList from "../../../../components/cardsList/CardsList";

const ArchivesGC = () => {
    const archivesList = useContext(ArchivesContext).archivesList.filter(archive => archive.category === "GC");

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="archivesGC">
            <div className="archivesGC__intro">
                <h1>General Championships</h1>
                <p>Here you get access to the archives of General Championships events!</p>
            </div>
            <CardsList list={archivesList} />
        </div>
    );
};

export default ArchivesGC;
