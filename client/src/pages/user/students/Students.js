import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import "./Students.css";
// constants
import { USER_STUDENTS_ACADEMIC_ROUTE, USER_STUDENTS_CAREER_ROUTE } from "../../../constants/routes";
import { STUDENTS_LOGO_PNG } from "../../../constants/images";
// components
import Loader from "../../../components/loader/Loader";
import MediaSlider from "../../../components/mediaSlider/MediaSlider";
// mui
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
// pages
const StudentsAcademic = lazy(() => import("./studentsAcademic/StudentsAcademic"));
const StudentsCareer = lazy(() => import("./studentsCareer/StudentsCareer"));
// test data
const mediaFiles = [
    "https://firebasestorage.googleapis.com/v0/b/tsg-hackathon.appspot.com/o/students_class1.jpg?alt=media&token=59264237-9344-4476-9c77-67ed89ed3eaf",
    "https://firebasestorage.googleapis.com/v0/b/tsg-hackathon.appspot.com/o/students_class2.jpg?alt=media&token=59264237-9344-4476-9c77-67ed89ed3eaf",
    "https://firebasestorage.googleapis.com/v0/b/tsg-hackathon.appspot.com/o/students_class3.jpg?alt=media&token=59264237-9344-4476-9c77-67ed89ed3eaf",
];

const Students = () => {
    return (
        <div className="students">
            <MediaSlider mediaFiles={mediaFiles} isBgFixed isCarousel style={{ height: "70vh" }} />
            <div className="students__shapeDivider">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 0L0 0 598.97 114.72 1200 0z" className="shape-fill"></path>
                </svg>
            </div>
            <div className="students__logo">
                <img src={STUDENTS_LOGO_PNG} alt="" />
                <h1>Students' Point</h1>
                <p>Academic Point / Career Point</p>
                <p>One place where you get access to notes, study materials, question papers, etc. over a wide range of fields. Explore the Academic Point for academically oriented materials and the Career Point for those pursuing their dreams.</p>
            </div>
            <div className="students__navLinks">
                <NavLink to={USER_STUDENTS_ACADEMIC_ROUTE} className="students__navLink" activeClassName="students__activeNavLink"><SchoolRoundedIcon />Academic Point</NavLink>
                <NavLink to={USER_STUDENTS_CAREER_ROUTE} className="students__navLink" activeClassName="students__activeNavLink"><WorkRoundedIcon />Career Point</NavLink>
            </div>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route path={USER_STUDENTS_ACADEMIC_ROUTE} component={StudentsAcademic} />
                    <Route path={USER_STUDENTS_CAREER_ROUTE} component={StudentsCareer} />
                    <Redirect to={USER_STUDENTS_ACADEMIC_ROUTE} />
                </Switch>
            </Suspense>
        </div>
    );
};

export default Students;
