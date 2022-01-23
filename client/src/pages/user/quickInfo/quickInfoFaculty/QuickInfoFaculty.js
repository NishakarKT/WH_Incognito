import React, { useEffect, useContext } from "react";
import "./QuickInfoFaculty.css";
// contexts
import QuickInfoContext from "../../../../contexts/quickInfoContext";
// components
import ContactCard from "../../../../components/contactCard/ContactCard";

const QuickInfoFaculty = () => {
    const facultyList = useContext(QuickInfoContext).data.filter(data => data.category === "faculty");

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="quickInfoFaculty">
            <div className="quickInfoFaculty__intro">
                <h1>Faculty</h1>
                <p>Here you get access to the details of IIT Kharagpur's faculty members.</p>
            </div>
            <div className="quickInfoFaculty__group">
                <p className="quickInfoFaculty__title">Electrical Engineering</p>
                <p className="quickInfoFaculty__description">Electrical engineering is an engineering discipline concerned with the study, design, and application of equipment, devices, and systems which use electricity, electronics, and electromagnetism.</p>
                <div className="quickInfoFaculty__list">
                    {facultyList.filter(faculty => faculty.department === "Electrical Engineering").map((faculty, index) => <ContactCard key={index} contact={faculty} style={{ minWidth: "350px", marginRight: "10px" }} />)}
                </div>
            </div>
            <div className="quickInfoFaculty__group">
                <p className="quickInfoFaculty__title">Electrical Engineering</p>
                <p className="quickInfoFaculty__description">Electrical engineering is an engineering discipline concerned with the study, design, and application of equipment, devices, and systems which use electricity, electronics, and electromagnetism.</p>
                <div className="quickInfoFaculty__list">
                    {facultyList.filter(faculty => faculty.department === "Electrical Engineering").map((faculty, index) => <ContactCard key={index} contact={faculty} style={{ minWidth: "350px", marginRight: "10px" }} />)}
                </div>
            </div>
            <div className="quickInfoFaculty__group">
                <p className="quickInfoFaculty__title">Electrical Engineering</p>
                <p className="quickInfoFaculty__description">Electrical engineering is an engineering discipline concerned with the study, design, and application of equipment, devices, and systems which use electricity, electronics, and electromagnetism.</p>
                <div className="quickInfoFaculty__list">
                    {facultyList.filter(faculty => faculty.department === "Electrical Engineering").map((faculty, index) => <ContactCard key={index} contact={faculty} style={{ minWidth: "350px", marginRight: "10px" }} />)}
                </div>
            </div>
            <div className="quickInfoFaculty__group">
                <p className="quickInfoFaculty__title">Electrical Engineering</p>
                <p className="quickInfoFaculty__description">Electrical engineering is an engineering discipline concerned with the study, design, and application of equipment, devices, and systems which use electricity, electronics, and electromagnetism.</p>
                <div className="quickInfoFaculty__list">
                    {facultyList.filter(faculty => faculty.department === "Electrical Engineering").map((faculty, index) => <ContactCard key={index} contact={faculty} style={{ minWidth: "350px", marginRight: "10px" }} />)}
                </div>
            </div>
        </div>
    );
};

export default QuickInfoFaculty;
