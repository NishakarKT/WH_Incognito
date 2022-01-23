import React, { useEffect, useContext } from "react";
import "./ProfileCertificatesSocialAndCulture.css";
// contexts
import UserContext from "../../../../../contexts/userContext";
// mui
import GridCard from "../../../../../components/gridCard/GridCard";

const ProfileCertificatesSocialAndCulture = () => {
    const achievements = useContext(UserContext).achievements.filter(achievement => achievement.event.category === "Social And Culture");

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="profileCertificatesSocialAndCulture">
            <div className="profileCertificatesSocialAndCulture__intro">
                <h1>Social And Culture</h1>
                <p>Here's my list of the certificates earned by me in the domain of Social And Culture!</p>
            </div>
            <div className="profileCertificatesSocialAndCulture__cardsContainer">
                {achievements.map((achievement, index) => (
                    <GridCard key={index} data={{ ...achievement, ...achievement.event }} />
                ))}
            </div>
        </div>
    );
};

export default ProfileCertificatesSocialAndCulture;
