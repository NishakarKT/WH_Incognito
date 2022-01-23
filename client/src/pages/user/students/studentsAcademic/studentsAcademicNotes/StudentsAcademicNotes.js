import React, { useEffect } from "react";
import "./StudentsAcademicNotes.css";

const StudentsAcademicNotes = () => {

    useEffect(() => {
        if (window.scrollY > 10)
            window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="studentsAcademicNotes">
            Students Academic Notes
        </div>
    );
};

export default StudentsAcademicNotes;
