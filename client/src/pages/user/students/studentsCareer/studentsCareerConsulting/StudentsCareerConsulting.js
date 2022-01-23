import React, { useEffect } from "react";
import "./StudentsCareerConsulting.css";

const StudentsCareerConsulting = () => {

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="studentsCareerConsulting">
            Students Career Consulting
        </div>
    );
};

export default StudentsCareerConsulting;
