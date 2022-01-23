import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import "./StudentsAcademic.css";
// constants
import { USER_STUDENTS_ACADEMIC_NOTES_ROUTE, USER_STUDENTS_ACADEMIC_MATERIALS_ROUTE, USER_STUDENTS_ACADEMIC_QUESTIONS_ROUTE } from "../../../../constants/routes";
// components
import Loader from "../../../../components/loader/Loader";
// mui
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
// pages
const Notes = lazy(() => import("./studentsAcademicNotes/StudentsAcademicNotes"));
const Materials = lazy(() => import("./studentsAcademicMaterials/StudentsAcademicMaterials"));
const Questions = lazy(() => import("./studentsAcademicQuestions/StudentsAcademicQuestions"));

const StudentsAcademic = () => {
    return (
        <div className="studentsAcademic">
            <div className="studentsAcademic__navLinks">
                <NavLink exact to={USER_STUDENTS_ACADEMIC_NOTES_ROUTE} className="studentsAcademic__navLink" activeClassName="studentsAcademic__activeNavLink"><FormatListNumberedRoundedIcon />Notes</NavLink>
                <NavLink exact to={USER_STUDENTS_ACADEMIC_MATERIALS_ROUTE} className="studentsAcademic__navLink" activeClassName="studentsAcademic__activeNavLink"><MenuBookRoundedIcon />Materials</NavLink>
                <NavLink exact to={USER_STUDENTS_ACADEMIC_QUESTIONS_ROUTE} className="studentsAcademic__navLink" activeClassName="studentsAcademic__activeNavLink"><QuizRoundedIcon />Questions</NavLink>
            </div>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route exact path={USER_STUDENTS_ACADEMIC_NOTES_ROUTE} component={Notes} />
                    <Route exact path={USER_STUDENTS_ACADEMIC_MATERIALS_ROUTE} component={Materials} />
                    <Route exact path={USER_STUDENTS_ACADEMIC_QUESTIONS_ROUTE} component={Questions} />
                    <Redirect to={USER_STUDENTS_ACADEMIC_NOTES_ROUTE} />
                </Switch>
            </Suspense>
        </div>
    );
};

export default StudentsAcademic;
