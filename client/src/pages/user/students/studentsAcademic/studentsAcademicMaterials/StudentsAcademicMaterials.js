import React, { useEffect } from "react";
import "./StudentsAcademicMaterials.css";

const StudentsAcademicMaterials = () => {

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="studentsAcademicMaterials">
            Students Academic Materials
        </div>
    );
};

export default StudentsAcademicMaterials;
