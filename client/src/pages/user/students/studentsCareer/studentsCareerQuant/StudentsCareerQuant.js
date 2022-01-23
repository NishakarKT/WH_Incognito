import React, { useEffect } from "react";
import "./StudentsCareerQuant.css";

const StudentsCareerQuant = () => {

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="studentsCareerQuant">
            Students Career Quant
        </div>
    );
};

export default StudentsCareerQuant;
