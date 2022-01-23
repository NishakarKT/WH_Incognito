import React, { useEffect } from "react";
import "./StudentsCareerSDE.css";

const StudentsCareerSDE = () => {

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="studentsCareerSDE">
            Students Career SDE
        </div>
    );
};

export default StudentsCareerSDE;
