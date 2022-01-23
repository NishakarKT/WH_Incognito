import React, { useEffect } from "react";
import "./StudentsCareerFinance.css";

const StudentsCareerFinance = () => {

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="studentsCareerFinance">
            Students Career Finance
        </div>
    );
};

export default StudentsCareerFinance;
