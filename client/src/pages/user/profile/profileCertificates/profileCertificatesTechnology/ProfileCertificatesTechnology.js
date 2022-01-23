import React, { useEffect, useContext } from "react";
import "./ProfileCertificatesTechnology.css";
// contexts
import UserContext from "../../../../../contexts/userContext";
// mui
import GridCard from "../../../../../components/gridCard/GridCard";

const ProfileCertificatesTechnology = () => {
    const achievements = useContext(UserContext).achievements.filter(achievement => achievement.event.category === "Technology");

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="profileCertificatesTechnology">
            <div className="profileCertificatesTechnology__intro">
                <h1>Technology</h1>
                <p>Here's my list of the certificates earned by me in the domain of Technology!</p>
            </div>
            <div className="profileCertificatesTechnology__cardsContainer">
                {achievements.map((achievement, index) => (
                    <GridCard key={index} data={{ ...achievement, ...achievement.event }} />
                ))}
            </div>
        </div>
    )
}

export default ProfileCertificatesTechnology;
