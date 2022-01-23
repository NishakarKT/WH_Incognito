import React, { useEffect, useContext } from "react";
import "./ProfileCertificatesStudentsWelfare.css";
// contexts
import UserContext from "../../../../../contexts/userContext";
// mui
import GridCard from "../../../../../components/gridCard/GridCard";

const ProfileCertificatesStudentsWelfare = () => {
    const achievements = useContext(UserContext).achievements.filter(achievement => achievement.event.category === "Students' Welfare");

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="profileCertificatesStudentsWelfare">
            <div className="profileCertificatesStudentsWelfare__intro">
                <h1>Students' Welfare</h1>
                <p>Here's my list of the certificates earned by me in the domain of Students' Welfare!</p>
            </div>
            <div className="profileCertificatesStudentsWelfare__cardsContainer">
                {achievements.map((achievement, index) => (
                    <GridCard key={index} data={{ ...achievement, ...achievement.event }} />
                ))}
            </div>
        </div>
    );
};

export default ProfileCertificatesStudentsWelfare;
