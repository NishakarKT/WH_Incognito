import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import "./StudentsCareer.css";
// constants
import { USER_STUDENTS_CAREER_CONSULTING_ROUTE, USER_STUDENTS_CAREER_CORE_ROUTE, USER_STUDENTS_CAREER_DATA_ROUTE, USER_STUDENTS_CAREER_FINANCE_ROUTE, USER_STUDENTS_CAREER_QUANT_ROUTE, USER_STUDENTS_CAREER_SDE_ROUTE } from "../../../../constants/routes";
// components
import Loader from "../../../../components/loader/Loader";
// mui
import LaptopChromebookRoundedIcon from "@mui/icons-material/LaptopChromebookRounded";
import FunctionsRoundedIcon from "@mui/icons-material/FunctionsRounded";
import EqualizerRoundedIcon from "@mui/icons-material/EqualizerRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import ElectricalServicesRoundedIcon from "@mui/icons-material/ElectricalServicesRounded";
// pages
const SDE = lazy(() => import("./studentsCareerSDE/StudentsCareerSDE"));
const Quant = lazy(() => import("./studentsCareerQuant/StudentsCareerQuant"));
const Data = lazy(() => import("./studentsCareerData/StudentsCareerData"));
const Consulting = lazy(() => import("./studentsCareerConsulting/StudentsCareerConsulting"));
const Finance = lazy(() => import("./studentsCareerFinance/StudentsCareerFinance"));
const Core = lazy(() => import("./studentsCareerCore/StudentsCareerCore"));

const StudentsCareer = () => {
    return (
        <div className="studentsAcademic">
            <div className="studentsAcademic__navLinks">
                <NavLink exact to={USER_STUDENTS_CAREER_SDE_ROUTE} className="studentsAcademic__navLink" activeClassName="studentsAcademic__activeNavLink"><LaptopChromebookRoundedIcon />SDE</NavLink>
                <NavLink exact to={USER_STUDENTS_CAREER_QUANT_ROUTE} className="studentsAcademic__navLink" activeClassName="studentsAcademic__activeNavLink"><FunctionsRoundedIcon />Quant</NavLink>
                <NavLink exact to={USER_STUDENTS_CAREER_DATA_ROUTE} className="studentsAcademic__navLink" activeClassName="studentsAcademic__activeNavLink"><EqualizerRoundedIcon />Data</NavLink>
                <NavLink exact to={USER_STUDENTS_CAREER_CONSULTING_ROUTE} className="studentsAcademic__navLink" activeClassName="studentsAcademic__activeNavLink"><PeopleAltRoundedIcon />Consulting</NavLink>
                <NavLink exact to={USER_STUDENTS_CAREER_FINANCE_ROUTE} className="studentsAcademic__navLink" activeClassName="studentsAcademic__activeNavLink"><AccountBalanceRoundedIcon />Finance</NavLink>
                <NavLink exact to={USER_STUDENTS_CAREER_CORE_ROUTE} className="studentsAcademic__navLink" activeClassName="studentsAcademic__activeNavLink"><ElectricalServicesRoundedIcon />Core</NavLink>
            </div>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route exact path={USER_STUDENTS_CAREER_SDE_ROUTE} component={SDE} />
                    <Route exact path={USER_STUDENTS_CAREER_QUANT_ROUTE} component={Quant} />
                    <Route exact path={USER_STUDENTS_CAREER_DATA_ROUTE} component={Data} />
                    <Route exact path={USER_STUDENTS_CAREER_CONSULTING_ROUTE} component={Consulting} />
                    <Route exact path={USER_STUDENTS_CAREER_FINANCE_ROUTE} component={Finance} />
                    <Route exact path={USER_STUDENTS_CAREER_CORE_ROUTE} component={Core} />
                    <Redirect to={USER_STUDENTS_CAREER_SDE_ROUTE} />
                </Switch>
            </Suspense>
        </div>
    );
};

export default StudentsCareer;
