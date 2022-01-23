import React, { useEffect } from "react";
import "./StudentsCareerData.css";

const StudentsCareerData = () => {

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="studentsCareerData">
            Students Career Data
        </div>
    );
};

export default StudentsCareerData;
