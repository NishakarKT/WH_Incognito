import React, { useEffect } from "react";
import "./StudentsCareerCore.css";

const StudentsCareerCore = () => {

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="studentsCareerCore">
            Students Career Core
        </div>
    );
};

export default StudentsCareerCore;
