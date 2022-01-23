import React, { useEffect, useContext } from "react";
import "./ProfileCertificatesSportsAndGames.css";
// contexts
import UserContext from "../../../../../contexts/userContext";
// mui
import GridCard from "../../../../../components/gridCard/GridCard";

const ProfileCertificatesSportsAndGames = () => {
    const achievements = useContext(UserContext).achievements.filter(achievement => achievement.event.category === "Sports And Games");

    useEffect(() => {
        window.scrollTo(0, window.innerHeight);
    }, []);

    return (
        <div className="profileCertificatesSportsAndGames">
            <div className="profileCertificatesSportsAndGames__intro">
                <h1>Sports And Games</h1>
                <p>Here's my list of the certificates earned by me in the domain of Sports And Games!</p>
            </div>
            <div className="profileCertificatesSportsAndGames__cardsContainer">
                {achievements.map((achievement, index) => (
                    <GridCard key={index} data={{ ...achievement, ...achievement.event }} />
                ))}
            </div>
        </div>
    );
};

export default ProfileCertificatesSportsAndGames;
